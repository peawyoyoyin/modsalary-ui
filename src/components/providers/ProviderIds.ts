export const ProviderIds = {
    Injected: undefined,
    BKC: 'BKC',
    BSC: 'BSC',
} as const;

export type ProviderId = typeof ProviderIds[keyof typeof ProviderIds];
