import { useWeb3React } from "@web3-react/core";
import { ethers, providers, utils, BigNumber } from "ethers";
import { Box, Button, Tab, Tabs, Text } from "grommet"
import { useCallback } from "react";
import { useClaim } from "../../../hooks/useClaim";
import { useCurrentBlock } from "../../../hooks/useCurrentBlock";
import { useModSalaryInfo } from "../../../hooks/useModSalaryInfo";
import { ModManagement } from "./ModManagement";
import { InfoCard } from '../InfoCard';
import { addresses } from "../../../constants/addresses";
import { useVonPrice } from "../../../hooks/useVonPrice";
import { useKubPrice } from "../../../hooks/useKubPrice";
import { formatThbAmountStr } from "../../../utils/formats/formatThbAmount";
import { wei } from "../../../constants";
import { BlockRates, ChainId, ChainIdToProviderId, ChainNames } from "../../../constants/chain";
import { formatMinutes } from "../../../utils/formats/formatMinutes";

interface SalaryPanelProps {
    chainId: ChainId;
}

export const SalaryPanel = ({ chainId }: SalaryPanelProps) => {
    const { account, chainId: connectedChainId } = useWeb3React<providers.Web3Provider>();
    const {
        paymentToken,
        paymentTokenSymbol,
        paymentTokenDecimals,
        pendingReward,
        lastBlockClaimed,
        claimPerBlock,
        claimPerMonth,
        owner,
    } = useModSalaryInfo(chainId);
    const currentBlock = useCurrentBlock(ChainIdToProviderId[chainId]);

    const vonPrice = useVonPrice();
    const kubPrice = useKubPrice();

    const [claim, claiming] = useClaim(chainId);
    const onClaim = useCallback(async () => {
        claim();
    }, [claim]);

    // const shouldShowModManagement = true;
    const shouldShowModManagement = account && owner && account.toLowerCase() === owner.toLowerCase();

    const formattedPendingReward = utils.formatUnits(pendingReward ?? 0, paymentTokenDecimals) ?? "...";

    const pendingRewardThb = pendingReward && vonPrice?.vonPriceInThb && pendingReward.mul(vonPrice.vonPriceInThb).div(wei);
    const formattedPendingRewardThb = formatThbAmountStr(utils.formatUnits(pendingRewardThb ?? 0, paymentTokenDecimals) ?? '...');

    const formattedClaimPerMonth = utils.formatUnits(claimPerMonth ?? 0, paymentTokenDecimals) ?? "...";
    const claimPerMonthThb = claimPerMonth && vonPrice?.vonPriceInThb && claimPerMonth.mul(vonPrice.vonPriceInThb).div(wei);
    const formattedClaimPerMonthThb = formatThbAmountStr(utils.formatUnits(claimPerMonthThb ?? 0, paymentTokenDecimals) ?? '...');

    const formattedClaimPerBlock = utils.formatUnits(claimPerBlock ?? 0, paymentTokenDecimals) ?? "...";
    const claimPerBlockThb = claimPerBlock && vonPrice?.vonPriceInThb && claimPerBlock.mul(vonPrice.vonPriceInThb).div(wei);
    const formattedClaimPerBlockThb = formatThbAmountStr(utils.formatUnits(claimPerBlockThb ?? 0, paymentTokenDecimals) ?? '...');

    const formattedVonPrice = utils.formatUnits(vonPrice?.vonPriceInThb ?? 0, paymentTokenDecimals);
    const formattedKubPrice = utils.formatUnits(kubPrice?.kubPriceThb ?? 0, paymentTokenDecimals);

    const blocksSinceLastClaim = ethers.BigNumber.from(currentBlock ?? 0).sub(lastBlockClaimed ?? 0);
    const formattedBlocksSinceLastClaim = blocksSinceLastClaim.toString();
    const timeSinceLastClaim = blocksSinceLastClaim.div(BigNumber.from(BlockRates[chainId].blocksPerMinute));
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
                                value={addresses.modSalary[chainId]}
                            />
                            <InfoCard
                                label="Payment Token Address"
                                value={paymentToken ?? "..."}
                            />
                        </Box>
                    </Tab>
                </Tabs>
                {
                    shouldShowModManagement && <ModManagement chainId={chainId} />
                }
            </Box>
        </Box>
    )
}
