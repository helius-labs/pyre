const axios = require('axios');

async function getQuote(wallet:any) {

    const url = `https://api.helius.xyz/v0/addresses/${wallet}/balances?api-key=${process.env.HELIUS_KEY}`

    let { data } = await axios.get(url)

    console.log(data.nativeBalance)

    let config = {
        method: 'get',
        url: `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=${data.nativeBalance}`,
        headers: {
          'Accept': 'application/json'
        }
    };

    data = await axios.request(config)
    return Math.round(data.data.outAmount/1000000)
}

async function getExample(sol:any) {
    let config = {
        method: 'get',
        url: `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=25000000000`,
        headers: {
          'Accept': 'application/json'
        }
      };

    let {data} = await axios.request(config)
    return Math.round(data.outAmount/1000000)
}


export default async function handler(req: any, res: any) {

    try {
      if (req.method === "POST") {
  
        let data;
  
        if (req.body.type == "answer") {
          data = await getQuote(req.body.context)
        }
        else if (req.body.type == "example") {
          data = await getExample(req.body.context)
        }
        res.status(200).json(data)
      };
  
    }
  
    catch (err) { console.log(err) }
  
  }
  