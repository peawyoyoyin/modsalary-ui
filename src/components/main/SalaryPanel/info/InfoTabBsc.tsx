import { utils, BigNumber } from "ethers";
import { Box } from "grommet";
import { useMemo } from "react";
import { addresses } from "../../../../constants/addresses";
import { BlockRates, ChainIds } from "../../../../constants/chain";
import { useCurrentBlock } from "../../../../hooks/useCurrentBlock";
import { useModSalaryInfo } from "../../../../hooks/useModSalaryInfo";
import { useUsdThbExchangeRate } from "../../../../hooks/useUsdThbExchangeRate";
import { useXvonPrice } from "../../../../hooks/useXvonPrice";
import { formatMinutes } from "../../../../utils/formats/formatMinutes";
import { ProviderIds } from "../../../providers/ProviderIds";
import { InfoCard } from "../../InfoCard";

export function InfoTabBsc() {
  const currentBlock = useCurrentBlock(ProviderIds.BSC);
  const {
    paymentToken,
    endBlock,
  } = useModSalaryInfo(ChainIds.BSC);
  const { data: usdToThbExchangeRates } = useUsdThbExchangeRate();

  const xVonPrices = useXvonPrice();

  const formattedXvonPrice = utils.formatEther(xVonPrices?.xVonPriceThb ?? 0);
  const formattedXvonPriceBusd = utils.formatEther(xVonPrices?.xVonPriceBusd ?? 0);
  const formattedUsdToThbRate = usdToThbExchangeRates?.rates['THB'] ?? '...';

  const formattedEndBlock = endBlock?.toString() ?? '???';

  const blocksLeft = useMemo(() => {
    if (endBlock?.gte(currentBlock ?? 0)) {
      return endBlock.sub(currentBlock ?? 0);
    }

    return BigNumber.from(0)
  }, [endBlock, currentBlock]);
  
  const minutesLeft = useMemo(() => {
    if (blocksLeft.gte(0)) {
      return blocksLeft.mul(BigNumber.from(BlockRates[ChainIds.BSC].blockTimeSeconds)).div(BigNumber.from(60));
    }
    
    return null;
  }, [blocksLeft]);

  const formattedBlocksLeftText = blocksLeft.gte(0) ? `${blocksLeft.toString()} blocks left` : "already ended";
  const formattedMinutesLeft = minutesLeft ? formatMinutes(minutesLeft) : 'none';

  return (
    <Box direction="column" gap="small" pad={{ vertical: "small" }}>
      <InfoCard
        label="xVON Price"
        value={`${formattedXvonPrice} THB`}
        helperText={`${formattedXvonPriceBusd} BUSD, ${formattedUsdToThbRate} USD/THB`}
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
        value={addresses.modSalary[ChainIds.BSC]}
      />
      <InfoCard
        label="Payment Token Address"
        value={paymentToken ?? "..."}
      />
    </Box>
  );
}
