import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';


@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}


    @Post()
    @UsePipes(ValidationPipe)
    //metodo
    async criarAtualizarJogador(
        //cria um body para extrair um obj da req com a estancia "criaJogadorDto" que é do tipo "CriarJogadorDto"
        @Body() criaJogadorDto: CriarJogadorDto){
            await this.jogadoresService.criarAtualizarJogador(criaJogadorDto)
    } 
    
    @Get()
    async consultarJogadores(
        @Query('email') email: string): Promise<Jogador[] | Jogador>{
            if (email) {
                return await this.jogadoresService.consultarJogadoresPeloEmail(email)
            }else{
                return  await this.jogadoresService.consultarTodosJogadores()
            }
    } 

    @Delete()
    async deletarJogador(
        @Query('email') email: string): Promise<void>{
            this.jogadoresService.deletarJogador(email)
        }
}   
