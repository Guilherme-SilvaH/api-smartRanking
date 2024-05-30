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
                        