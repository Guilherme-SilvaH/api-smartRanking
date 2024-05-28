import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { desafiosService } from "./desafios.service";
import { Desafio } from "./interfaces/desafios.interface";
import { criarDesafioDto } from "./dtos/criarDesafioDto";
import { DesafioStatusValidacaoPipe } from "./pipes/desafio-status-validation.pipe";
import { AtualizarDesafioDto } from "./dtos/atualizar-desafio.dto";


@Controller('api/v1/desafios')
export class desafiosController{


    constructor(private readonly desafiosService: desafiosService){}


    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafios( 
        @Body() criarDesafio: criarDesafioDto): Promise<Desafio>
        {
            return await this.desafiosService.criarDesafio(criarDesafio)
        }


    @Get()
    async consultarDesafios(
        @Query('idJogador')_id: string): Promise<Array<Desafio>>{
            return _id ? await this.desafiosService.consultarDesafiosDeUmJogador(_id)
            : await this.desafiosService.consultarTodosDesafios()
    }


    @Put('/:desafio')
    async atualizarDesafio(
        @Body(DesafioStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto,
        @Param('desafio') _id: string): Promise<void>{
            await this.desafiosService.atualizarDesafio(_id, atualizarDesafioDto)
        }
    



}