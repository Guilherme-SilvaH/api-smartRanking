import { Module } from '@nestjs/common';
import { desafiosController } from './desafio.controller';
import { desafiosService } from './desafios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interfaces/desafio.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Desafio', schema: DesafioSchema}])],
    controllers: [desafiosController],
    providers: [desafiosService]
  
})
export class DesafiosModule {}
