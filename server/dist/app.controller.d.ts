import { MathService } from "./math.service";
import { ClientProxy } from "@nestjs/microservices";
interface INumberArray {
    data: number[];
}
interface ISumOfNumberArray {
    sum: number;
}
export declare class AppController {
    private mathService;
    private client;
    private ethereumService;
    private logger;
    constructor(mathService: MathService, client: ClientProxy, ethereumService: any);
    accumulate(numberArray: INumberArray, metadata: any): ISumOfNumberArray;
    testGet(): Promise<string>;
    transfer(): Promise<any>;
    handleMathCal(data: Record<string, unknown>): Promise<void>;
}
export {};
