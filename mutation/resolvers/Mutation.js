const { usuarios, proximoId } = require('../data/db')

module.exports = {
    // {nome, email, idade}
    novoUsuario(_, args) {
        const emailExistente = usuarios.some(
            u => u.email === args.email
        )

        if(emailExistente) {
            throw new Error('E-mail cadastrado')
        }

        const novo = {
            id: proximoId(),
            ...args,
            perfil_id: 1,
            status: 'ATIVO'
        }

        usuarios.push(novo);
        return novo;
    },
    excluirUsuario(_, { id }) {
        const indice = usuarios.findIndex(u => u.id === id)
        if(indice < 0) return null

        const excluidos = usuarios.splice(indice, 1)
        return excluidos ? excluidos[0] : null
    }
}