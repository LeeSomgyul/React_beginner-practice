export async function fetchCoins() {
    const coins = await(await fetch("https://api.coinpaprika.com/v1/coins")).json();
    return coins;
}

export async function fetchCoinInfo(coinId: string){
    const infoData = await(await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    return infoData;
}

export async function fetchCoinPrice(coinId: string){
    const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
    return priceData;
}

export async function fetchCoinHistory(coinId: string){
    const coinHistory = await(await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)).json();
    return coinHistory;
}