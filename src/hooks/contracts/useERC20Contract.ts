import { useContract } from "./useContract";

import erc20Abi from '../../constants/abis/ERC20.abi.json';
import { ProviderId } from "../../components/providers/ProviderIds";

export const useERC20Contract = (address: string | null | undefined, providerId?: ProviderId) => useContract(address, erc20Abi, { providerId });
