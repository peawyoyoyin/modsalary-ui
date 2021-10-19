import { useWeb3React } from "@web3-react/core";
import { providers } from "ethers";
import { Box, Tab, Tabs } from "grommet"
import { useModSalaryInfo } from "../../../hooks/useModSalaryInfo";
import { ModManagement } from "./ModManagement";
import { ChainId } from "../../../constants/chain";
import { InfoTab } from "./info/InfoTab";
import { ClaimTab } from "./claim/ClaimTab";

interface SalaryPanelProps {
    chainId: ChainId;
}

export const SalaryPanel = ({ chainId }: SalaryPanelProps) => {
    const { account } = useWeb3React<providers.Web3Provider>();
    const {
        owner,
    } = useModSalaryInfo(chainId);

    // const shouldShowModManagement = true;
    const shouldShowModManagement = account && owner && account.toLowerCase() === owner.toLowerCase();

    return (
        <Box>
            <Box direction="column" gap="small">
                <Tabs>
                    <Tab title="Claim">
                        <ClaimTab chainId={chainId} />
                    </Tab>
                    <Tab title="Info">
                        <InfoTab chainId={chainId} />
                    </Tab>
                </Tabs>
                {
                    shouldShowModManagement && <ModManagement chainId={chainId} />
                }
            </Box>
        </Box>
    )
}
