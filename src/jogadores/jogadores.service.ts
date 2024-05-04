import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid'



@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = []

    private readonly logger = new Logger(JogadoresService.name)

    //metodo
    async criarAtualizarJogador(CriaJogadorDto: CriarJogadorDto): Promise<void>{

        const { email } = CriaJogadorDto
        
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

        if(jogadorEncontrado){
            this.atualizar(jogadorEncontrado, CriaJogadorDto)
        }else{
            this.criar(CriaJogadorDto)
        }


    }

    //metodo
    async consultarTodosJogadores(): Promise<Jogador[]>{
        return this.jogadores
    }


    async consultarJogadoresPeloEmail(email: string): Promise<Jogador>{
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
        }
        return jogadorEncontrado
    }


    async deletarJogador(email: string): Promise<void>{
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email)
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

    private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): void{
        const {nome} = criarJogadorDto
        jogadorEncontrado.nome = nome;
        
    }

   

}
