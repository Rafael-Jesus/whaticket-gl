const axios = require('axios');

const api = axios({
    url: "configs/webhook",
    method: "post",
    baseURL: "https://waba.360dialog.io/v1/",
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

module.exports = api;

