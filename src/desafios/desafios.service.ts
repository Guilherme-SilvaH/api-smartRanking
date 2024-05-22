import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Desafio } from "./interfaces/desafios.interface";
import { criarDesafioDto } from "./dtos/criarDesafioDto";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";
import { JogadoresService } from "src/jogadores/jogadores.service";


@Injectable()
export class desafiosService{
    constructor(
        @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
        @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
        private readonly jogadoresService: JogadoresService){}
    
    //metodo
    async criarDesafio(criarDesafioDto: criarDesafioDto, params: string[]): Promise<Desafio>{
        const idJogador = params['idJogador']

        await this.jogadoresService.consultarJogadorPeloId(idJogador)

        const desafioCriado = new this.desafioModel(criarDesafioDto)
        return await desafioCriado.save()
    }


}