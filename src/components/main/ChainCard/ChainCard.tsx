import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { providers } from "ethers";
import { Box, Card, Heading, Text } from "grommet";
import { ChainId, ChainNames } from "../../../constants/chain";
import { SalaryPanel } from "../SalaryPanel/SalaryPanel";

interface ChainCardProps {
  chainId: ChainId;
}

export function ChainCard({ chainId }: ChainCardProps) {
  const { error } = useWeb3React<providers.Web3Provider>();

  return (
    <Card width="400px" pad="medium" style={{ minWidth: '300px' }}>
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
    </Card>
  );
}
