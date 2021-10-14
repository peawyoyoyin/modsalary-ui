import { ethers } from "ethers";
import { Accordion, AccordionPanel, Box, Button, TextInput } from "grommet";
import { useCallback, useState } from "react";
import { useAddMod } from "../../hooks/useAddMod";

export const ModManagement = () => {
    const [address, setAddress] = useState("");
    const [vonPerBlock, setVonPerBlock] = useState(ethers.BigNumber.from(0));
    const [addMod, adding] = useAddMod();
    const onAddMod = useCallback(async () => {
        addMod(address, vonPerBlock);
    }, [addMod, address, vonPerBlock]);

    return (
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
    );
}