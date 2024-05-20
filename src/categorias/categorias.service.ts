import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './interface/categorias.interface';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';


@Injectable()
export class CategoriasService {

    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>){}

        
    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria>{

        const { categoria } =  criarCategoriaDto;

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()

        if (categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} já cadastrada`)
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto)
        return categoriaCriada.save()
    }

   

    async consultarTodasCategorias(): Promise<Array<Categoria>>{
        return await this.categoriaModel.find().exec()
    }


    async consultarCategoriaPeloId(categoria: String): Promise<Categoria>{
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()
        if(!categoriaEncontrada){
            throw new NotFoundException(`Categoria ${categoria} nao encontrada!`)
        }

        return categoriaEncontrada
    } 

    async atualizarCategoria(categoria: string, atualizarCategoriaDto): Promise<void>{
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()

        if(!categoriaEncontrada){
            throw new NotFoundException(`Categoria ${categoria} não encontrada`)
        }

        await this.categoriaModel.findOneAndUpdate({categoria},{$set: atualizarCategoriaDto}).exec()
    }

    async atribuirCategoriaJogador(params: string[]): Promise<void>{

        const  categoria = params['categoria']
        const  idJogador = params['idJogador']
        const categoriaEncotrada = await this.categoriaModel.findOne({categoria}).exec()
        //const jogadorJaCadastrado

        if (!categoriaEncotrada) {
            throw new BadRequestException(`Categoria ${categoria} não cadastrada!`)
        }

        categoriaEncotrada.jogadores.push(idJogador);
        await this.categoriaModel.findOneAndUpdate({categoria},{$set: categoriaEncotrada}).exec()

    }
}
