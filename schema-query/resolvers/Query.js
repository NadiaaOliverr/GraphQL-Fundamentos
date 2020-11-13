const { usuarios, perfis } = require('../data/db')


module.exports = {
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