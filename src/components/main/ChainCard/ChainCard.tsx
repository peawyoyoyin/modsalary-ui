import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { providers } from "ethers";
import { Box, Button, Card, Heading, Text } from "grommet";
import { useCallback } from "react";
import { injectedConnector } from "../../../connector";
import { ChainId, ChainNames } from "../../../constants/chain";
import { SalaryPanel } from "../SalaryPanel/SalaryPanel";

interface ChainCardProps {
  chainId: ChainId;
}

export function ChainCard({ chainId }: ChainCardProps) {
  const { activate, active, error } = useWeb3React<providers.Web3Provider>();
  
  const onConnect = useCallback(async () => {
    try {
      await activate(injectedConnector);
    } catch (e) {
      console.error(e);
    }
  }, [activate]);


  return (
    <Card width="400px" pad="medium">
      <Heading level="3">
        {ChainNames[chainId] ?? '<Unknown chain>'}
      </Heading>
      {error && error instanceof UnsupportedChainIdError && (
        <Box margin={{ vertical: 'medium' }}>
          <Text>
            Wrong chain! Make sure you are on the right chain
          </Text>
        </Box>
      )}
      <SalaryPanel chainId={chainId} />
      {!active && (
        <Button
          onClick={onConnect}
          disabled={active}
          primary
          label="Connect"
        />
      )}
    </Card>
  );
}
