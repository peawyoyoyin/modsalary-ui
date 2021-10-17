import { BigNumber } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useState } from "react";
import { ChainId } from "../constants/chain";
import { useModSalaryContract } from "./contracts/useModSalaryContract"

export const useAddMod = (chainId: ChainId): [(targetAddress: string, claimPerBlock: BigNumber) => void, boolean] => {
  const { active } = useWeb3React();

  const [adding, setAdding] = useState(false);

  const modSalaryContract = useModSalaryContract(chainId, true);
  
  const addMod = useCallback((targetAddress, claimPerBlock) => {
    if (!active) {
      return;
    }

    setAdding(true);
    modSalaryContract?.addMod(targetAddress, claimPerBlock).then(() => {})
      .catch(console.error)
      .finally(() => setAdding(false));
  }, [active, modSalaryContract]);

  return [addMod, adding];
}
