import { useWeb3React } from "@web3-react/core"
import { ethers, providers } from "ethers";

import { ContractInterface } from "@ethersproject/contracts";
import { useMemo } from "react";
import { ProviderId, ProviderIds } from "../../components/providers/ProviderIds";

interface UseContractOpts {
  providerId: ProviderId;
  withSignerIfPossible: boolean;
}

export const useContract = (address: string | null | undefined, abi: unknown, { providerId = ProviderIds.Injected, withSignerIfPossible = false }: Partial<UseContractOpts> = {}) => {
  const { library } = useWeb3React<providers.Web3Provider>(providerId);

  return useMemo(
    () => {
      if (!address) {
        return null;
      }

      return new ethers.Contract(address, abi as ContractInterface, withSignerIfPossible ? library?.getSigner() : library);
    },
    [abi, address, library, withSignerIfPossible]
  )
}
