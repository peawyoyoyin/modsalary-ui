import { NetworkConnector } from "@web3-react/network-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ChainIds, RpcUrls } from "../constants/chain";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [ ChainIds.BKC, ChainIds.BSC ]
});

export const BscNetworkConnector = new NetworkConnector({
  urls: RpcUrls,
  defaultChainId: ChainIds.BSC
})

export const BkcNetworkConnector = new NetworkConnector({
  urls: RpcUrls,
  defaultChainId: ChainIds.BKC,
})
