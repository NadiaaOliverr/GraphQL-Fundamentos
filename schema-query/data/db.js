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
        perfil_id: 1,
        status: 'ATIVO'
    },
    {
        id: 2,
        nome: 'Rafael Júnior',
        email: 'rafajun@gmail.com',
        idade: 31,
        perfil_id: 2,
        status: 'INATIVO'
    },
    {
        id: 3,
        nome: 'Daniela Junqueira',
        email: 'danijun@gmail.com',
        idade: 24,
        perfil_id: 1,
        status: 'BLOQUEADO'
    }
]

module.exports = { usuarios, perfis }