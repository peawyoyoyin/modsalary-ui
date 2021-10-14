export const formatThbAmountStr = (thbAmount: string) =>
    /\d+\.\d{2}/.exec(thbAmount)?.[0] ?? thbAmount;
