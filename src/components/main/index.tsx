import { useWeb3React } from "@web3-react/core";
import { providers } from "ethers";
import {
  Box,
  Card,
  Heading,
} from "grommet";
import { useEffect } from "react";
import { injectedConnector, BkcNetworkConnector, BscNetworkConnector } from "../../connector";
import { ChainIds } from "../../constants/chain";
import { ProviderIds } from "../providers/ProviderIds";
import { ChainCard } from "./ChainCard/ChainCard";
import { ConnectionStatus } from "./ConnectionStatus";

export const Main = () => {
  const { activate } = useWeb3React<providers.Web3Provider>();
  const { activate: activateBkc } = useWeb3React<providers.StaticJsonRpcProvider>(ProviderIds.BKC);
  const { activate: activateBsc } = useWeb3React<providers.StaticJsonRpcProvider>(ProviderIds.BSC);

  // try connect on render
  useEffect(() => {
    injectedConnector.isAuthorized()
      .then(isAuthorized => {
        if (isAuthorized) {
          activate(injectedConnector)
            .catch(console.error);
        }
      })
      .catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    activateBkc(BkcNetworkConnector)
      .then(() => console.log('connected to BKC'))
      .catch((e) => console.error('error connecting to BKC', e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    activateBsc(BscNetworkConnector)
      .then(() => console.log('connected to BSC'))
      .catch((e) => console.error('error connecting to BSC', e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Box direction="row" justify="center" gap="small" margin="10px">
        <Box direction="column" justify="start" gap="small">
          <Card width="810px" pad="medium">
            <Heading level="3">ModSalary</Heading>
            <ConnectionStatus />
          </Card>
          <Box direction="row" justify="start" gap="small" align="start">
            <ChainCard chainId={ChainIds.BKC} />
            <ChainCard chainId={ChainIds.BSC} />
          </Box>
        </Box>
      </Box>
    </div>
  );
};
