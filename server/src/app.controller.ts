import { Controller, Get, Logger,  } from '@nestjs/common';
import { MathService } from './math.service';
// import { MessagePattern } from '@nestjs/microservices'; <-- Change this
import { GrpcMethod } from '@nestjs/microservices'; //     <-- to this
import { Injectable, Inject } from '@nestjs/common';
import { EventPattern, ClientProxy } from '@nestjs/microservices';

interface INumberArray { //      <--
  data: number[]; //             <--   Add these
} //                             <--   two
interface ISumOfNumberArray { // <--   interfaces
  sum: number; //                <--
} //                             <--

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(private mathService: MathService,
    @Inject('EVENT_SERVICE') private client: ClientProxy,

    ) {}

  @GrpcMethod('AppController', 'Accumulate') 
  accumulate(numberArray: INumberArray, metadata: any): ISumOfNumberArray { 
    // this.logger.log('Adding ' + process.env.data + numberArray.data.toString()); 
    this.logger.log(`${process.env.POD_ID} is processing Accumulate function\n`)

    var sum =this.mathService.accumulate(numberArray.data)
    for(var i =0 ; i<7 ; i++){
      sum=sum*sum
      // console.log("sum : " , sum)
    }

    this.client.emit<number>('math_cal', 10)
    console.log("Publishing math_cal event")
    return { sum }; 
  } 

  
  @Get()
  async testGet()  {
    this.client.emit<number>('math_cal', 10)
    return "SERVER SERVICE: emiited math_cal event..!!"; 
  }
  
  @EventPattern('math_cal')
  async handleMathCal(data: Record<string, unknown>) {
    console.log("Handling math_cal event...",  data)
  }
}
