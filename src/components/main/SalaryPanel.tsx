import { useWeb3React } from "@web3-react/core";
import { ethers, providers, utils, BigNumber } from "ethers";
import { Box, Button, Tab, Tabs } from "grommet"
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
    const { account } = useWeb3React<providers.Web3Provider>();
    const { paymentToken, paymentTokenSymbol, pendingReward, lastBlockClaimed, claimPerBlock, claimPerMonth, owner } = useModSalaryInfo();
    const currentBlock = useCurrentBlock();

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

    return (
        <Box direction="column" gap="small">
            <Box
                background="brand-light"
                pad="small"
                round="small"
                color="brand"
            >
                <InfoCard label="Connected to " value={account ?? "..."} />
            </Box>
            <Tabs>
                <Tab title="Claim">
                    <Box direction="column" gap="small" pad={{ vertical: "small" }}>
                        <InfoCard
                            label="Available for claiming"
                            value={`${formattedPendingReward} VON (${formattedPendingRewardThb} THB)`}
                        />
                        <InfoCard
                            label="Time since last claim"
                            value={`~${formattedTimeSinceLastClaim}`}
                            helperText={(`Last claimed at block #${lastBlockClaimed?.toString() ?? '...'}. (${formattedBlocksSinceLastClaim} since last claim)`)}
                        />
                        <InfoCard
                            label={`${paymentTokenSymbol ?? '???'} per month`}
                            value={`${formattedClaimPerMonth} (${formattedClaimPerMonthThb} THB)`}
                        />
                        <Button
                            primary
                            onClick={onClaim}
                            size="large"
                            disabled={claiming}
                            label="Claim Now"
                        />
                    </Box>
                </Tab>
                <Tab title="Info">
                    <Box direction="column" gap="small" pad={{ vertical: "small" }}>
                        <InfoCard label="Current block" value={currentBlock} />
                        <InfoCard
                            label="ModSalary contract address"
                            value={modSalaryAddress}
                        />
                        <InfoCard
                            label="Payment Token Address"
                            value={paymentToken ?? "..."}
                        />
                        <InfoCard
                            label="Claim Per Block"
                            value={`${formattedClaimPerBlock ?? "..."} VON (${formattedClaimPerBlockThb} THB)`}
                        />
                        <InfoCard
                            label="VON Price"
                            value={`${formattedVonPrice} THB`}
                        />
                        <InfoCard
                            label="KUB Price"
                            value={`${formattedKubPrice} THB`}
                        />
                    </Box>
                </Tab>
            </Tabs>

            {
                shouldShowModManagement && <ModManagement />
            }
        </Box>
    )
}