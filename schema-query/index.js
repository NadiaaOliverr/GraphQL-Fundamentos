const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    scalar Date

    # Pontos de entradas da API
    type Query {
        ola: String
        horaAtual: Date
    }
`

const resolvers = {

    Query: {
        ola() {
            return "Olá mundo com GraphQL!"
        },
        horaAtual() {
            return new Date
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