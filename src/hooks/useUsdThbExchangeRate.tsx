import useSWR from "swr";

interface ExchangeRateResponse {
  success: boolean;
  base: string; // e.g. "USD"
  date: string; // e.g. "2021-10-18"
  rates: {
    [target: string]: number // e.g. "THB": 33.43
  }
}

const exchangeRateUrl = 'https://api.exchangerate.host/latest?base=USD&symbols=THB';

const fetcher = async () => {
  const res = await fetch(exchangeRateUrl);
  const resJson = await res.json() as unknown as ExchangeRateResponse;

  if (!resJson.success) {
    throw new Error('fetching USD-THB rate was not successful');
  }

  const { base, date, rates } = resJson;
  return {
    base,
    date,
    rates,
  };
}

export const useUsdThbExchangeRate = () => {
  return useSWR(exchangeRateUrl, fetcher, {
    refreshInterval: 30000,
  });
}
