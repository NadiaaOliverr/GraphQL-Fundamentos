const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    scalar Date

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Int
        precoComDesconto: Float
    }

    # Pontos de entradas da API
    type Query {
        ola: String!
        horaAtual: Date!
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
    }
`

const resolvers = {
    Usuario: {
        // esse atributo é o retorno do resolver 'usuarioLogado'
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Produto: {
        precoComDesconto(produto) {
            if(produto.desconto){
                let porcentagemRestante = (100 - produto.desconto)/100
                return produto.preco * porcentagemRestante
            }
            return produto.preco
        }
    },
    Query: {
        ola() {
            return "Olá mundo com GraphQL!"
        },
        horaAtual() {
            return new Date
        },
        usuarioLogado() {
            return {
                id: 1,
                nome: 'Nádia Oliveira',
                email: 'nadiaaoliverr@gmail.com',
                idade: 21,
                salario_real: 1234.56,
                vip: true
            }
        },
        produtoEmDestaque() {
            return {
                nome: 'Mouse',
                preco: 4890.89,
                desconto: 50
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
});