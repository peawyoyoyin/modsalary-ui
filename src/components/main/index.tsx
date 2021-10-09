import { useWeb3React } from "@web3-react/core";
import { ethers, providers, utils } from "ethers";
import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Card,
  Heading,
  Stack,
  Text,
  TextInput,
} from "grommet";
import { useCallback, useState } from "react";
import { injectedConnector } from "../../connector";
import { useAddMod } from "../../hooks/useAddMod";
import { useClaim } from "../../hooks/useClaim";
import { useCurrentBlock } from "../../hooks/useCurrentBlock";
import { useModSalaryInfo } from "../../hooks/useModSalaryInfo";

const InfoCard: React.FC<{ label: string; value: any }> = ({
  label,
  value,
}) => {
  return (
    <Box>
      <Box>
        <Text size="small" color="gray">
          {label}
        </Text>
      </Box>
      <Box>
        <Text size="medium" color="black" wordBreak="break-all">
          {value}
        </Text>
      </Box>
    </Box>
  );
};

export const Main = () => {
  const { account, activate, active } = useWeb3React<providers.Web3Provider>();
  const currentBlock = useCurrentBlock();

  const onConnect = useCallback(async () => {
    await activate(injectedConnector);
  }, [activate]);

  const [claim, claiming] = useClaim();

  const onClaim = useCallback(async () => {
    claim();
  }, [claim]);

  const [addMod, adding] = useAddMod();

  const [address, setAddress] = useState("");
  const [vonPerBlock, setVonPerBlock] = useState(ethers.BigNumber.from(0));
  const onAddMod = useCallback(async () => {
    addMod(address, vonPerBlock);
  }, [addMod, address, vonPerBlock]);

  const { paymentToken, pendingReward, lastBlockClaimed, claimPerBlock } =
    useModSalaryInfo();

  return (
    <div>
      <Box direction="row" justify="center" margin="10px">
        <Box direction="column" justify="center">
          <Card width="400px" pad="medium">
            <Heading level="3">ModSalary</Heading>
            {active && (
              <Box direction="column" gap="small">
                <Box
                  background="brand-light"
                  pad="small"
                  round="small"
                  color="brand"
                >
                  <InfoCard label="Connected to " value={account ?? "..."} />
                </Box>
                <InfoCard
                  label="Payment Token Address"
                  value={paymentToken ?? "..."}
                />
                <InfoCard
                  label="Available for claiming"
                  value={`${
                    utils.formatEther(pendingReward ?? 0) ?? "..."
                  } VON`}
                />
                <InfoCard
                  label="Last claimed block"
                  value={`${lastBlockClaimed?.toString()} (${ethers.BigNumber.from(
                    currentBlock ?? 0
                  )
                    .sub(lastBlockClaimed ?? 0)
                    .toString()}
                since last claim)`}
                />
                <InfoCard label="Current block" value={currentBlock} />
                <InfoCard
                  label="VON per block"
                  value={`${
                    utils.formatEther(claimPerBlock ?? 0) ?? "..."
                  } VON`}
                />
                <Button
                  primary
                  onClick={onClaim}
                  size="large"
                  disabled={claiming}
                  label="Claim Now"
                />

                <Accordion>
                  <AccordionPanel label="Mod management">
                    <Box direction="column" gap="small">
                      <TextInput
                        placeholder="Address to provide salary"
                        onChange={(event) => setAddress(event.target.value)}
                      />
                      <TextInput
                        placeholder="VON per block"
                        onChange={(event) =>
                          setVonPerBlock(
                            ethers.utils.parseEther(event?.target?.value ?? "0")
                          )
                        }
                      />

                      <Button
                        primary
                        onClick={onAddMod}
                        disabled={adding}
                        label="Add Mod"
                      />
                    </Box>
                  </AccordionPanel>
                </Accordion>
              </Box>
            )}

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
