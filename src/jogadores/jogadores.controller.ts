import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';


@Controller('api/v1/jogadores')
export class JogadoresController {

    @Post()
    async criarAtualizarJogador(
        //cria um body para extrair um obj da req com a estancia "criaJogadorDto" que é do tipo "CriarJogadorDto"
        @Body() criaJogadorDto: CriarJogadorDto
    ){
        //handler
        const {email} = criaJogadorDto
        return JSON.stringify(`{
            "email": ${email}
        }`)
    } 
}   
