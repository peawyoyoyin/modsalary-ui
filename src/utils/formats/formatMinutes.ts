import { BigNumber } from "@ethersproject/bignumber";

export const formatMinutes = (minutes: BigNumber): string => {
  const days = minutes.div(60 * 24)
  const hours = minutes.mod(60 * 24).div(60);

  if (minutes.gte(60 * 24)) {
      return `${days.toString()}d ${hours.toString()}h`
  }

  if (minutes.gte(60)) {
      return `${hours.toString()}h`
  }

  if (minutes.lte(1)) {
      return `<1m`;
  }

  return `${minutes.toString()}m`;
}
