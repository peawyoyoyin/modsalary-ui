import { useContract } from "./useContract";
import { xVonBusdLPAddress } from '../../constants/addresses';
import uniswapV2PairAbi from '../../constants/abis/UniswapV2Pair.abi.json';
import { ProviderIds } from "../../components/providers/ProviderIds";

export const useXvonBusdLpContract = () => useContract(xVonBusdLPAddress, uniswapV2PairAbi, { providerId: ProviderIds.BSC });
