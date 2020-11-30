export declare class TransferService {
    transferFund(sendersData: any, recieverData: any, amountToSend: any): Promise<unknown>;
    getCurrentGasPrices(): Promise<{
        low: number;
        medium: number;
        high: number;
    }>;
    getBalance(address: any): Promise<unknown>;
}
