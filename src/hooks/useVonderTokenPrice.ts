import { ChainId, ChainIds } from "../constants/chain";
import { useVonPrice } from "./useVonPrice";
import { useXvonPrice } from "./useXvonPrice";

export const useVonderTokenPrice = (chainId: ChainId) => {
  const vonPrice = useVonPrice();
  const xVonPrice = useXvonPrice();
  
  if (chainId === ChainIds.BSC) {
    return {
      priceThb: xVonPrice?.xVonPriceThb
    };
  }

  // return BKC by default
  return {
    priceThb: vonPrice?.vonPriceInThb
  };
}
