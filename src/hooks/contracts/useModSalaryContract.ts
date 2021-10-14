import { modSalaryAddress } from "../../constants/addresses";
import { useContract } from "./useContract";

import modSalaryAbi from '../../constants/abis/ModSalary.abi.json';
import { ProviderId, ProviderIds } from "../../components/providers/ProviderIds";

export const useModSalaryContract = (providerId: ProviderId = ProviderIds.Injected) => useContract(modSalaryAddress, modSalaryAbi, { providerId });
