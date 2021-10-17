import { ProviderIds } from "../components/providers/ProviderIds";

export const ChainIds = {
    BKC: 96,
    BSC: 56,
} as const;

export type ChainId = typeof ChainIds[keyof typeof ChainIds];

export const ChainNames = {
    [ChainIds.BKC]: 'BKC',
    [ChainIds.BSC]: 'BSC',
} as const;

export const ChainIdToProviderId = {
    [ChainIds.BKC]: ProviderIds.BKC,
    [ChainIds.BSC]: ProviderIds.BSC,
} as const;

export const RpcUrls = {
    [ChainIds.BKC]: 'https://rpc.bitkubchain.io',
    [ChainIds.BSC]: 'https://bsc-dataseed.binance.org',
} as const;
