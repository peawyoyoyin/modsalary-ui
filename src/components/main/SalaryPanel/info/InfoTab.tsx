import { useMemo } from "react";
import { ChainId, ChainIds } from "../../../../constants/chain";
import { InfoTabBkc } from "./InfoTabBkc";
import { InfoTabBsc } from "./InfoTabBsc";

interface InfoTabProps {
  chainId: ChainId;
}

export function InfoTab({ chainId }: InfoTabProps) {
  const infoContent = useMemo(() => {
    if (chainId === ChainIds.BKC) {
      return (
        <InfoTabBkc />
      );
    }

    if (chainId === ChainIds.BSC) {
      return (
        <InfoTabBsc />
      );
    }
  }, [chainId])

  return infoContent ?? <div />;
}
