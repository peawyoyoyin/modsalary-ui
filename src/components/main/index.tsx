import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { providers } from "ethers";
import {
  Box,
  Button,
  Card,
  Heading,
  Text,
} from "grommet";
import { useCallback, useEffect } from "react";
import { injectedConnector, networkConnector } from "../../connector";
import { ProviderIds } from "../providers/ProviderIds";
import { SalaryPanel } from './SalaryPanel';

export const Main = () => {
  const { activate, active, error } = useWeb3React<providers.Web3Provider>();
  const { activate: activateBkc } = useWeb3React<providers.StaticJsonRpcProvider>(ProviderIds.BKC);

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
    activateBkc(networkConnector)
      .then(() => console.log('connected to BKC'))
      .catch((e) => console.error('error connecting to BKC', e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onConnect = useCallback(async () => {
    try {
      await activate(injectedConnector);
    } catch (e) {
      console.error(e);
    }
  }, [activate]);

  return (
    <div>
      <Box direction="row" justify="center" gap="small" margin="10px">
        <Box direction="column" justify="start">
          <Card width="400px" pad="medium">
            <Heading level="3">ModSalary (BKC)</Heading>
            {error && error instanceof UnsupportedChainIdError && (
              <Box margin={{ vertical: 'medium' }}>
                <Text>
                  Wrong chain! Make sure you are on the right chain
                </Text>
              </Box>
            )}
            <SalaryPanel />
            {!active && (
              <Button
                onClick={onConnect}
                disabled={active}
                primary
                label="Connect"
              />
            )}
          </Card>
        </Box>

        {/* <Box direction="column" justify="start">
          <Card width="400px" pad="medium">
            <Heading level="3">ModSalary (BSC)</Heading>
            {error && error instanceof UnsupportedChainIdError && (
              <Box margin={{ vertical: 'medium' }}>
                <Text>
                  Wrong chain! Make sure you are on the right chain
                </Text>
              </Box>
            )}
            <SalaryPanel />
            {!active && (
              <Button
                onClick={onConnect}
                disabled={active}
                primary
                label="Connect"
              />
            )}
          </Card>
        </Box> */}
      </Box>
    </div>
  );
};
