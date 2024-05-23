import { Document  } from "mongodb";
import { Jogador  } from "src/jogadores/interfaces/jogador.interface";
import { DesafioStatus } from './desafios-status.enum'


export interface Desafio extends Document{
    dataHoraDesafio: Date,
    status: DesafioStatus,
    dataHoraSolicitacao: Date,
    dataHoraRespota: Date,
    solicitante: Jogador,
    categoria: string,
    jogadores: Array<Jogador>,
    partida: Partida,

}

export interface Partida extends Document{

    categoria: string,
    jogadores: Array<Jogador>,
    def: Jogador,
    resultado: Array<Resultado>

}

export interface Resultado{
    set: string
}