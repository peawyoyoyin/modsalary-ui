import { BigNumber } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { ProviderIds } from "../components/providers/ProviderIds";
import { blocksPerMonth } from "../constants/chainData";
import { useContractRead } from "./contracts/useContractRead";
import { useERC20Contract } from "./contracts/useERC20Contract";
import { useModSalaryContract } from "./contracts/useModSalaryContract"
import { useCurrentBlock } from "./useCurrentBlock";

interface UserInfo {
  lastBlockClaim: BigNumber;
  claimPerBlock: BigNumber;
}

export const useModSalaryInfo = () => {
  const { account } = useWeb3React();
  const currentBlock = useCurrentBlock(ProviderIds.BKC);

  const modSalaryContract = useModSalaryContract(ProviderIds.BKC);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readPaymentToken = useCallback((contract) => contract?.paymentToken(), [currentBlock]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readPendingReward = useCallback((contract) => contract?.pendingReward(account), [account, currentBlock]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readUserInfo = useCallback((contract) => contract?.userInfo(account), [account, currentBlock]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readOwner = useCallback((contract) => contract.owner(), [currentBlock]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readTokenSymbol = useCallback((contract) => contract?.symbol(), [currentBlock]);

  const paymentToken = useContractRead<string>(modSalaryContract, readPaymentToken);
  const paymentTokenContract = useERC20Contract(paymentToken, ProviderIds.BKC);

  const paymentTokenSymbol = useContractRead<string>(paymentTokenContract, readTokenSymbol);

  const pendingReward = useContractRead<BigNumber>(modSalaryContract, readPendingReward);
  const userInfo = useContractRead<UserInfo>(modSalaryContract, readUserInfo);
  const owner = useContractRead<string>(modSalaryContract, readOwner)

  const lastBlockClaimed = userInfo?.lastBlockClaim ?? null;

  const claimPerBlock = userInfo?.claimPerBlock ?? null;
  const claimPerMonth = claimPerBlock?.mul(blocksPerMonth);

  return {
    paymentToken,
    paymentTokenSymbol,
    pendingReward,
    lastBlockClaimed,
    claimPerBlock,
    claimPerMonth,
    owner
  }
}
