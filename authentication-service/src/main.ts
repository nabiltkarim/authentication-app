import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    methods: ['GET', 'POST', 'PUT'],
    origin: '*',
  })
  const configService = app.get(ConfigService)
  await app.listen(configService.get('port'))
}
bootstrap()
