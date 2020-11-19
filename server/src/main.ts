import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { join } from 'path'; // <-- Add this


const logger = new Logger('Main');
const rpcOptions = {
  // transport: Transport.REDIS,  <-- Change this
  transport: Transport.GRPC,  //  <-- to this
  options: {
    // url: 'redis://localhost:6379',                  <-- remove this
    package: 'app', //                                 <-- add this
    protoPath: join(__dirname, '../src/app.proto'), // <-- & this
    url: process.env.RPC_HOST || 'localhost:50051'
  },
};
const natsOptions={
  transport:Transport.NATS,
  name:'EVENT_SERVICE',
  options: {
    // url: 'http://121.166.76.122:39016',
    // url: 'nats://127.0.0.1:4222',
    url: 'http://127.0.0.1:4222',
    user:"admin",
    pass:"password",
    // url: process.env.NATS_URL || 'nats://localhost:4222',
    queue: 'test_queue',
    clusterId:"clusteid",
    clientId:"clietnId"
  }
}

async function bootstrap() {
  // const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);
  
  // // await app.listen(9000);ç

  // app.listen(() => {
  //   logger.log(`${process.env.POD_ID} : server is listening !!!!!! ${process.env.RPC_HOST}`);
  // });

  // ############################
  const app = await NestFactory.create(AppModule);
  // initConnection()
 
  const rpcMicroservice = app.connectMicroservice(rpcOptions);
  const natsMicroservice = app.connectMicroservice(natsOptions)


  await app.startAllMicroservicesAsync();
  // await app.listen(3000);
  await app.listen(process.env.PORT || 3001);
  console.log("service is running at port : ", process.env.PORT|| 3001, " nats url : ", process.env.NATS_URL || 'nats://localhost:4222')
  
}
bootstrap();
