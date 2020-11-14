### Introdução

<p align="center">
  <img height="100" src="https://user-images.githubusercontent.com/41811634/98652631-b358df80-231a-11eb-87a9-3acd3610a6a7.png">
</p>

- O que é o [GraphQL](https://graphql.org/)?
  - **É uma linguagem de consulta e mutação de dados de API**. Não necessariamente tem relação com SQL, com banco de dados. É possível usar o GraphQL sem nem existir um banco de dados.
    - Liberdade para montar as consultas pedindo exatamente o que você quer que o servidor te retorne.
    - Exemplo do youtube: quando entramos em um canal é possível ver várias playlists, cada vídeo mostra informações de likes, visualizações, etc... se fosse feito com REST, teria que ser feito uma chamada para cada coisa. Uma chamada para pegar as playlists, os vídeos, uma chamada para pegar os likes... Com Graphql montamos uma única consulta com tudo que precisamos.
    - A aplicação frontend irá dizer o que quer e em resposta a API graphQL devolve os dados que foram solicitados
  - GraphQL contras:
    - É mais complexo seu uso.
    - Problemas de cache pode acontecer.
    - Problemas de performance pode acontecer, porque dependendo da consulta, da profundidade que ela tenha,
    pode afetar uma quantidade grande de ```resolvers```, podendo chegar até mesmo a derrubar o banco de dados.
- O que **o GraphQL** resolve?
    - Ele resolve alguns problemas de uma API REST, como:
      - **Under fetch:** você precisa de algum tipo de informação e a API te devolve MENOS do que você precisa. Isso faz com que você tenha que fazer várias requisições e montar no client-side o objeto da forma que você precisa.
      - **Over-fetch:** você precisa de algum tipo de informação e a API te devolve MAIS do que você precisa, vindo dados desnecessários para o frontend. Obs: é possível trabalhar com o patter de Partial Response/Update para devolver apenas os dados pedidos.
      - Interfaces com **usabilidade** questionável: ou seja, ela será toda baseada conforme no que a API devolve, o que pode acarretar em muita navegação e pouco dado que de fato importa.
      - API que devolve somente o que uma tela específica precisa, o que prejudica a granularidade, navegabilidade e reuso dessa API.
      - Muitos endpoints para atender fins específicos, sendo que tem a tendência a ficar grande a URL. Enquanto no GraphQL usamos uma única URL apenas.

#### Anotações de codificação

- Para testar as API em desenvolvimento podemos utilizar o [Apollo Server](https://www.apollographql.com/docs/apollo-server/), que nada mais é que do que um servidor GraphQL.
- A exclamação nos ```types``` é para dizer que sempre irá retornar exatamente o tipo especificado, não aceitando valores nulos.
- Por padrão, temos os seguites tipos de ```scalar```: String, Int, Float, ID, Boolean
- Em ```Query``` colocamos os pontos de entrada da API. É como se fosse os recursos(exemplo: ```/produtos```) das API's REST's.
- **Exemplo de consulta GraphQL (com e sem parâmetro)**:

  ```graphql 

    usuario(id: 2) {
      nome
      id
    }

    produtoEmDestaque {
          nome preco desconto precoComDesconto
    }
    
  ```
  
 - **Exemplo de mutation GraphQL (create)**:

  ```graphql 

   novoUsuario(
      nome: "Ana"
      email: "ana@ana.com"
      idade: 34
    ) {
      id nome email 
      perfil 
      { 
        nome 
      }
    }
    
  ```
  
   - **Exemplo de mutation GraphQL (delete)**:

  ```graphql 

    excluirUsuario(id: 2) {
      nome id
    }
    
  ```

- **```Fragments```** são utilizados para reutilização de dados, para evitar a repetição de campos. 
Exemplo de um ```fragment```: 
```graphql
  query {
    usuario(id: 3) {
      ...usuarioCompleto
    }
    
    usuarios {
      ...usuarioCompleto
    }
  }

  # Fragment
  fragment usuarioCompleto on Usuario {
    
    id nome email idade salario vip
    
    perfil {
      nome
      id
    }
  }
```
