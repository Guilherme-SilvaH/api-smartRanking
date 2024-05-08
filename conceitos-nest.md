<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        h1, h2, h3 {
            color: #333;
        }
        code {
            background-color: #f4f4f4;
            padding: 5px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <h1>Comandos para BAIXAR a dependência do NestJS</h1>
    <ul>
        <li>npm i -g @nestjs/cli</li>
    </ul>

    <h1>Comandos para iniciar um projeto NestJS</h1>
    <ul>
        <li>Nest new "NOME DO SEU ARQUIVO"</li>
    </ul>

    <h1>Comandos para criar módulos no NestJS</h1>
    <ul>
        <li>nest g module "Nome do Módulo"</li>
    </ul>

    <h1>Comando para iniciar o servidor</h1>
    <ul>
        <li>npm run start:dev</li>
    </ul>

    <h1>O que são controllers</h1>
    <p>Controllers são um dos principais componentes que gerenciam a interação entre as requisições HTTP externas e as respostas que a aplicação fornece. Eles são responsáveis por receber as solicitações, processar os dados necessários (com a ajuda de serviços, se necessário) e retornar uma resposta ao cliente.</p>
    
    <h2>Exemplo de Controller Básico</h2>
    <pre><code class="language-typescript">
import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  findAll() {
    return "Esta é a lista de produtos.";
  }
}
    </code></pre>

    <h1>Comandos para criar um controller</h1>
    <ul>
        <li>nest g controller "Nome do controller"</li>
    </ul>

    <h1>O que são providers em NestJS</h1>
    <p>Providers são uma parte fundamental do sistema de injeção de dependências do framework. Eles podem ser qualquer coisa que possa ser injetada em um construtor, tipicamente serviços, repositórios, fábricas, ajudantes, e assim por diante.</p>

    <h2>Características dos Providers</h2>
    <ul>
        <li>Reusabilidade</li>
        <li>Encapsulamento</li>
        <li>Injeção de Dependência</li>
    </ul>

    <h2>Exemplo de um Provider em NestJS</h2>
    <pre><code class="language-typescript">
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
    </code></pre>

    <h1>Como registrar e usar Providers</h1>
    <p>Os Providers podem ser registrados em módulos específicos e posteriormente injetados em controllers, outros providers ou qualquer classe onde sejam necessários.</p>

    <h2>Exemplo de registro de um Provider em um módulo</h2>
    <pre><code class="language-typescript">
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService] // Opcional: se o provider deve ser acessível em outros módulos
})
export class UserModule {}
    </code></pre>

    <h2>Utilização de Providers em um Controller</h2>
    <pre><code class="language-typescript">
import { Controller, Get } from '@nestjs/common';
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
    </code></pre>

    <h1>O que são services em NestJS</h1>
    <p>Services são um tipo especial de provider responsáveis por encapsular a lógica de negócios da aplicação, agindo como intermediários entre os controllers e as fontes de dados ou outras operações de backend.</p>

    <h2>Características Principais dos Services</h2>
    <ul>
        <li>Separação de Responsabilidades</li>
        <li>Reusabilidade</li>
        <li>Testabilidade</li>
    </ul>

    <h2>Exemplo Básico de um Service</h2>
    <pre><code class="language-typescript">
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
    </code></pre>

    <h2>Registro e Injeção de Services</h2>
    <p>Services são geralmente registrados em módulos específicos e podem ser injetados em controllers ou outros services através do mecanismo de injeção de dependência do framework.</p>

    <h2>Exemplo de registro de um Service em um módulo</h2>
    <pre><code class="language-typescript">
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
    </code></pre>

    <h2>Utilização de Services em um Controller</h2>
    <pre><code class="language-typescript">
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
    </code></pre>

    <h1>Comandos para criar um Service</h1>
    <ul>
        <li>nest g service "Nome do Service"</li>
    </ul>

    <h1>O que são Pipes</h1>
    <p>Pipes em NestJS são utilizados para a validação, transformação ou manipulação dos dados de entrada antes que eles alcancem os manipuladores de rota (controllers) ou serviços. Eles são uma parte essencial do pipeline de manipulação de requisições HTTP.</p>

    <h2>Tipos de Pipes</h2>
    <ul>
        <li>Pipes de validação</li>
        <li>Pipes de transformação</li>
        <li>Pipes de execução</li>
    </ul>

    <h2>Como usar Pipes em NestJS</h2>
    <p>Os pipes podem ser aplicados em nível de controlador (controller-wide), em nível de rota (route-specific) ou em nível de parâmetro de rota (parameter-level).</p>

    <h2>Exemplo de uso de Pipes</h2>
    <pre><code class="language-typescript">
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
    </code></pre>

    <h1>
        Comando para instalar Alguns Pipes
      <ul>
        <li>
             npm install class-validator class-transformer
        </li>
      </ul>
    </h1>
</body>
</html>