const { ApolloServer, gql } = require('apollo-server')

const usuarios = [
    {
        id: 1,
        nome: 'João Silva',
        email: 'jsilva@gmai..com',
        idade: 29
    },
    {
        id: 2,
        nome: 'Rafael Júnior',
        email: 'rafajun@gmail.com',
        idade: 31
    },
    {
        id: 3,
        nome: 'Daniela Junqueira',
        email: 'danijun@gmail.com',
        idade: 24
    }
]

const typeDefs = gql`
    scalar Date

    type Usuario {
        id: Int
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
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]
        usuario(id: Int): Usuario
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
        },
        numerosMegaSena() {
            const crescente = (a, b) => a - b
            return Array(6).fill(0).map(() => parseInt(Math.random() * 60 + 1)).sort(crescente)
        },
        usuarios () {
            return usuarios
        },
        // esse primeiro parâmetro de um resolver sempre é um objeto, e no caso da query ele vem 'undefined', por isso do underline
        // para significar um dont'care
        usuario (_, args) {
            const selecionados = usuarios.filter(u => u.id === args.id)
            return selecionados ? selecionados[0] : null
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