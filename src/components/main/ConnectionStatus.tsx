import { useWeb3React } from "@web3-react/core";
import { providers } from "ethers";
import { Box, Button, Text } from "grommet";
import { ChainNames } from "../../constants/chain";
import { InfoCard } from "./InfoCard";

export const ConnectionStatus = () => {
    const { account, active, chainId } = useWeb3React<providers.Web3Provider>();
    
    

    return (
        <Box direction="row" gap="small" align="center">
            <Box
                background="brand-light"
                pad="small"
                round="small"
                color="brand"
            >
            {active && account ? (
                <InfoCard label="Connected to " value={account ?? "..."} />
            ) : (
                <InfoCard label="Connected to " value="Not connected" />
            )}
            </Box>
            {active && chainId && (
                <Box flex="grow">
                    <InfoCard label="Chain ">
                        <Box direction="row" align="center" gap="small">
                            <Box fill>
                                <Text>
                                    {ChainNames[chainId as 96 | 56] ?? 'Unsupported Chain'}
                                </Text>
                            </Box>
                            <Button secondary size="small" label="change"/>
                        </Box>
                    </InfoCard>
                </Box>
            )}
        </Box>
    );
}
