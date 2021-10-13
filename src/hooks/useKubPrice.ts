import { BigNumber } from "@ethersproject/bignumber";
import { useEffect, useState } from "react";
import { useCurrentBlock } from "./useCurrentBlock";

interface KubPriceResponse {
    message: string;
    result: {
        ethbtc: string;
        ethbtc_timestamp: string;
        ethusd: string;
        ethusd_timestamp: string;
    }
    status: string;
}

const fetchKubPrice = async () => {
    const res = await fetch('https://bkcscan.com/api?module=stats&action=ethprice');
    const resJson = await res.json() as unknown as KubPriceResponse;
    const { result, status } = resJson;

    if (status !== '1') {
        return null;
    }


    return {
        kubPriceBtc: result.ethbtc,
        kubPriceBtcTimestamp: result.ethbtc_timestamp,

        // for some reason, ethusd is the price in THB
        // kubPrice THB = (parseFloat(ethusd) * 100) * 1e16
        kubPriceThb: BigNumber.from(parseFloat(result.ethusd) * 100).mul(BigNumber.from('10000000000000000')),
        kubPriceThbTimestamp: result.ethusd_timestamp,
    };
}

interface KubPrices {
    kubPriceThb: BigNumber;
}

export const useKubPrice = () => {
    const [kubPrice, setKubPrice] = useState<KubPrices | null>(null);
    const currentBlock = useCurrentBlock();

    useEffect(() => {
        // here use silly modulo maths to throttle requests
        if (!kubPrice || (currentBlock ?? 0) % 13 === 7) {
            fetchKubPrice().then(prices => setKubPrice(prices))
        }
    }, [currentBlock, kubPrice]);

    return kubPrice;
}
