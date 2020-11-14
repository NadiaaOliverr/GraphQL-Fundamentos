const { usuarios, proximoId } = require('../data/db')

module.exports = {
    // {nome, email, idade}
    novoUsuario(_, { dados }) {
        const emailExistente = usuarios.some(
            u => u.email === dados.email
        )

        if(emailExistente) {
            throw new Error('E-mail cadastrado')
        }

        const novo = {
            id: proximoId(),
            ...dados,
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
    },
    alterarUsuario(_, args) {
        const indice = usuarios.findIndex(u => u.id === args.id)
        if(indice < 0) return null
        
        const usuario = {
            ...usuarios[indice],
            ...args
        }

        usuarios.splice(indice, 1, usuario)
        return usuario
    }
}