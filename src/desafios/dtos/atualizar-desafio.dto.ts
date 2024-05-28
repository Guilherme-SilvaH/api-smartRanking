import { IsOptional } from "class-validator";
import { DesafioStatus } from "../interfaces/desafios-status.enum";


export class AtualizarDesafioDto{
    @IsOptional()
        //@IsDate()
    dataHoraDesafio: Date;

    @IsOptional()
    status: DesafioStatus
}