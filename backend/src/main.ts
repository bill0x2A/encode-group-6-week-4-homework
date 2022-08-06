import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Week 4 Homework Group 6')
    .setVersion('1.0.0')
    .setDescription('IPFS NFT project for week 4 of Encode Solidity bootcamp')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
  const port = process.env.PORT || 3001;
  await app.listen(port);
}
bootstrap();
