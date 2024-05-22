import { Module } from '@nestjs/common';
import { desafiosController } from './desafio.controller';
import { desafiosService } from './desafios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interfaces/desafio.schema';
import { JogadoresModule } from 'src/jogadores/jogadores.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Desafio', schema: DesafioSchema}]),JogadoresModule],
    controllers: [desafiosController],
    providers: [desafiosService]
  
})
export class DesafiosModule {}
