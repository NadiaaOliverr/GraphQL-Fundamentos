// Usando para ter algum tipo de processamento assíncrono
// É uma promessa que pode ser atendida ou rejeitada

function falarDepoisDe(segundos, frase) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(frase)
        }, segundos * 1000)
    })
}

falarDepoisDe(5, "Que Legal!")
    .then(frase => frase.concat("?!?"))
    .then(outraFrase => console.log(outraFrase))
    .catch(e => console.log(e)) // é chamado quando o reject é invocado, para tratamento do erro