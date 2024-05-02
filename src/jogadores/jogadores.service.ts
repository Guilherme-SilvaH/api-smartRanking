import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid'

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = []

    private readonly logger = new Logger(JogadoresService.name)

    //metodo
    async criarAtualizarJogador(CriaJogadorDto: CriarJogadorDto): Promise<void>{
   
        this.criar(CriaJogadorDto)

    }

    //aqui vamos criar o jogador completo, preenchendo os dados que o backend preenche sozinho, e os dados que o usuario preenche(nome,phoneNumber,email)
    private criar(criaJogadorDto: CriarJogadorDto) : void{   //recebemos como paramentro criaJogadorDto que é do tipo CriarJogadorDto
        
        //destruturamos o criaJogadorDto, para pegar o que o usuario colocou
        const { nome, phoneNumber, email } = criaJogadorDto

        //e assim criamos um jogador do tipo Jogador
        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            phoneNumber,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.gogle.com.br/foto123.jpg'
        }
        //aqui populamos o array jogadores
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`);
        this.jogadores.push(jogador);
    }

}
