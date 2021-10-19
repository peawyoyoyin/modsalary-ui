import { addresses } from "../../constants/addresses";
import { useContract } from "./useContract";

import modSalaryAbi from '../../constants/abis/ModSalary.abi.json';
import { ProviderIds } from "../../components/providers/ProviderIds";
import { ChainId, ChainIdToProviderId } from "../../constants/chain";

export const useModSalaryContract = (chainId: ChainId, useInjected: boolean = false) => {
  const providerId = useInjected ? ProviderIds.Injected : ChainIdToProviderId[chainId];

  return useContract(addresses.modSalary[chainId], modSalaryAbi, { providerId, withSignerIfPossible: useInjected });
}
