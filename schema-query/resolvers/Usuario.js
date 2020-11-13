const { perfis } = require('../data/db')


module.exports = {
    // esse atributo é o retorno do resolver 'usuarioLogado'
    salario(usuario) {
        return usuario.salario_real
    },
    perfil(usuario) {
        const selecionados = perfis.filter(p => p.id === usuario.perfil_id)
        return selecionados ?  selecionados[0] : null
    }
}