const { ApolloServer, gql } = require('apollo-server')


const perfis = [
    {
        id: 1,
        nome: 'Comum'
    },
    {
        id: 2,
        nome: 'Administrador'
    }
]

const usuarios = [
    {
        id: 1,
        nome: 'João Silva',
        email: 'jsilva@gmai..com',
        idade: 29,
        perfil_id: 1
    },
    {
        id: 2,
        nome: 'Rafael Júnior',
        email: 'rafajun@gmail.com',
        idade: 31,
        perfil_id: 2
    },
    {
        id: 3,
        nome: 'Daniela Junqueira',
        email: 'danijun@gmail.com',
        idade: 24,
        perfil_id: 1
    }
]


const typeDefs = gql`
    scalar Date

    type Perfil {
        id: Int
        nome: String
    }

    type Usuario {
        id: Int
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
        perfil: Perfil
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
        perfis: [Perfil]
        perfil(id: Int): Perfil
    }
`

const resolvers = {
    Usuario: {
        // esse atributo é o retorno do resolver 'usuarioLogado'
        salario(usuario) {
            return usuario.salario_real
        },
        perfil(usuario) {
            const selecionados = perfis.filter(p => p.id === usuario.perfil_id)
            return selecionados ?  selecionados[0] : null
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
        usuario (_, { id }) {
            const selecionados = usuarios.filter(u => u.id === id)
            return selecionados ? selecionados[0] : null
        },
        perfis () {
            return perfis
        },
        perfil (_, args) {
            const selecionados = perfis.filter(p => p.id === args.id)
            return selecionados ?  selecionados[0] : null
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