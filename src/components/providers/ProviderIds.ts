export const ProviderIds = {
    Injected: undefined,
    BKC: 'BKC',
} as const;

export type ProviderId = typeof ProviderIds[keyof typeof ProviderIds];