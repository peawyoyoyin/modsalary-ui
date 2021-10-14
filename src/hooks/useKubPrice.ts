import { BigNumber } from "@ethersproject/bignumber";
import { useEffect, useState } from "react";
import { ProviderIds } from "../components/providers/ProviderIds";
import { wei } from "../constants";
import { useCurrentBlock } from "./useCurrentBlock";

interface KubPriceResponse {
    error: number;
    result: [[
        orderId: number,
        timestamp: number,
        volume: number,
        rate: number,
        amount: number,
    ]]
}

const fetchKubPrice = async () => {
    const res = await fetch('https://api.bitkub.com/api/market/asks?sym=THB_KUB&lmt=1');
    const resJson = await res.json() as unknown as KubPriceResponse;
    const { error, result } = resJson;

    if (error !== 0 || !result?.[0]) {
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [orderId, timestamp, volume, rate, amount] = result?.[0] ?? [0,0,0,0,0];

    return {
        kubPriceThb: BigNumber.from(rate * 100).mul(wei.div(100)),
    }
}

interface KubPrices {
    kubPriceThb: BigNumber;
}
export const useKubPrice = () => {
    const [kubPrice, setKubPrice] = useState<KubPrices | null>(null);
    const currentBlock = useCurrentBlock(ProviderIds.BKC);

    useEffect(() => {
        // here use silly modulo maths to throttle requests
        if (!kubPrice || (currentBlock ?? 0) % 39 === 7) {
            fetchKubPrice()
                .then(prices => setKubPrice(prices))
                .catch(e => console.error('error fetching kub price', e))
        }
    }, [currentBlock, kubPrice]);

    return kubPrice;
}
