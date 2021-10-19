import { utils, BigNumber } from "ethers";
import { Box } from "grommet";
import { useMemo } from "react";
import { addresses } from "../../../../constants/addresses";
import { BlockRates, ChainIds } from "../../../../constants/chain";
import { useCurrentBlock } from "../../../../hooks/useCurrentBlock";
import { useKubPrice } from "../../../../hooks/useKubPrice";
import { useModSalaryInfo } from "../../../../hooks/useModSalaryInfo";
import { useVonPrice } from "../../../../hooks/useVonPrice";
import { formatMinutes } from "../../../../utils/formats/formatMinutes";
import { ProviderIds } from "../../../providers/ProviderIds";
import { InfoCard } from "../../InfoCard";

export function InfoTabBkc() {
  const currentBlock = useCurrentBlock(ProviderIds.BKC);
  const {
    paymentToken,
    endBlock,
  } = useModSalaryInfo(ChainIds.BKC);

  const kubPrice = useKubPrice();
  const vonPrice = useVonPrice();

  const formattedKubPrice = utils.formatEther(kubPrice?.kubPriceThb ?? 0);
  const formattedVonPrice = utils.formatEther(vonPrice?.vonPriceInThb ?? 0);

  const formattedEndBlock = endBlock?.toString() ?? '???';

  const blocksLeft = useMemo(() => {
    if (endBlock?.gte(currentBlock ?? 0)) {
      return endBlock.sub(currentBlock ?? 0);
    }

    return BigNumber.from(0)
  }, [endBlock, currentBlock]);
  
  const minutesLeft = useMemo(() => {
    if (blocksLeft.gte(0)) {
      return blocksLeft.mul(BigNumber.from(BlockRates[ChainIds.BKC].blockTimeSeconds)).div(BigNumber.from(60));
    }
    
    return null;
  }, [blocksLeft]);

  const formattedBlocksLeftText = blocksLeft.gte(0) ? `${blocksLeft.toString()} blocks left` : "already ended";
  const formattedMinutesLeft = minutesLeft ? formatMinutes(minutesLeft) : 'none';

  return (
    <Box direction="column" gap="small" pad={{ vertical: "small" }}>
      <InfoCard
        label="VON Price"
        value={`${formattedVonPrice} THB`}
      />
      <InfoCard
        label="KUB Price"
        value={`${formattedKubPrice} THB`}
      />
      <InfoCard
        label="Current block"
        value={currentBlock}
      />
      <InfoCard
        label="Payment Period ends in"
        value={formattedMinutesLeft}
        helperText={`Ends at Block #${formattedEndBlock} (${formattedBlocksLeftText})`}
      />
      <InfoCard
        label="ModSalary contract address"
        value={addresses.modSalary[ChainIds.BKC]}
      />
      <InfoCard
        label="Payment Token Address"
        value={paymentToken ?? "..."}
      />
    </Box>
  );
}
