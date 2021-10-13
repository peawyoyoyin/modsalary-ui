import { useContract } from "./useContract";
import { vonKubLPAddress } from '../../constants/addresses';
import uniswapV2PairAbi from '../../constants/abis/UniswapV2Pair.abi.json';

export const useVonKubLpContract = () => useContract(vonKubLPAddress, uniswapV2PairAbi);