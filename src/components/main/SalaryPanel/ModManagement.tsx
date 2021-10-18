import { ethers, BigNumber } from "ethers";
import { Accordion, AccordionPanel, Box, Button, Text, TextInput } from "grommet";
import React, { useCallback, useMemo, useState } from "react";
import { wei } from "../../../constants";
import { BlockRates, ChainId } from "../../../constants/chain";
import { useAddMod } from "../../../hooks/useAddMod";
import { useModSalaryInfo } from "../../../hooks/useModSalaryInfo";
import { useVonderTokenPrice } from "../../../hooks/useVonderTokenPrice";
import { formatThbAmountStr } from "../../../utils/formats/formatThbAmount";

interface ModManagementProps {
    chainId: ChainId;
}

export const ModManagement = ({ chainId }: ModManagementProps) => {
    const [address, setAddress] = useState("");
    const [payPerBlock, setPayPerBlock] = useState(ethers.BigNumber.from(0));

    const { paymentTokenSymbol } = useModSalaryInfo(chainId);

    const vonderTokenPrice = useVonderTokenPrice(chainId);

    const vonPerMonth = useMemo(() => payPerBlock.mul(ethers.BigNumber.from(BlockRates[chainId].blocksPerMonth)), [chainId, payPerBlock]);
    const thbPerMonth = useMemo(() => {
        if (vonderTokenPrice?.priceThb) {
            return vonPerMonth.mul(vonderTokenPrice.priceThb).div(wei);
        }

        return null;
    }, [vonPerMonth, vonderTokenPrice.priceThb]);

    const formattedThbPerMonth = thbPerMonth ? formatThbAmountStr(ethers.utils.formatEther(thbPerMonth)) : '...';

    const formattedPaymentTokenSymbol = paymentTokenSymbol ?? '???';

    const [addMod, adding] = useAddMod(chainId);
    const onAddMod = useCallback(async () => {
        addMod(address, payPerBlock);
    }, [addMod, address, payPerBlock]);

    const onPayPerBlockChain = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const parsedPayPerBlock = ethers.utils.parseEther(event?.target?.value || "0");

            setPayPerBlock(parsedPayPerBlock);
        } catch (e) {
            setPayPerBlock(BigNumber.from(0));
        }
    }, []);

    return (
        <Accordion>
            <AccordionPanel label="Mod management">
                <Box direction="column" gap="small">
                    <Box direction="column" gap="xsmall">
                        <Text color="gray" size="small">
                            Address to provide salary
                        </Text>
                        <TextInput
                            placeholder="Address to provide salary"
                            onChange={(event) => setAddress(event.target.value)}
                        />
                    </Box>
                    <Box direction="column" gap="xsmall">
                        <Text color="gray" size="small">
                            {formattedPaymentTokenSymbol} per block
                        </Text>
                        <TextInput
                            placeholder={`${formattedPaymentTokenSymbol} per block`}
                            onChange={onPayPerBlockChain}
                        />
                        {
                            payPerBlock.gt(0) && (
                                <Text color="gray" size="xsmall">
                                    {ethers.utils.formatEther(vonPerMonth)} {formattedPaymentTokenSymbol} (~{formattedThbPerMonth} THB) per month
                                </Text>
                            )
                        }
                    </Box>

                    <Button
                        primary
                        onClick={onAddMod}
                        disabled={adding}
                        label="Add Mod"
                    />
                </Box>
            </AccordionPanel>
        </Accordion>
    );
}
