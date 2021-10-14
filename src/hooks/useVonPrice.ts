import { BigNumber } from "@ethersproject/bignumber";
import { useCallback } from "react";
import { wei } from "../constants";
import { useContractRead } from "./contracts/useContractRead";
import { useVonKubLpContract } from "./contracts/useVonKubLpContract"
import { useCurrentBlock } from "./useCurrentBlock";
import { useKubPrice } from "./useKubPrice";

interface Reserves {
    _reserve0: BigNumber;
    _reserve1: BigNumber;
}

export const useVonPrice = () => {
    const currentBlock = useCurrentBlock();
    const vonKubLpContract = useVonKubLpContract();

    const kubPrices = useKubPrice();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const readToken0 = useCallback((contract) => contract?.token0(), [currentBlock]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const readToken1 = useCallback((contract) => contract?.token1(), [currentBlock]);

    // hardcode for now, token0 = VON, token1 = KKUB
    // const token0 = useContractRead(vonKubLpContract, readToken0);
    // const token1 = useContractRead(vonKubLpContract, readToken1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const readReserves = useCallback((contract) => contract?.getReserves(), [currentBlock]);
    const reserves = useContractRead<Reserves>(vonKubLpContract, readReserves);

    const vonPriceInKub = reserves?._reserve1.mul(wei).div(reserves?._reserve0);
    const vonPriceInThb = vonPriceInKub?.mul(kubPrices?.kubPriceThb ?? wei).div(wei);

    return {
        vonPriceInKub,
        vonPriceInThb,
    }
}