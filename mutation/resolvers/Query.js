const { usuarios, perfis } = require('../data/db')


module.exports = {
    usuarios () {
        return usuarios
    },
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