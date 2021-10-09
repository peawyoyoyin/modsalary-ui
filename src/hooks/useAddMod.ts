import { BigNumber } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { useModSalaryContract } from "./contracts/useModSalaryContract"

export const useAddMod = (): [(targetAddress: string, claimPerBlock: BigNumber) => void, boolean] => {
  const { active } = useWeb3React();

  const [adding, setAdding] = useState(false);

  const modSalaryContract = useModSalaryContract();
  
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
