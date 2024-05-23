import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Desafio } from "./interfaces/desafios.interface";
import { criarDesafioDto } from "./dtos/criarDesafioDto";
import { JogadoresService } from "src/jogadores/jogadores.service";
import { CategoriasService } from "src/categorias/categorias.service";
import { DesafioStatus } from "./interfaces/desafios-status.enum";


@Injectable()
export class desafiosService{

    private readonly logger = new Logger(desafiosService.name)

    constructor(
        @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
        private readonly jogadoresService: JogadoresService, 
        private readonly categoriasService: CategoriasService){}
        
    
    
    //metodo
  async criarDesafio(criarDesafioDto: criarDesafioDto): Promise<Desafio> {

    const jogadores = await this.jogadoresService.consultarTodosJogadores()

    criarDesafioDto.jogadores.forEach(jogadorDto => {
        const jogadorFilter = jogadores.filter(jogador => jogador._id == jogadorDto._id);
        if (jogadorFilter.length == 0) {
            this.logger.warn(`O id ${jogadorDto._id} não é um jogador válido`);
            throw new BadRequestException(`O id ${jogadorDto._id} não é um jogador!`);
        }
    });

    

    const { solicitante  } = criarDesafioDto
    const solicitanteID = solicitante._id

   
    const solicitanteEhJogador = criarDesafioDto.jogadores.some(jogadorDto => jogadorDto._id == solicitanteID);
    if (!solicitanteEhJogador) {
        this.logger.error(`O solicitante ${solicitanteID} não faz parte do desafio`);
        throw new BadRequestException(`O Solicitante ${solicitanteID} nao faz Parte do desafio`);
    }
    

    // Verificar se o solicitante está registrado em alguma categoria
    const categorias = await this.categoriasService.consultarTodasCategorias();
        let categoriaDoSolicitante = null;
        categorias.forEach(categoria => {
            if (categoria.jogadores.some(jogador => jogador._id == solicitanteID)) {
                categoriaDoSolicitante = categoria.categoria;
            }
        });
      

    if (!categoriaDoSolicitante) {
        this.logger.error(`O solicitante ${solicitanteID} não está registrado em nenhuma categoria`);
        throw new BadRequestException(`O Solicitante ${solicitanteID} não está registrado em nenhuma categoria`);
    }
    
    
    // Adicionar a data/hora da solicitação do desafio e definir o status como PENDENTE
    const statusDesafio = DesafioStatus.PENDENTE;

    const desafioCriado = new this.desafioModel({
        ...criarDesafioDto,
        status: statusDesafio,
        categoria: categoriaDoSolicitante,
    });
    await desafioCriado.save();

    this.logger.log(`Desafio criado com sucesso: ${JSON.stringify(desafioCriado)}`);
    return desafioCriado;
    }
}