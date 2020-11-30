import { EthereumConfigModule } from "../config";
import { ConfigType } from "@nestjs/config";
export declare class EthereumService {
    private ethereumConfig;
    private web3;
    constructor(ethereumConfig: ConfigType<typeof EthereumConfigModule>);
    transferFund(sendersData: any, recieverData: any, amountToSend: any): Promise<{
        error: any;
        transactionHash?: undefined;
        link?: undefined;
    } | {
        transactionHash: any;
        link: string;
        error?: undefined;
    }>;
    getCurrentGasPrices(): Promise<{
        low: any;
        medium: any;
        high: any;
    }>;
    getBalance(address: any): Promise<unknown>;
}
