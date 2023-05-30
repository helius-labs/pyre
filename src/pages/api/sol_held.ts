const axios = require('axios')

const getBalance = async (context:string) => {

    const url = `https://api.helius.xyz/v0/addresses/${context}/balances?api-key=${process.env.HELIUS_KEY}`

    const { data } = await axios.get(url)
    return (data.nativeBalance/1000000000).toFixed(2);

};

export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {

            let data = await getBalance(req.body.context)

            res.status(200).json(data)
        };

    }

    catch (err) { console.log(err) }

}
