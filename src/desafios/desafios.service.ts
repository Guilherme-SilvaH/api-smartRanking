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
        @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
        @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
        private readonly jogadoresService: JogadoresService){}
    
    //metodo
    async criarDesafio(criarDesafioDto: criarDesafioDto): Promise<Desafio> {
        const { jogadores, solicitante } = criarDesafioDto;

        // Verificar se os jogadores informados estão cadastrados no banco de dados
        const jogadoresIds = jogadores.map(jogador => jogador._id);
        const jogadoresEncontrados = await Promise.all(
            jogadoresIds.map(async id => {
                try {
                    return await this.jogadoresService.consultarJogadorPeloId(id);
                } catch (error) {
                    return null; // Se não encontrar, retorna null
                }
            })
        );

        if (jogadoresEncontrados.includes(null)) {
            throw new NotFoundException(`Um ou mais jogadores não foram encontrados`);
        }

        // Verificar se o solicitante é um dos jogadores do desafio
        const solicitanteId = solicitante._id;
        const isSolicitanteValid = jogadoresIds.includes(solicitanteId);

        if (!isSolicitanteValid) {
            throw new BadRequestException(`O solicitante deve ser um dos jogadores do desafio`);
        }

        const desafioCriado = new this.desafioModel(criarDesafioDto);
        return await desafioCriado.save();
    }
}