import { utils } from "ethers";
import { Box } from "grommet";
import { addresses } from "../../../../constants/addresses";
import { ChainIds } from "../../../../constants/chain";
import { useCurrentBlock } from "../../../../hooks/useCurrentBlock";
import { useKubPrice } from "../../../../hooks/useKubPrice";
import { useModSalaryInfo } from "../../../../hooks/useModSalaryInfo";
import { useVonPrice } from "../../../../hooks/useVonPrice";
import { ProviderIds } from "../../../providers/ProviderIds";
import { InfoCard } from "../../InfoCard";

export function InfoTabBkc() {
  const currentBlock = useCurrentBlock(ProviderIds.BKC);
  const {
    paymentToken,
  } = useModSalaryInfo(ChainIds.BKC);

  const kubPrice = useKubPrice();
  const vonPrice = useVonPrice();

  const formattedKubPrice = utils.formatEther(kubPrice?.kubPriceThb ?? 0);
  const formattedVonPrice = utils.formatEther(vonPrice?.vonPriceInThb ?? 0);

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
