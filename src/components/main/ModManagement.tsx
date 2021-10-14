import { ethers } from "ethers";
import { Accordion, AccordionPanel, Box, Button, Text, TextInput } from "grommet";
import { useCallback, useMemo, useState } from "react";
import { blocksPerMonth } from "../../constants/chainData";
import { useAddMod } from "../../hooks/useAddMod";
import { useVonPrice } from "../../hooks/useVonPrice";
import { formatThbAmountStr } from "../../utils/formats/formatThbAmount";

export const ModManagement = () => {
    const [address, setAddress] = useState("");
    const vonPrice = useVonPrice();
    const [vonPerBlock, setVonPerBlock] = useState(ethers.BigNumber.from(0));
    const [addMod, adding] = useAddMod();
    const onAddMod = useCallback(async () => {
        addMod(address, vonPerBlock);
    }, [addMod, address, vonPerBlock]);

    const vonPerMonth = useMemo(() => vonPerBlock.mul(ethers.BigNumber.from(blocksPerMonth)), [vonPerBlock]);
    const thbPerMonth = useMemo(() => {
        if (vonPrice?.vonPriceInThb) {
            return vonPerMonth.mul(vonPrice.vonPriceInThb).div(ethers.BigNumber.from('1000000000000000000'))
        }

        return null;
    }, [vonPerMonth, vonPrice.vonPriceInThb])

    const formattedThbPerMonth = thbPerMonth ? formatThbAmountStr(ethers.utils.formatEther(thbPerMonth)) : '...'

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
                            VON per block
                        </Text>
                        <TextInput
                            placeholder="VON per block"
                            onChange={(event) =>
                                setVonPerBlock(
                                    ethers.utils.parseEther(event?.target?.value || "0")
                                )
                            }
                        />
                        {
                            vonPerBlock.gte(0) && (
                                <Text color="gray" size="xsmall">
                                    {ethers.utils.formatEther(vonPerMonth)} VON (~{formattedThbPerMonth} THB) per month
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