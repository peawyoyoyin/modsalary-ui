export const ChainId = {
    BKC: 96,
    BSC: 56,
} as const;

export const ChainNames = {
    [ChainId.BKC]: 'BKC',
    [ChainId.BSC]: 'BSC',
} as const;