const axios = require('axios');


export async function getCompaniesBySymbol(symbols) {
    let companyList = [];

    for (let i = 0; i < symbols.length ; i++){
        if(localStorage.getItem(symbols[i]) === null) {
            let config = {
                method: 'get',
                url: 'https://www.alphavantage.co/query?',
                params: {
                    function: `OVERVIEW`,
                    symbol: symbols[i],
                    apikey: `I0R8K64CG3EHARV6`,
                },
            };
            const companyData = await axios(config);

            localStorage.setItem(symbols[i], JSON.stringify(companyData.data));
            companyList.push(companyData.data);
        } else {
            companyList.push(JSON.parse(localStorage.getItem(symbols[i])));
        }
    }
    console.log(companyList);
    return companyList
}



export async function getCompanyBySymbol(symbol){
    const companyList = [];
    let config = {
        method: 'get',
        url: 'https://www.alphavantage.co/query?',
        params: {
            function: `OVERVIEW`,
            symbol: symbol.toString(),
            apikey: `I0R8K64CG3EHARV6`,
        },
    };

    const companyData = await axios(config);
    companyList.push(companyData.data);

    return companyList
}

export async function getCompanyStockBySymbol(symbols) {
    let config = {
        method: 'get',
        url: 'https://www.alphavantage.co/query?',
        params: {
            function: `TIME_SERIES_DAILY`,
            symbol: symbols,
            outputsize: `compact`,
            apikey: `I0R8K64CG3EHARV6`,
        },
    };
    const companyData = await axios(config);
    let data = companyData.data['Time Series (Daily)'];
    let filteredData = [];

    for (let i = 0; i < data.length ; i++) {
        filteredData.push({
            Date: data[i],
            Open: data[i]['1. open'],
            High: data[i]['2. high'],
            Low: data[i]['3. low'],
            Close: data[i]['4. close'],
            Volume: data[i]['5. volume'],
        })
    }
    return filteredData

}
