import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Desafio } from "./interfaces/desafios.interface";
import { criarDesafioDto } from "./dtos/criarDesafioDto";
import { JogadoresService } from "src/jogadores/jogadores.service";
import { CategoriasService } from "src/categorias/categorias.service";


@Injectable()
export class desafiosService{
    constructor(
        @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
        private readonly jogadoresService: JogadoresService, 
        private readonly categoriasService: CategoriasService){}
        
    
    
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
    

    // Verificar se o solicitante está registrado em alguma categoria
    const categorias = await this.categoriasService.consultarTodasCategorias();
    const solicitanteEstaEmCategoria = categorias.some(categoria => 
        categoria.jogadores.some(jogador => jogador._id == solicitanteID)
    );

    if (!solicitanteEstaEmCategoria) {
        throw new BadRequestException(`O Solicitante ${solicitanteID} não está registrado em nenhuma categoria`);
    }
      
    
    
    
        const desafioCriado = new this.desafioModel(criarDesafioDto);
        return await desafioCriado.save();

    }
}