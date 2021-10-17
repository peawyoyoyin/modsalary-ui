import { BigNumber } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { ChainId, ChainIdToProviderId } from "../constants/chain";
import { blocksPerMonth } from "../constants/chainData";
import { useContractRead } from "./contracts/useContractRead";
import { useERC20Contract } from "./contracts/useERC20Contract";
import { useModSalaryContract } from "./contracts/useModSalaryContract"
import { useCurrentBlock } from "./useCurrentBlock";

interface UserInfo {
  lastBlockClaim: BigNumber;
  claimPerBlock: BigNumber;
}

export const useModSalaryInfo = (chainId: ChainId) => {
  const { account } = useWeb3React();
  const currentBlock = useCurrentBlock(ChainIdToProviderId[chainId]);

  const modSalaryContract = useModSalaryContract(chainId);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readPaymentToken = useCallback((contract) => contract?.paymentToken(), [currentBlock]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readPendingReward = useCallback((contract) => contract?.pendingReward(account), [account, currentBlock]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readUserInfo = useCallback((contract) => contract?.userInfo(account), [account, currentBlock]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readOwner = useCallback((contract) => contract?.owner(), [currentBlock]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readTokenSymbol = useCallback((contract) => contract?.symbol(), [currentBlock]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readTokenDecimals = useCallback((contract) => contract?.decimals(), [currentBlock]);

  const paymentToken = useContractRead<string>(modSalaryContract, readPaymentToken);
  const paymentTokenContract = useERC20Contract(paymentToken, ChainIdToProviderId[chainId]);

  const paymentTokenSymbol = useContractRead<string>(paymentTokenContract, readTokenSymbol);
  const paymentTokenDecimals = useContractRead<string>(paymentTokenContract, readTokenDecimals) ?? 18;

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
    owner,
    paymentTokenDecimals,
  };
}
