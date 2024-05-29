import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Desafio, Partida } from "./interfaces/desafios.interface";
import { criarDesafioDto } from "./dtos/criarDesafioDto";
import { JogadoresService } from "src/jogadores/jogadores.service";
import { CategoriasService } from "src/categorias/categorias.service";
import { DesafioStatus } from "./interfaces/desafios-status.enum";
import { AtualizarDesafioDto } from "./dtos/atualizar-desafio.dto";
import { AtribuirDesafioPartidaDto } from "./dtos/atribuir-desafio-partida.dto";



@Injectable()
export class desafiosService{

    private readonly logger = new Logger(desafiosService.name)

    constructor(
        @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
        @InjectModel('Partida') private readonly partidaModel: Model<Partida>,
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

    


    //variaveis para pegar o solitante e o ID do Mesmo
    const { solicitante  } = criarDesafioDto
    const solicitanteID = solicitante._id

   //function para ver se o solicitante é um Jogador
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
        dataHoraSolicitacao: new Date()
    });
   

    this.logger.log(`Desafio criado com sucesso: ${JSON.stringify(desafioCriado)}`);
    return await desafioCriado.save();
    }


    async consultarTodosDesafios(): Promise<Array<Desafio>>{
        return await this.desafioModel.find()
        .populate("solicitante")
        .populate("jogadores")
        .populate("partida")
        .exec()
    }


    async consultarDesafiosDeUmJogador(_id: any): Promise<Array<Desafio>>{

        const jogadores = await this.jogadoresService.consultarTodosJogadores()

        const jogadoresFilter = jogadores.filter( jogador => jogador._id == _id)

        if(jogadoresFilter.length == 0){
            throw new BadRequestException(`O id ${_id} não é um jogador!`)
        }


        /*
        Aqui vamos fazer passasr alguma query para o metodo do mongoose find
        */
        return await this.desafioModel.find()
        .where('jogadores')//busca no array de jogadores
        .in(_id)//o que ele vai buscar? o ID
        .populate("ssolicitante")// aqui ele vai popular o restante das infomaçoes
        .populate("jogadores")// aqui ele vai popular o restante das infomaçoes
        .populate("partida")// aqui ele vai popular o restante das infomaçoes
        .exec()

    }


    async atualizarDesafio(_id: string, atualizarDesafioDto: AtualizarDesafioDto): Promise<Desafio>{

        const desafioEncontrado = await this.desafioModel.findById(_id).exec()

        if(!desafioEncontrado){
            throw new NotFoundException(`Desafio ${_id} não encontrado!`)

        }
        /*
            Atualizaremos a data da resposata quando o satus do desafio vier preenchido
       */
        if(atualizarDesafioDto.status){
            desafioEncontrado.dataHoraRespota = new Date()
        }

        desafioEncontrado.status = atualizarDesafioDto.status
        desafioEncontrado.dataHoraDesafio = atualizarDesafioDto.dataHoraDesafio

       const desafioAtualizado = await this.desafioModel.findOneAndUpdate({_id}, {$set: desafioEncontrado}, { new: true } ).exec()

        this.logger.log(`Status Atualizado com sucesso: ${JSON.stringify(desafioEncontrado)}`);
        return desafioAtualizado;

    } 


    async atribuirDesafioPartida(_id: string, atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto ): Promise<void> {

        const desafioEncontrado = await this.desafioModel.findById(_id).exec()
        
        if (!desafioEncontrado) {
            throw new BadRequestException(`Desafio ${_id} não cadastrado!`)
        }

         /*
        Verificar se o jogador vencedor faz parte do desafio
        */
       const jogadorFilter = desafioEncontrado.jogadores.filter( jogador => jogador._id == atribuirDesafioPartidaDto.def )

        this.logger.log(`desafioEncontrado: ${desafioEncontrado}`);
        this.logger.log(`jogadorFilter: ${jogadorFilter}`);

       if (jogadorFilter.length == 0) {
           throw new BadRequestException(`O jogador vencedor não faz parte do desafio!`)
       }

        /*
        Primeiro vamos criar e persistir o objeto partida
        */
      
    const partidaCriada = new this.partidaModel(atribuirDesafioPartidaDto);
       /*
       Atribuir ao objeto partida a categoria recuperada no desafio
       */
       partidaCriada.categoria = desafioEncontrado.categoria;

       /*
       Atribuir ao objeto partida os jogadores que fizeram parte do desafio
       */
       partidaCriada.jogadores = desafioEncontrado.jogadores;

       const resultado = await partidaCriada.save();
       
        /*
        Quando uma partida for registrada por um usuário, mudaremos o 
        status do desafio para realizado
        */
        desafioEncontrado.status = DesafioStatus.REALIZADO;

        /*  
        Recuperamos o ID da partida e atribuimos ao desafio
        */
        
        desafioEncontrado.partida = resultado._id

        try {
        await this.desafioModel.findOneAndUpdate({_id},{$set: desafioEncontrado}).exec() 
        } catch (error) {
            /*
            Se a atualização do desafio falhar excluímos a partida 
            gravada anteriormente
            */
           await this.partidaModel.deleteOne({_id: resultado._id}).exec();
           throw new InternalServerErrorException()
        }
    }

    async deletarDesafio(_id: string): Promise<void> {

        const desafioEncontrado = await this.desafioModel.findById(_id).exec()

        if (!desafioEncontrado) {
            throw new BadRequestException(`Desafio ${_id} não cadastrado!`)
        }
        
        /*
        Realizaremos a deleção lógica do desafio, modificando seu status para
        CANCELADO
        */
       desafioEncontrado.status = DesafioStatus.CANCELADO

       await this.desafioModel.findOneAndUpdate({_id},{$set: desafioEncontrado}).exec() 

    }


}