import { useWeb3React } from "@web3-react/core";
import { providers, utils, BigNumber, ethers } from "ethers";
import { Box, Button, Text } from "grommet";
import { useCallback } from "react";
import { wei } from "../../../../constants";
import { BlockRates, ChainId, ChainIdToProviderId, ChainNames } from "../../../../constants/chain";
import { useClaim } from "../../../../hooks/useClaim";
import { useCurrentBlock } from "../../../../hooks/useCurrentBlock";
import { useModSalaryInfo } from "../../../../hooks/useModSalaryInfo";
import { useVonderTokenPrice } from "../../../../hooks/useVonderTokenPrice";
import { formatMinutes } from "../../../../utils/formats/formatMinutes";
import { formatThbAmountStr } from "../../../../utils/formats/formatThbAmount";
import { InfoCard } from "../../InfoCard";

interface ClaimTabProps {
  chainId: ChainId;
}

export function ClaimTab({ chainId }: ClaimTabProps) {
  const { account, chainId: connectedChainId } = useWeb3React<providers.Web3Provider>();
  const currentBlock = useCurrentBlock(ChainIdToProviderId[chainId]);

  const {
    paymentTokenSymbol,
    paymentTokenDecimals,
    pendingReward,
    lastBlockClaimed,
    claimPerBlock,
    claimPerMonth,
  } = useModSalaryInfo(chainId);
  
  // TODO: ideally, this should be inferred from the contract's payment token
  const paymentTokenPrice = useVonderTokenPrice(chainId);

  const formattedPendingReward = utils.formatUnits(pendingReward ?? 0, paymentTokenDecimals) ?? "...";
  const formattedPaymentTokenSymbol = paymentTokenSymbol ?? '???';
  const pendingRewardThb = pendingReward && paymentTokenPrice?.priceThb && pendingReward.mul(paymentTokenPrice.priceThb).div(wei);
  const formattedPendingRewardThb = formatThbAmountStr(utils.formatUnits(pendingRewardThb ?? 0, paymentTokenDecimals) ?? '...');

  const blocksSinceLastClaim = ethers.BigNumber.from(currentBlock ?? 0).sub(lastBlockClaimed ?? 0);
  const formattedBlocksSinceLastClaim = blocksSinceLastClaim.toString();
  const timeSinceLastClaim = blocksSinceLastClaim.div(BigNumber.from(BlockRates[chainId].blocksPerMinute));
  const formattedTimeSinceLastClaim = formatMinutes(timeSinceLastClaim);

  const formattedClaimPerBlock = utils.formatUnits(claimPerBlock ?? 0, paymentTokenDecimals) ?? "...";
  const claimPerBlockThb = claimPerBlock && paymentTokenPrice?.priceThb && claimPerBlock.mul(paymentTokenPrice.priceThb).div(wei);
  const formattedClaimPerBlockThb = formatThbAmountStr(utils.formatUnits(claimPerBlockThb ?? 0, paymentTokenDecimals) ?? '...');

  const formattedClaimPerMonth = utils.formatUnits(claimPerMonth ?? 0, paymentTokenDecimals) ?? "...";
  const claimPerMonthThb = claimPerMonth && paymentTokenPrice?.priceThb && claimPerMonth.mul(paymentTokenPrice.priceThb).div(wei);
  const formattedClaimPerMonthThb = formatThbAmountStr(utils.formatUnits(claimPerMonthThb ?? 0, paymentTokenDecimals) ?? '...');

  const [claim, claiming] = useClaim(chainId);
  const onClaim = useCallback(async () => {
      claim();
  }, [claim]);

  return (account ? (
      <Box direction="column" gap="small" pad={{ vertical: "small" }}>
          <InfoCard
              label="Available for claiming"
              value={`${formattedPendingReward} ${formattedPaymentTokenSymbol} (${formattedPendingRewardThb} THB)`}
          />
          <InfoCard
              label="Time since last claim"
              value={`~${formattedTimeSinceLastClaim}`}
              helperText={(`Last claimed at block #${lastBlockClaimed?.toString() ?? '...'}. (${formattedBlocksSinceLastClaim} since last claim)`)}
          />
          <InfoCard
              label={`${paymentTokenSymbol ?? '???'} per month`}
              value={`${formattedClaimPerMonth} (${formattedClaimPerMonthThb} THB)`}
              helperText={`${formattedClaimPerBlock} ${formattedPaymentTokenSymbol} (${formattedClaimPerBlockThb} THB) per block`}
          />
          <Button
              primary
              onClick={onClaim}
              size="large"
              disabled={claiming || connectedChainId !== chainId}
              label={connectedChainId === chainId ? "Claim Now" : `Switch to ${ChainNames[chainId]} to Claim`}
          />
      </Box>
  ) : (
      <Box direction="column" gap="small" pad={{ vertical: "medium" }}>
          <Text>
              Connect to see your earnings & claim
          </Text>
      </Box>
  ));
}
