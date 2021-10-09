import { useWeb3React } from "@web3-react/core"
import { providers } from "ethers";
import { useEffect, useState } from "react";

export const useCurrentBlock = () => {
  const { library } = useWeb3React<providers.Web3Provider>();
  const [currentBlock, setCurrentBlock] = useState<number | null>(null);

  library?.getBlockNumber().then(blockNumber => setCurrentBlock(blockNumber));

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
