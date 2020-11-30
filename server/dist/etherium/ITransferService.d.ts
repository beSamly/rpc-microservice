export interface IEthereumService {
    transferFund(sendersData: object, recieverData: object, amountToSend: number): Promise<null>;
    getCurrentGasPrices(): String;
    getBalance(address: string): Promise<null>;
}
