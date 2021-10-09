import { modSalaryAddress } from "../../constants/addresses";
import { useContract } from "./useContract";

import modSalaryAbi from '../../constants/abis/ModSalary.abi.json';

export const useModSalaryContract = () => useContract(modSalaryAddress, modSalaryAbi);
