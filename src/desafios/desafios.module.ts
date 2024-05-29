import { Module } from '@nestjs/common';
import { desafiosController } from './desafio.controller';
import { desafiosService } from './desafios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interfaces/desafio.schema';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { PartidaSchema } from './interfaces/partida.schema';

@Module({
    imports: [MongooseModule.forFeature([
    { name: 'Desafio', schema: DesafioSchema},
    {name: 'Partida', schema: PartidaSchema}]),
    JogadoresModule,CategoriasModule],
    controllers: [desafiosController],
    providers: [desafiosService]
  
})
export class DesafiosModule {}
