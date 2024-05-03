import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}

    @Post()
    //metodo
    async criarAtualizarJogador(
        //cria um body para extrair um obj da req com a estancia "criaJogadorDto" que é do tipo "CriarJogadorDto"
        @Body() criaJogadorDto: CriarJogadorDto){
            await this.jogadoresService.criarAtualizarJogador(criaJogadorDto)
    } 

    
    @Get()
    async consultarJogadores(): Promise<Jogador[]>{

        return this.jogadoresService.consultarTodosJogadores()

    } 
}   
