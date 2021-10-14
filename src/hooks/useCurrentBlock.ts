import { useWeb3React } from "@web3-react/core"
import { providers } from "ethers";
import { useEffect, useState } from "react";
import { ProviderId, ProviderIds } from "../components/providers/ProviderIds";

export const useCurrentBlock = (providerId: ProviderId = ProviderIds.Injected) => {
  const { library } = useWeb3React<providers.Web3Provider>(providerId);
  const [currentBlock, setCurrentBlock] = useState<number | null>(null);

  library?.getBlockNumber()
    .then(blockNumber => setCurrentBlock(blockNumber))
    .catch(console.error);

  useEffect(() => {
    library?.on('block', (blockNumber) => {
      setCurrentBlock(blockNumber);
    });

    return () => {
      library?.off('block')
    }
  }, [library]);

  return currentBlock;
}
