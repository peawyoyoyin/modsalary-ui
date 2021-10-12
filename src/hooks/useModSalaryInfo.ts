import { BigNumber } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useModSalaryContract } from "./contracts/useModSalaryContract"
import { useCurrentBlock } from "./useCurrentBlock";

export const useModSalaryInfo = () => {
  const { account } = useWeb3React();
  const currentBlock = useCurrentBlock();

  const modSalaryContract = useModSalaryContract();

  const [paymentToken, setPaymentToken] = useState<string | null>(null);
  useEffect(() => {
    modSalaryContract?.paymentToken().then((paymentTokenResult: string) => {
      setPaymentToken(paymentTokenResult);
    }).catch(console.error);
  }, [account, modSalaryContract]);


  const [pendingReward, setPendingReward] = useState<BigNumber | null>(null);
  useEffect(() => {
    if (account) {
      modSalaryContract?.pendingReward(account).then((pendingRewardResult: BigNumber) => {
        setPendingReward(pendingRewardResult);
      }).catch(console.error);
    }
  }, [account, modSalaryContract, currentBlock]);

  const [lastBlockClaimed, setLastBlockClaimed] = useState<BigNumber | null>(null);
  const [claimPerBlock, setClaimPerBlock] = useState<BigNumber | null>(null);
  useEffect(() => {
    if (account) {
      modSalaryContract?.userInfo(account).then((userInfo: { claimPerBlock: BigNumber, lastBlockClaim: BigNumber}) => {
        setLastBlockClaimed(userInfo?.lastBlockClaim);
        setClaimPerBlock(userInfo?.claimPerBlock);
      }).catch(console.error);
    }
  }, [account, modSalaryContract, currentBlock])

  return {
    paymentToken,
    pendingReward,
    lastBlockClaimed,
    claimPerBlock,
  }
}
