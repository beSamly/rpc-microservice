export interface IEthereumService {
  transferFund(
    sendersData: object,
    recieverData: object,
    amountToSend: number
  ): string;
  getCurrentGasPrices(): String;
  getBalance(address: string): Promise<null>;
}
