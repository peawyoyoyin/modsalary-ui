import { ethers } from "ethers";
import { useEffect, useState } from "react";

type ContractReadInterAction<T> = (contract: ethers.Contract) => Promise<T>;

export const useContractRead = <T>(contract: ethers.Contract | null, readInteraction: ContractReadInterAction<T>, name?: string) => {
    const [result, setResult] = useState<T | null>(null);
    
    useEffect(() => {
        if (contract) {
            readInteraction(contract)
                .then(result => setResult(result))
                .catch(console.error);
        }
    }, [contract, readInteraction, name]);

    return result;
}