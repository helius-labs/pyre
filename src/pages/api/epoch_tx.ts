const axios = require('axios')

const parseTransaction = async (context: string) => {

    const url = `https://api.helius.xyz/v0/transactions/?api-key=${process.env.HELIUS_KEY}`

    const { data } = await axios.post(url, { transactions: [context] })

    return data[0].timestamp;
};

const getExample = async (context: string) => {

    const url = `https://api.helius.xyz/v0/transactions/?api-key=${process.env.HELIUS_KEY}`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            transactions: [context],
        }),
    });

    const data = await response.json();
    return data[0]
};

export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {

            let data;

            if (req.body.type == "answer") {
                data = await parseTransaction(req.body.context)
            }
            else if (req.body.type == "example") {
                data = await getExample(req.body.context)
            }

            res.status(200).json(data)

        };

    }

    catch (err) { console.log(err) }

}
