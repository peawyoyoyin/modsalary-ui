import { useWeb3React } from "@web3-react/core"
import { ethers, providers } from "ethers";

import { ContractInterface } from "@ethersproject/contracts";
import { useMemo } from "react";

export const useContract = (address: string | null | undefined, abi: unknown) => {
  const { library } = useWeb3React<providers.Web3Provider>();

  return useMemo(
    () => {
      if (!address) {
        return null;
      }

      return new ethers.Contract(address, abi as ContractInterface, library?.getSigner());
    },
    [abi, address, library]
  )
}
