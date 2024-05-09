import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { jogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';


@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}



    
    @Post()
    @UsePipes(ValidationPipe)//pipe para validar se todos os campos de parametros para criar um jogador esta preenchido 
    //metodo
    async criarJogador(
        //cria um body para extrair um obj da req com a estancia "criaJogadorDto" que é do tipo "CriarJogadorDto"
        @Body() criaJogadorDto: CriarJogadorDto){
            await this.jogadoresService.criarJogador(criaJogadorDto)
    }

     
    @Put('/:_id')
    @UsePipes(ValidationPipe)//pipe para validar se todos os campos de parametros para criar um jogador esta preenchido 
    //metodo
    async atualizarJogador(
        //@BODY = cria um body para extrair um obj da req com a estancia "criaJogadorDto" que é do tipo "CriarJogadorDto"
        @Body() criaJogadorDto: CriarJogadorDto,
        @Param('_id', jogadoresValidacaoParametrosPipe) _id: string): Promise<void>{
            await this.jogadoresService.atualizarJogador(criaJogadorDto)
    } 
    

    //Retorna todos os usuarios cadastrados no banco
    @Get()
    async consultarJogadores(): Promise<Jogador[]>{
        return  await this.jogadoresService.consultarTodosJogadores()     
    } 


    //Get que retorna o jogador pelo ID, ele recebe um parametro pela URL que é o _ID
    @Get('/:_id')
    async consultarJogadoresPeloId(
        @Param('_id', jogadoresValidacaoParametrosPipe) _Id: string): Promise<Jogador>{//@param é usado para acessar parâmetros de rota em controladores.
            return await this.jogadoresService.consultarJogadoresPeloId(_Id)
    } 



    //Deleta um Jogador atraves do email passado como paramentro
    @Delete('/:_id')
    async deletarJogador(
        @Param('_Id', jogadoresValidacaoParametrosPipe ) _id: string): Promise<void>{
            this.jogadoresService.deletarJogador(_id)
        }
}   
