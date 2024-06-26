import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose'
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:93929136gGui@cluster0.gj5iy6p.mongodb.net/smartranking?retryWrites=true&w=majority&appName=Cluster0'),
    
    JogadoresModule,
    
    CategoriasModule,
    
    DesafiosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
