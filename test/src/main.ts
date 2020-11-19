import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
  console.log(`${process.env.POD_ID} : client is listening on port 5000 | listening on rpc port ${process.env.RPC_SRV_URL}`)
}
bootstrap();
