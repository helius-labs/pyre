const axios = require('axios')

const getBalance = async (context:string) => {

    const url = `https://api.helius.xyz/v0/addresses/${context}/balances?api-key=${process.env.HELIUS_KEY}`

    const { data } = await axios.get(url)

    return (data.nativeBalance/1000000000).toFixed(0);

};

const getExample = async (context:string) => {

    const url = `https://api.helius.xyz/v0/addresses/${context}/balances?api-key=${process.env.HELIUS_KEY}`

    const { data } = await axios.get(url)

    return data

};

export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {

            let data;

            if (req.body.type=="answer") {
                data = await getBalance(req.body.context)
            }
            else if (req.body.type=="example") {
                data = await getExample(req.body.context)
            }

            res.status(200).json(data)
        };

    }

    catch (err) { console.log(err) }

}
