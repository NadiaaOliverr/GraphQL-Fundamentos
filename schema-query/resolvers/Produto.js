module.exports = {
    precoComDesconto(produto) {
        if(produto.desconto){
            let porcentagemRestante = (100 - produto.desconto)/100
            return produto.preco * porcentagemRestante
        }
        return produto.preco
    }
}