Microservices, ou microsserviços, são uma abordagem arquitetural para o desenvolvimento de software que se baseia na construção de uma aplicação como um conjunto de pequenos serviços independentes, cada um executando um processo de negócio específico e comunicando-se uns com os outros por meio de APIs bem definidas.

Em contraste com as arquiteturas monolíticas, onde toda a aplicação é construída como um único código-fonte e implantada como uma única unidade, os microsserviços dividem a aplicação em componentes menores e independentes, cada um responsável por uma única função ou conjunto de funções.

Esses serviços independentes podem ser desenvolvidos, implantados e escalados separadamente, o que oferece uma série de vantagens:

Escalabilidade: Cada serviço pode ser escalado independentemente, permitindo uma alocação eficiente de recursos com base nas necessidades específicas de cada componente da aplicação.

Manutenção e Evolução: Como os microsserviços são independentes uns dos outros, é mais fácil atualizar, corrigir bugs e fazer alterações em um serviço sem afetar outros serviços na aplicação.

Resiliência e Tolerância a Falhas: Se um serviço falhar, isso não afetará necessariamente outros serviços na aplicação. Além disso, é possível implementar estratégias de fallback e tratamento de erros específicos para cada serviço.

Desenvolvimento Ágil: Equipes pequenas e ágeis podem ser responsáveis por serviços individuais, permitindo um desenvolvimento mais rápido e focado em funcionalidades específicas.

No entanto, os microsserviços também introduzem desafios, como complexidade na gestão da comunicação entre os serviços, gerenciamento de dados distribuídos e monitoramento da saúde e desempenho de múltiplos serviços.

Em resumo, os microsserviços são uma abordagem arquitetural que prioriza a modularidade, flexibilidade e escalabilidade, permitindo o desenvolvimento e implantação de aplicações de software complexas e distribuídas de maneira mais eficiente e resiliente.


## Como fazer essa implemtação usando nestJS

    ----- NestJS MicroServices
    ----- Message Broker



        ------ Passaremos a usar uma arquitetura Orientada a Eventos

            -HTTP REQUEST 

                    HTTP CLIENT (PROXY)

                            --------->
                            <---------
                                                    -------->       MICROSERVICE
                                                    <--------


                                                    -------->       MICROSERVICE
                                 Message Broker     <--------

                                                    
                                                    -------->       MICROSERVICE
                                                    <--------


## Entendimentos Inicias de MicroServices

    --- Facilitarr a implementação de novas features, uma vez que teremos dominios de negocio exclusivos em cada microservice

    --- Autotonomia para nosso componentes de modo que possamos desenvolver e publicar serviços de forma independente 

    --- Aumentar a capacidade de escalabilidade horizontal e balanceamento de carga
    
    --- Maior Resiliencia Tolerancia a falhas 


## NestJS e o package microservies

    --- Temos dois tipos de Nest Transportes
        --- Broker-based: Redis, NATS, RabbitMQ, MQTT E Kafka
        --- Point to Point: TCP e gRPC



        ## Broker-Base

            --- Nos permite desacoplar varios componentes da aplicaçao. Cada componenete somente precisa se conectar 
            ao broker, e pode permanecer sem necessidade de conhecer a existencia, localização ou detalhes da iplmentação de outros componentes

                -- A unica coisa que precisa ser compartilhada entre os componentes é o protocolo de mensagens



                    --- Um Broker se divide em: 

                            --- Broker Server: Processo do lado servidor, responsavel por gerenciar a publicação, assinatura e entrega das mensagens aos clientes

                            --- Broker client Api: é disponibilizada em um package especifico para cada linguagem (Javascript, ja,Go, ETC), Fornecendo uma API para acessasr o broker, a partir de aplicações clientes.




        ## Estilo do modelo de comunicação: "Event" sao os tipos de mensagens que podemos trocar com base nesse modelo 
            (Publish/Subscribe)             ----- Event Emitter = Componente que publica uma mensagem com um tópico (e um payload Opcional)
                                                    trata-se de uma message publisher

                                            ---- Event subscriber 
                                                        --- Componente que registra o interesse em um topoico e recebe as mensagens(Encaminha pelo broker)
                                                        quando esta mensagem corresponde a um topico publicado por um emitter 


        ## Estilo do modelo de comunicação: Chamaremos de request/Response os tipos de mensagens que podemos trocar com base nesse modelo
                (REQUEST/RESPONSE)      
                                            ----- Requestor = Componente que publica uma mensagem que pretende ser tratada como uma request e tambem executa as etapas descritas anteriormente, ou seja, se inscreve em um response topic e inclui este response topic na mensagem publica.



                                            ---- Responder = Componente que se inscreve em um topic, que pretende tratar como uma incoming request, produz um resultado e publica um response, incluindo o payload recuperado, para o response topic que recebeu na inbound request.
