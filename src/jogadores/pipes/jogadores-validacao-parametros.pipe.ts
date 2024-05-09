import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { retry } from "rxjs";


export class jogadoresValidacaoParametrosPipe implements PipeTransform{


    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException(`O valor do paramentro ${metadata.data} deve ser informado`)
        }

        return value
    }
}