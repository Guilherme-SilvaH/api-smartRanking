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


# o que sao providers em nestJS

providers são uma parte fundamental do sistema de injeção de dependências do framework. Eles podem ser qualquer coisa que possa ser injetada em um construtor, tipicamente serviços, repositórios, fábricas, ajudantes, e assim por diante. O conceito de provider é amplamente utilizado para permitir um design limpo e modular, onde as dependências entre diferentes partes da aplicação são gerenciadas de forma controlada e eficiente.

Características dos Providers:
Reusabilidade: Os providers são projetados para serem reutilizáveis em diferentes partes da aplicação.
Encapsulamento: Encapsulam a lógica de negócios e a interação com modelos ou outras fontes de dados.
Injeção de Dependência: NestJS usa a injeção de dependência para manter a aplicação fácil de manter e escalar. Providers podem depender de outros providers e são injetados onde são necessários, sem necessidade de instanciá-los manualmente.
Tipos Comuns de Providers:
Serviços: Classes com métodos que contêm lógica de negócios, frequentemente usados para abstrair o acesso a dados ou operações complexas.
Repositórios: Especializados em operações de dados, podem ser considerados um tipo de serviço que lida especificamente com a persistência.
Fábricas: Funções que criam e retornam uma instância de uma classe ou um valor.
Helpers: Funções ou classes auxiliares que fornecem funcionalidades específicas que não estão diretamente relacionadas às lógicas de negócios ou de dados, mas são usadas por elas.
Exemplo de um Provider em NestJS:
Aqui está um exemplo básico de um serviço que funciona como um provider em uma aplicação NestJS:


import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

  findAll() {
    return this.users;
  }

  findById(id: number) {
    return this.users.find(user => user.id === id);
  }
}
Registrando Providers:
Você pode registrar providers de várias maneiras em NestJS, geralmente dentro do módulo onde serão usados:

typescript
Copy code
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
Uso dos Providers:
Providers podem ser injetados em controllers, outros providers, ou em qualquer classe onde sejam necessários:

typescript
Copy code
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }
}
Em resumo, os providers são componentes cruciais em uma aplicação NestJS, pois permitem que as diferentes partes do sistema se comuniquem de forma desacoplada e eficiente.


# o que sao providers em nestJS

 os services são um tipo especial de provider responsáveis por encapsular a lógica de negócios da aplicação, agindo como intermediários entre os controllers (que recebem e respondem às requisições) e as fontes de dados ou outras operações de backend, como acesso a APIs externas, manipulação de dados complexa, entre outros. A utilização de services permite uma separação clara de responsabilidades dentro da aplicação, facilitando a manutenção e o teste do código.

# Características Principais:
  Separação de Responsabilidades: Isolam a lógica de negócios das demais camadas, como a camada de apresentação (controllers) e a camada de acesso a dados (repositories).
  Reusabilidade: Podem ser reutilizados em várias partes da aplicação.
  Testabilidade: Facilitam a realização de testes unitários, visto que a lógica de negócios está isolada em serviços que podem ser facilmente mockados ou substituídos em   testes.

# Exemplo Básico de um Service:
  Suponha um serviço que gerencia informações de usuários:


import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

  findAll() {
    return this.users;
  }

  findById(id: number) {
    return this.users.find(user => user.id === id);
  }
}

# Registro e Injeção:
  Services são geralmente registrados em um módulo específico de NestJS e podem ser injetados em controllers ou outros services através do mecanismo de injeção de dependência  do framework. Por exemplo:


import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}



# Utilização em um Controller:
  Um controller pode injetar esse service para gerenciar dados de usuários, como mostrado abaixo:

import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }
}

# Conclusão:
  Services em NestJS são essenciais para manter a lógica de negócios organizada, testável e modular. Eles são uma peça central na arquitetura do framework, permitindo que a  aplicação seja escalável e fácil de manter ao longo do tempo.

# Criar um Service
nest g service "nome do Service"


# Intalar o mongoose atraves do Nest
npm install @nestjs/mongoose mongoose 

# Intalar types do mongoose
npm install --save-dev @types/mongoose