import { Controller, Logger, Post, Body, OnModuleInit, Get } from '@nestjs/common';
import { IGrpcService } from './grpc.interface';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { microserviceOptions } from './grpc.options';
import { request } from 'http';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import axios from 'axios'
import { Test } from '@nestjs/testing';


@Controller()
export class AppController implements OnModuleInit {
  private logger = new Logger('AppController');

  @Client(microserviceOptions) // <-- Add
  private client: ClientGrpc;  // <-- this

  private grpcService: IGrpcService;

  // constructor(private mathService: MathService) {} // <-- Remove this

  onModuleInit() {                                                            // <--
    this.grpcService = this.client.getService<IGrpcService>('AppController'); // <-- Add this
  }                                                                           // <--

  @Post('add')
  async accumulate(@Body('data') data: number[])  {
    console.log("\ndata is : ", data)
    this.logger.log(`${process.env.POD_ID} got request in accumulate function `);
    
    return this.grpcService.accumulate({ data }); 
  }

  @Get()
  async testGet()  {
    // await axios.get(process.env.TEST_SRV_URL)
    // .then(function (response) {
    //   // handle success
    //   console.log("response data : ", response.data);
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log("error : " , error);
    // })
    // .then(function () {
    //   // always executed

    return "GET METHOD FOR TEST..!"; 
  }

  @Get('self')
  async testSelf()  {
    return "SELF...."; 
  }
}
