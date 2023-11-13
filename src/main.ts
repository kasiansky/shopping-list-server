import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {seed} from './seed'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });
  await seed();
  await app.listen(4000);
}
bootstrap();
