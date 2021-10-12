import { useWeb3React } from "@web3-react/core";
import { ethers, providers, utils } from "ethers";
import { Box, Button, Tab, Tabs } from "grommet"
import { useCallback } from "react";
import { useClaim } from "../../hooks/useClaim";
import { useCurrentBlock } from "../../hooks/useCurrentBlock";
import { useModSalaryInfo } from "../../hooks/useModSalaryInfo";
import { ModManagement } from "./ModManagement";
import { InfoCard } from './InfoCard';
import { modSalaryAddress } from "../../constants/addresses";

export const SalaryPanel = () => {
    const { account } = useWeb3React<providers.Web3Provider>();
    const { paymentToken, pendingReward, lastBlockClaimed, claimPerBlock, claimPerMonth, owner } = useModSalaryInfo();
    const currentBlock = useCurrentBlock();

    const [claim, claiming] = useClaim();
    const onClaim = useCallback(async () => {
        claim();
    }, [claim]);

    const shouldShowModManagement = account && owner && account.toLowerCase() === owner.toLowerCase();

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
                            value={`${utils.formatEther(pendingReward ?? 0) ?? "..."
                                } VON`}
                        />
                        <InfoCard
                            label="Last claimed block"
                            value={`${lastBlockClaimed?.toString()} (${ethers.BigNumber.from(
                                currentBlock ?? 0
                            )
                                .sub(lastBlockClaimed ?? 0)
                                .toString()} blocks since last claim)`}
                        />
                        <InfoCard
                            label="VON per month"
                            value={`${utils.formatEther(claimPerMonth ?? 0) ?? "..."} (${utils.formatEther(claimPerBlock ?? 0) ?? "..."} per block)`}
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
                    </Box>
                </Tab>
            </Tabs>

            {
                shouldShowModManagement && <ModManagement />
            }
        </Box>
    )
}