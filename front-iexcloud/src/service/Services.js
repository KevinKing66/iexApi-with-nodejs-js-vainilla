const baseUrl = "http://localhost:3000/";

export default class Services {

    static async findShare(symbol) {
        let stockQuote = `${baseUrl}stock?symbol=${symbol}`;
        if (symbol !== "") {
            let share;
            await fetch(stockQuote)
                .then(res => res.json())
                .then(async (data) => share = await data)
                .catch(error => console.log('error', error));
            return share;
        };
    }    
}