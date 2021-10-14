import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { ChainId } from "../constants/chain";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [ ChainId.BKC, ChainId.BSC ]
});


export const networkConnector = new NetworkConnector({
  urls: {
      [ChainId.BKC]: 'https://rpc.bitkubchain.io'
  }
})
