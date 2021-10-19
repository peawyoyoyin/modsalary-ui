import { BigNumber } from "@ethersproject/bignumber";
import { useCallback } from "react";
import { ProviderIds } from "../components/providers/ProviderIds";
import { wei } from "../constants";
import { useContractRead } from "./contracts/useContractRead";
import { useXvonBusdLpContract } from "./contracts/useXvonBusdLpContract";
import { useCurrentBlock } from "./useCurrentBlock";
import { useUsdThbExchangeRate } from "./useUsdThbExchangeRate";

interface Reserves {
  _reserve0: BigNumber;
  _reserve1: BigNumber;
}

const defaultUsdThbExchangeRates = 33.333333;
// const defaultUsdThbExchangeRatesBigNum = BigNumber.from(defaultUsdThbExchangeRates * 1000000).mul(BigNumber.from('1000000000000'));

export const useXvonPrice = () => {
  const currentBlock = useCurrentBlock(ProviderIds.BSC);
  const xVonBusdLpContract = useXvonBusdLpContract();

  const { data: usdToThbExchangeRates } = useUsdThbExchangeRate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const readToken0 = useCallback((contract) => contract?.token0(), [currentBlock]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const readToken1 = useCallback((contract) => contract?.token1(), [currentBlock]);

  // hardcode for now, token0 = xVON, token1 = BUSD
  // const token0 = useContractRead(xVonBusdLpContract, readToken0);
  // const token1 = useContractRead(xVonBusdLpContract, readToken1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readReserves = useCallback((contract) => contract?.getReserves(), [currentBlock]);
  const reserves = useContractRead<Reserves>(xVonBusdLpContract, readReserves);

  const xVonPriceBusd = reserves?._reserve1.mul(wei).div(reserves?._reserve0);

  // this converts USD-THB rate (6 decimal places) to bignum
  // formula = rates * 1e6 * 1e12
  const usdToThbRateBigNum = BigNumber.from( Math.round((usdToThbExchangeRates?.rates['THB'] ?? defaultUsdThbExchangeRates) * 1000000) ).mul(BigNumber.from('1000000000000'));
  const xVonPriceThb = xVonPriceBusd?.mul(usdToThbRateBigNum ?? defaultUsdThbExchangeRates).div(wei);

  return {
    xVonPriceBusd,
    xVonPriceThb,
  };
}
