import { BadRequestException, Injectable,Logger,NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';




@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}
 


    //metodo
    async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {

        const { email } = criaJogadorDto;

        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

        if (jogadorEncontrado) {
            throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado`)
        }
        
        const jogadorCriado = new this.jogadorModel(criaJogadorDto);
        return await jogadorCriado.save();
        
    }
    
    async atualizarJogador(_id: string, criarJogadorDto: CriarJogadorDto): Promise<void> {

        const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com ${_id} Não encontrado`)
        }
        
        await this.jogadorModel.findOneAndUpdate({_id},//Recebe o parametro
            {$set: criarJogadorDto}).exec()//seta"atualiza" o novo dados passado por parametro

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

    
    async deletarJogador(email: string): Promise<any>{
        /*
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email)
        */
       return await this.jogadorModel.deleteOne({email}).exec();
    }
}
