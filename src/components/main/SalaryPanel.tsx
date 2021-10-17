import { useWeb3React } from "@web3-react/core";
import { ethers, providers, utils, BigNumber } from "ethers";
import { Box, Button, Tab, Tabs, Text } from "grommet"
import { useCallback } from "react";
import { useClaim } from "../../hooks/useClaim";
import { useCurrentBlock } from "../../hooks/useCurrentBlock";
import { useModSalaryInfo } from "../../hooks/useModSalaryInfo";
import { ModManagement } from "./ModManagement";
import { InfoCard } from './InfoCard';
import { modSalaryAddress } from "../../constants/addresses";
import { useVonPrice } from "../../hooks/useVonPrice";
import { useKubPrice } from "../../hooks/useKubPrice";
import { formatThbAmountStr } from "../../utils/formats/formatThbAmount";

import { blocksPerMinute } from "../../constants/chainData";
import { wei } from "../../constants";
import { ProviderIds } from "../providers/ProviderIds";
import { ChainId } from "../../constants/chain";

const formatMinutes = (minutes: BigNumber): string => {
    const days = minutes.div(60 * 24)
    const hours = minutes.mod(60 * 24).div(60);

    if (minutes.gte(60 * 24)) {
        return `${days.toString()}d ${hours.toString()}h`
    }

    if (minutes.gte(60)) {
        return `${hours.toString()}h`
    }

    if (minutes.lte(1)) {
        return `<1m`;
    }

    return `${minutes.toString()}m`;
}

export const SalaryPanel = () => {
    const { account, chainId } = useWeb3React<providers.Web3Provider>();
    const { paymentToken, paymentTokenSymbol, pendingReward, lastBlockClaimed, claimPerBlock, claimPerMonth, owner } = useModSalaryInfo();
    const currentBlock = useCurrentBlock(ProviderIds.BKC);

    const vonPrice = useVonPrice();
    const kubPrice = useKubPrice();

    const [claim, claiming] = useClaim();
    const onClaim = useCallback(async () => {
        claim();
    }, [claim]);

    // const shouldShowModManagement = true;
    const shouldShowModManagement = account && owner && account.toLowerCase() === owner.toLowerCase();

    const formattedPendingReward = utils.formatEther(pendingReward ?? 0) ?? "...";

    const pendingRewardThb = pendingReward && vonPrice?.vonPriceInThb && pendingReward.mul(vonPrice.vonPriceInThb).div(wei);
    const formattedPendingRewardThb = formatThbAmountStr(utils.formatEther(pendingRewardThb ?? 0) ?? '...');

    const formattedClaimPerMonth = utils.formatEther(claimPerMonth ?? 0) ?? "...";
    const claimPerMonthThb = claimPerMonth && vonPrice?.vonPriceInThb && claimPerMonth.mul(vonPrice.vonPriceInThb).div(wei);
    const formattedClaimPerMonthThb = formatThbAmountStr(utils.formatEther(claimPerMonthThb ?? 0) ?? '...');

    const formattedClaimPerBlock = utils.formatEther(claimPerBlock ?? 0) ?? "...";
    const claimPerBlockThb = claimPerBlock && vonPrice?.vonPriceInThb && claimPerBlock.mul(vonPrice.vonPriceInThb).div(wei);
    const formattedClaimPerBlockThb = formatThbAmountStr(utils.formatEther(claimPerBlockThb ?? 0) ?? '...');

    const formattedVonPrice = utils.formatEther(vonPrice?.vonPriceInThb ?? 0);
    const formattedKubPrice = utils.formatEther(kubPrice?.kubPriceThb ?? 0);

    const blocksSinceLastClaim = ethers.BigNumber.from(currentBlock ?? 0).sub(lastBlockClaimed ?? 0);
    const formattedBlocksSinceLastClaim = blocksSinceLastClaim.toString();
    const timeSinceLastClaim = blocksSinceLastClaim.div(BigNumber.from(blocksPerMinute));
    const formattedTimeSinceLastClaim = formatMinutes(timeSinceLastClaim);

    const formattedPaymentTokenSymbol = paymentTokenSymbol ?? '???';

    return (
        <Box>
            <Box direction="column" gap="small">
                <Tabs>
                    <Tab title="Claim">
                        {account ? (
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
                                    disabled={claiming || chainId !== ChainId.BKC}
                                    label={chainId === ChainId.BKC ? "Claim Now" : "Switch to BKC to Claim"}
                                />
                            </Box>
                        ) : (
                            <Box direction="column" gap="small" pad={{ vertical: "medium" }}>
                                <Text>
                                    Connect to see your earnings & claim
                                </Text>
                            </Box>
                        )}
                    </Tab>
                    <Tab title="Info">
                        <Box direction="column" gap="small" pad={{ vertical: "small" }}>
                            <InfoCard label="Current block" value={currentBlock} />
                            <InfoCard
                                label="VON Price"
                                value={`${formattedVonPrice} THB`}
                            />
                            <InfoCard
                                label="KUB Price"
                                value={`${formattedKubPrice} THB`}
                            />
                            <InfoCard
                                label="ModSalary contract address"
                                value={modSalaryAddress}
                            />
                            <InfoCard
                                label="Payment Token Address"
                                value={paymentToken ?? "..."}
                            />
                        </Box>
                    </Tab>
                </Tabs>
                {
                    shouldShowModManagement && <ModManagement />
                }
            </Box>
        </Box>
    )
}