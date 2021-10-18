import { utils } from "ethers";
import { Box } from "grommet";
import { addresses } from "../../../../constants/addresses";
import { ChainIds } from "../../../../constants/chain";
import { useCurrentBlock } from "../../../../hooks/useCurrentBlock";
import { useModSalaryInfo } from "../../../../hooks/useModSalaryInfo";
import { useUsdThbExchangeRate } from "../../../../hooks/useUsdThbExchangeRate";
import { useXvonPrice } from "../../../../hooks/useXvonPrice";
import { ProviderIds } from "../../../providers/ProviderIds";
import { InfoCard } from "../../InfoCard";

export function InfoTabBsc() {
  const currentBlock = useCurrentBlock(ProviderIds.BSC);
  const {
    paymentToken,
  } = useModSalaryInfo(ChainIds.BSC);
  const { data: usdToThbExchangeRates } = useUsdThbExchangeRate();

  const xVonPrices = useXvonPrice();

  const formattedXvonPrice = utils.formatEther(xVonPrices?.xVonPriceThb ?? 0);
  const formattedXvonPriceBusd = utils.formatEther(xVonPrices?.xVonPriceBusd ?? 0);
  const formattedUsdToThbRate = usdToThbExchangeRates?.rates['THB'] ?? '...';

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
