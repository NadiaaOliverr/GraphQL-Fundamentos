const { perfis, proximoId } = require('../../data/db')


const indicePerfil = function(filtro) {
    if(!filtro) return -1;
    const { id, nome } = filtro
    if(id) {
        return perfis.findIndex(p => p.id === id);
    } else if(nome){
        return perfis.findIndex(p => p.nome === nome);
    }
    return -1;
}

module.exports = {
    novoPerfil(_, { dados }) {
        const nomeExistente = perfis.some(
            u => u.nome === dados.nome
        )

        if(nomeExistente) {
            throw new Error('Perfil cadastrado')
        }

        const novo = {
            id: proximoId(),
            ...dados
        }

        perfis.push(novo);
        return novo;
    },
    excluirPerfil(_, { filtro }) {
        const indice = indicePerfil(filtro);
        if(indice < 0) return null

        const excluidos = perfis.splice(indice, 1)
        return excluidos ? excluidos[0] : null
    },
    alterarPerfil(_, {filtro, dados }) {
        const indice = indicePerfil(filtro)
        if(indice < 0) return null
        
        const perfil = {
            ...perfis[indice],
            ...dados
        }

        perfis.splice(indice, 1, perfil)
        return perfil
    }
}