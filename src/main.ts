import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import * as momentTimezone from 'moment-timezone'



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  // Estendendo a função toJSON para Date
  /*
    Sobrecescrevemo a função toJsson do Date passando um objeto moment. Deste modo
    uando o objeto for serializado, ele utilizará o formato de data definido por nós
    Todos os sobjetos Date serão afetados com esta implementação
  */
  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app.listen(8080);
}

bootstrap();