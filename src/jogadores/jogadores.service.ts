import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { promises } from 'dns';



@Injectable()
export class JogadoresService {
    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    //metodo
    async criarAtualizarJogador(CriaJogadorDto: CriarJogadorDto): Promise<void>{
        const { email } = CriaJogadorDto
        //const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        const jogadorEncontrado = this.jogadorModel.findOne({ email }).exec();
        if(jogadorEncontrado){
            this.atualizar(CriaJogadorDto)
        }else{
            this.criar(CriaJogadorDto)
        }
    }

    //metodo
    async consultarTodosJogadores(): Promise<Jogador[]>{
        //return this.jogadores
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadoresPeloEmail(email: string): Promise<Jogador>{
        const jogadorEncontrado = this.jogadorModel.findOne({ email }).exec();
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
        }
        return jogadorEncontrado
    }


    async deletarJogador(email): Promise<any>{
        /*
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email)
        */
       return await this.jogadorModel.deleteOne({email}).exec();
    }

    //aqui vamos criar o jogador completo, preenchendo os dados que o backend preenche sozinho, e os dados que o usuario preenche(nome,phoneNumber,email)
    private  async criar(criaJogadorDto: CriarJogadorDto) : Promise<Jogador>{   //recebemos como paramentro criaJogadorDto que é do tipo CriarJogadorDto
        
        const jogadorCriado = new this.jogadorModel(criaJogadorDto)
        return await jogadorCriado.save();
        
        
        //Codigo antes de conectar com o banco
        /*
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
        */
    }
    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const { email } = criarJogadorDto;
        return await this.jogadorModel.findOneAndUpdate({ email }, criarJogadorDto, { new: true }).exec();
    }
}
