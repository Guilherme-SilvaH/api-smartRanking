import { Module } from '@nestjs/common';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { CategoriaSchema } from './interface/categoria.schema';
import { JogadoresModule } from 'src/jogadores/jogadores.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Categoria', schema: CategoriaSchema}]),
            JogadoresModule],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports: [CategoriasService]
})
export class CategoriasModule {}
