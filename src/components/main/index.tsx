import { useWeb3React } from "@web3-react/core";
import { providers } from "ethers";
import {
  Box,
  Button,
  Card,
  Heading,
} from "grommet";
import { useCallback, useEffect } from "react";
import { injectedConnector } from "../../connector";
import { SalaryPanel } from './SalaryPanel';

export const Main = () => {
  const { activate, active } = useWeb3React<providers.Web3Provider>();

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

  const onConnect = useCallback(async () => {
    await activate(injectedConnector);
  }, [activate]);

  return (
    <div>
      <Box direction="row" justify="center" margin="10px">
        <Box direction="column" justify="center">
          <Card width="400px" pad="medium">
            <Heading level="3">ModSalary</Heading>
            {active && <SalaryPanel />}
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
      </Box>
    </div>
  );
};
