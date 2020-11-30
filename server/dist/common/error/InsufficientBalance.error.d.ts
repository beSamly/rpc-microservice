import { HttpException } from "@nestjs/common";
export declare class InsufficientBalance extends HttpException {
    constructor(message: string);
}
