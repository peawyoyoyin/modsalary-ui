import { useWeb3React } from "@web3-react/core";
import { providers } from "ethers";
import { Box, Button, Text } from "grommet";
import { useCallback, useMemo } from "react";
import { injectedConnector } from "../../connector";
import { ChainIds, ChainNames } from "../../constants/chain";
import { requestMetamaskToSwitchChain } from "../../utils/metamask";
import { InfoCard } from "./InfoCard";

export const ConnectionStatus = () => {
    const { account, active, chainId, activate } = useWeb3React<providers.Web3Provider>();

    const onConnect = useCallback(async () => {
        try {
            await activate(injectedConnector);
        } catch (e) {
            console.error(e);
        }
    }, [activate]);

    const changeToChainId = useMemo(() => chainId === ChainIds.BKC ? ChainIds.BSC : ChainIds.BKC, [chainId])

    const onChangeNetwork = useCallback(async () => {
        await requestMetamaskToSwitchChain(changeToChainId);
    }, [changeToChainId]);

    return (
        <Box direction="row" gap="small" align="center">
            <Box
                background="brand-light"
                pad="small"
                round="small"
                color="brand"
                flex="grow"
            >
                {active && account ? (
                    <InfoCard label="Connected to " value={account ?? "..."} />
                ) : (
                    <InfoCard label="Connected to " value="Not connected" />
                )}
            </Box>
            {active && chainId ? (
                <Box flex="grow" height="100%" justify="center">
                    <Box direction="row" align="center" gap="small">
                        <Box flex="grow">
                            <InfoCard label="Chain ">
                                <Box>
                                    <Text>
                                        {ChainNames[chainId as 96 | 56] ?? 'Unsupported Chain'}
                                    </Text>
                                </Box>
                            </InfoCard>
                        </Box>
                        <Button
                            secondary
                            size="small"
                            label={`Change to ${ChainNames[changeToChainId]}`}
                            onClick={onChangeNetwork}
                        />
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Button primary label="Connect" onClick={onConnect} />
                </Box>
            )}
        </Box>
    );
}
