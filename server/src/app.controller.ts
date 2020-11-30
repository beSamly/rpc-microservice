import { Controller, Get, Logger, Catch, HttpException } from "@nestjs/common";
import { MathService } from "./math.service";
// import { MessagePattern } from '@nestjs/microservices'; <-- Change this
import { GrpcMethod } from "@nestjs/microservices"; //     <-- to this
import { Injectable, Inject } from "@nestjs/common";
import { EventPattern, ClientProxy } from "@nestjs/microservices";
import { IEthereumService } from "./etherium/IEthereumService";
import { InsufficientBalance } from "./common/error/InsufficientBalance.error";

interface INumberArray {
  //      <--
  data: number[]; //             <--   Add these
} //                             <--   two
interface ISumOfNumberArray {
  // <--   interfaces
  sum: number; //                <--
} //                             <--

@Controller()
@Catch()
export class AppController {
  private logger = new Logger("AppController");

  constructor(
    private mathService: MathService,
    @Inject("EVENT_SERVICE") private client: ClientProxy,
    @Inject("EthereumService") private ethereumService: any
  ) {}

  @GrpcMethod("AppController", "Accumulate")
  accumulate(numberArray: INumberArray, metadata: any): ISumOfNumberArray {
    // this.logger.log('Adding ' + process.env.data + numberArray.data.toString());
    this.logger.log(
      `${process.env.POD_ID} is processing Accumulate function\n`
    );

    var sum = this.mathService.accumulate(numberArray.data);
    for (var i = 0; i < 7; i++) {
      sum = sum * sum;
      // console.log("sum : " , sum)
    }

    this.client.emit<number>("math_cal", 10);
    console.log("Publishing math_cal event");
    return { sum };
  }

  @Get()
  async testGet() {
    this.client.emit<number>("math_cal", 10);
    return "SERVER SERVICE: emiited math_cal event..!!";
  }

  @Get("/transfer")
  async transfer() {
    const senderAddress = "0x9C9023D70aE3C186705B08F23D0b23fFf5F72174";
    const senderPrivateKey = "0x4088841030b2d3c624a4ae11b20b5891d35265d283ce3f008ab7551793702ee9";
    const receiverAddress = "0xAD2bF054067d71b0F5aD3d3E0243F25eBA36e0Cb";

    return this.ethereumService.transferFund({address: senderAddress, privateKey: senderPrivateKey},{address: receiverAddress},0.1)
  }

  @EventPattern("math_cal")
  async handleMathCal(data: Record<string, unknown>) {
    console.log("Handling math_cal event...", data);
  }
}
