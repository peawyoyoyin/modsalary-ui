import { useWeb3React } from "@web3-react/core";
import { useCallback, useState } from "react";
import { ChainId } from "../constants/chain";
import { useModSalaryContract } from "./contracts/useModSalaryContract"

export const useClaim = (chainId: ChainId): [() => void, boolean] => {
  const { active } = useWeb3React();

  const [claiming, setClaiming] = useState(false);

  const modSalaryContract = useModSalaryContract(chainId);
  
  const claim = useCallback(() => {
    if (!active) {
      return;
    }

    setClaiming(true);
    modSalaryContract?.claim().then(() => {})
      .catch(console.error)
      .finally(() => setClaiming(false));
  }, [active, modSalaryContract]);

  return [claim, claiming];
}
