import { BadRequestException, Injectable,NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
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
    
    async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {

        const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com ${_id} Não encontrado`)
        }
        
        await this.jogadorModel.findOneAndUpdate({_id},//Recebe o parametro
            {$set: atualizarJogadorDto}).exec()//seta"atualiza" o novo dados passado por parametro

    }

    //metodo
    async consultarTodosJogadores(): Promise<Jogador[]>{
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadorPeloId(_id: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
        }
        return jogadorEncontrado
    }

    
    async deletarJogador(_id: string): Promise<any>{
        const jogadorEncontrado = this.jogadorModel.findOne({ _id }).exec();
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
        }
       return await this.jogadorModel.deleteOne({ _id }).exec();
    }
}
