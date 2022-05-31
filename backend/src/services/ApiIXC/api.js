const axios = require('axios');

const api = axios({
    url: "cliente",
    method: "get",
    baseURL: "https://www.globallive1.com.br/webservice/v1/",
    headers: {
        "Authorization": "Basic NTowMDc3MGM4ZTcwYTdmOGQ5MzU0YzA4YWExN2U0ODU2MWQyOGM5OWUxZDMzNjZiOTI1N2MyNTMyMWQyZTQ1MmM2",
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "ixcsoft": "listar",
        "Selfsigned": "true"
    },
    data:{
        "qtype" : "cnpj_cpf",
        "query" : "523.669.518-09",
        "oper" : "="
    }
});

const boleto = axios({
    url: "get_boleto",
    method: "post",
    baseURL: "https://www.globallive1.com.br/webservice/v1/",
    headers: {
        "Authorization": "Basic NTowMDc3MGM4ZTcwYTdmOGQ5MzU0YzA4YWExN2U0ODU2MWQyOGM5OWUxZDMzNjZiOTI1N2MyNTMyMWQyZTQ1MmM2",
        "Content-Type":"application/json",
        "Accept":"*/*",
        "Accept-Encoding":"gzip, deflate, br",
        "Connection":"keep-alive",
    },
    data:{
        "boletos" : "390289",
        "juro" : "N",
        "multa" : "N",
        "atualiza_boleto" : "N", 
        "tipo_boleto" : "arquivo",
        "base64" : "S"
    }
});  
  

function enviaBoleto(boleto){

    axios({
        url: "media",
        method: "post",
        baseURL: "https://waba.360dialog.io/v1/media",
        headers: {
            "D360-API-KEY": "blrSrFb97zlCw16zyvvCMWHqAK",
        },
        data:{
            boleto
        }
    }); 

}

module.exports = api;

