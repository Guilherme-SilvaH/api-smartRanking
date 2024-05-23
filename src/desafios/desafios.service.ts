import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Desafio } from "./interfaces/desafios.interface";
import { criarDesafioDto } from "./dtos/criarDesafioDto";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";
import { JogadoresService } from "src/jogadores/jogadores.service";


@Injectable()
export class desafiosService{
    constructor(
        @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
        private readonly jogadoresService: JogadoresService){}
    
    //metodo
  async criarDesafio(criarDesafioDto: criarDesafioDto): Promise<Desafio> {

    const jogadores = await this.jogadoresService.consultarTodosJogadores()

    criarDesafioDto.jogadores.forEach(jogadorDto => {
        const jogadorFilter = jogadores.filter( jogador => jogador._id == jogadorDto._id )

        if (jogadorFilter.length == 0) {
            throw new BadRequestException(`O id ${jogadorDto._id} não é um jogador!`)
        }
    
    })

    

    const { solicitante  } = criarDesafioDto
    const solicitanteID = solicitante._id

   
    const solicitanteEhJogador = criarDesafioDto.jogadores.some(jogadorDto => jogadorDto._id == solicitanteID);
    if (!solicitanteEhJogador) {
        throw new BadRequestException(`O Solicitante ${solicitanteID} nao faz Parte do desafio`);
    }

    
        const desafioCriado = new this.desafioModel(criarDesafioDto);
        return await desafioCriado.save();

    }
}