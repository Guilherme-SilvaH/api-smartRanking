# Comandos para BAIXAR a dependencia o nestJS
-npm i -g @nestjs/cli


# Comandos para iniciar um projeto NestJS
-Nest new "NOME DO SEU ARQUIVO"

# Comandos para criar modules no nestJS
nest g module "Nome do Modulo"

# iniciar o servidor
npm run start:dev

# O que sao controllers

controllers são um dos principais componentes que gerenciam a interação entre as requisições HTTP externas e as respostas que a aplicação fornece. Eles são responsáveis por receber as solicitações, processar os dados necessários (com a ajuda de serviços, se necessário) e retornar uma resposta ao cliente.

Os controllers em NestJS são definidos por classes decoradas com o decorador @Controller, que pode opcionalmente especificar um caminho de rota base para todas as rotas associadas. Dentro de um controller, os métodos são ligados a rotas específicas usando decoradores como @Get, @Post, @Put, @Delete, entre outros, que correspondem aos métodos HTTP.

Um exemplo básico de um controller pode ser assim:


import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  findAll() {
    return "Esta é a lista de produtos.";
  }
}
Neste exemplo, o controller ProductsController responde a solicitações GET para o caminho /products com uma string simples.

Em resumo, os controllers são fundamentais em NestJS para mapear as rotas de entrada para as ações correspondentes na aplicação, organizando a lógica de entrada de forma clara e mantendo as responsabilidades bem separadas dentro do código.


# Comando para criar um controller
- nest g controller "Nome do controller"