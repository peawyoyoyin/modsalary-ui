import { useContract } from "./useContract";

import erc20Abi from '../../constants/abis/ERC20.abi.json';

export const useERC20Contract = (address: string) => useContract(address, erc20Abi);
