import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { desafiosService } from "./desafios.service";
import { Desafio } from "./interfaces/desafios.interface";
import { criarDesafioDto } from "./dtos/criarDesafioDto";


@Controller('api/v1/desafios')
export class desafiosController{


    constructor(private readonly desafiosService: desafiosService){}


    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafios( 
        @Body() criarDesafio: criarDesafioDto,
        @Param() params: string[]): Promise<Desafio>
        {
            return await this.desafiosService.criarDesafio(criarDesafio,params)
        }



}