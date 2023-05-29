const axios = require('axios')

const parseTransaction = async (context: string) => {

    const url = `https://api.helius.xyz/v0/transactions/?api-key=${process.env.HELIUS_KEY}`

    const { data } = await axios.post(url, { transactions: [context] })

    return data[0].timestamp;
};


export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {

            let data = await parseTransaction(req.body.context)

            res.status(200).json(data)
        };

    }

    catch (err) { console.log(err) }

}
