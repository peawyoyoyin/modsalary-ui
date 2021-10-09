import { useWeb3React } from "@web3-react/core";
import { ethers, providers, utils } from "ethers";
import { useCallback } from "react";
import { injectedConnector } from "../../connector";
import { useClaim } from "../../hooks/useClaim";
import { useCurrentBlock } from "../../hooks/useCurrentBlock";
import { useModSalaryInfo } from "../../hooks/useModSalaryInfo";

export const Main = () => {
  const { account, activate, active } = useWeb3React<providers.Web3Provider>();
  const currentBlock = useCurrentBlock();

  const onConnect = useCallback(async () => {
    await activate(injectedConnector);
  }, [activate]);

  const [claim, claiming] = useClaim();

  const onClaim = useCallback(async () => {
    claim()
  }, [claim]);

  const {
    paymentToken,
    pendingReward,
    lastBlockClaimed,
    claimPerBlock
  } = useModSalaryInfo();

  return (
    <div>
      account: {account ?? 'N/A'}
      <br />
      <table>
        <tr>
          <td>payment token address</td>
          <td>{paymentToken ?? '...'}</td>
        </tr>
        <tr>
          <td>claimable</td>
          <td>{utils.formatEther(pendingReward ?? 0) ?? '...'} VON</td>
        </tr>
        <tr>
          <td>last block claimed</td>
          <td>{lastBlockClaimed?.toString()} ({ethers.BigNumber.from(currentBlock ?? 0).sub(lastBlockClaimed ?? 0).toString()} ahead)</td>
        </tr>
        <tr>
          <td>current block</td>
          <td>{currentBlock}</td>
        </tr>
        <tr>
          <td>claim per block</td>
          <td>{utils.formatEther(claimPerBlock ?? 0) ?? '...'} VON</td>
        </tr>
      </table>

      {
        active && (
          <button onClick={onClaim} disabled={claiming}>
            claim
          </button>
        )
      }

      <div>
        <button onClick={onConnect} disabled={active}>
          connect
        </button>
      </div>
    </div>
  );
}
