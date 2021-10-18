import { ChainId, ChainNames, ChainNativeCurrencies, RpcUrls } from "../../constants/chain";

declare global {
  interface Window { ethereum: any; }
}

window.ethereum = window.ethereum || {};

const convertChainIdToHexString = (chainId: number) => `0x${chainId.toString(16)}`

export const requestMetamaskToSwitchChain = async (toChainId: ChainId) => {
  if (window.ethereum) {
    const targetChainHexString = convertChainIdToHexString(toChainId);

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          { chainId: targetChainHexString }
        ]
      });

      return;
    } catch(e) {
      if ((e as any).code === 4092) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: targetChainHexString,
              chainName: ChainNames[toChainId],
              nativeCurrency: ChainNativeCurrencies[toChainId],
              rpcUrls: [RpcUrls[toChainId]],
            },
          ],
        });
      }
    }
  }
}
