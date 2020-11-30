import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`${process.env.POD_ID} : Client service on port 3000!!! | listening rpc port ${process.env.RPC_SRV_URL}`)
}
bootstrap();
