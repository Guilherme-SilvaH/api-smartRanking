import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Desafio } from "./interfaces/desafios.interface";
import { criarDesafioDto } from "./dtos/criarDesafioDto";


@Injectable()
export class desafiosService{

    constructor(@InjectModel('Desafio') private readonly desafioModel: Model<Desafio>){}
    //metodo
    async criarDesafio(criarDesafio: criarDesafioDto): Promise<Desafio>{

        const desafioCriado = new this.desafioModel(criarDesafio)
        return await desafioCriado
    }


}