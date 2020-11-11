### Anotações

<p align="center">
  <img height="100" src="https://user-images.githubusercontent.com/41811634/98652631-b358df80-231a-11eb-87a9-3acd3610a6a7.png">
</p>

- O que é o [GraphQL](https://graphql.org/)?
  - **É uma linguagem de consulta e mutação de dados de API**. Não necessariamente tem relação com SQL, com banco de dados. É possível usar o GraphQL sem nem existir um banco de dados.
    - Liberdade para montar as consultas pedindo exatamente o que você quer que o servidor te retorne
    - Exemplo do youtube: quando entramos em um canal é possível ver várias playlists, cada vídeo mostra informações de likes, visualizações, etc... se fosse feito com REST, teria que ser feito uma chamada para cada coisa. Uma chamada para pegar as playlists, os vídeos, uma chamada para pegar os likes... Com Graphql montamos uma única consulta com tudo que precisamos.
    - A aplicação frontend irá dizer o que quer e em resposta a API graphQL devolve os dados que foram solicitados
    - É mais complexo o uso do GraphQL
    - Problemas de cache pode acontecer
    - Problemas de performance pode acontecer, porque dependendo da consulta, da profundidade que ela tenha,
    pode afetar uma quantidade grande de resolvers, podendo chegar até mesmo a derrubar o banco de dados.
- O que ele resolve?
  - Diferença do GraphQL e REST (Representational State Transfer):
    - REST contras:
      - **Under fetch:** você precisa de algum tipo de informação e a API te devolve MENOS do que você precisa. Isso faz com que você tenha que fazer várias requisições e montar no client-side o objeto da forma que você precisa.
      - **Over-fetch:** você precisa de algum tipo de informação e a API te devolve MAIS do que você precisa, vindo dados desnecessários para o frontend. Obs: é possível trabalhar com o patter de Partial Response para devolver apenas os dados pedidos.
        - Interfaces com **usabilidade** questionável: ou seja, ela será toda baseada conforme no que a API devolve, o que pode acarretar em muita navegação e pouco dado que de fato importa.
        - API que devolve somente o que uma tela específica precisa, o que prejudica a granularidade, navegabilidade e reuso dessa API.
        - Muitos endpoints para atender fins específicos, sendo que tem a tendência a ficar grande a URL. Enquanto no GraphQL uma única URL apenas.