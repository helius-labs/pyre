const axios = require('axios')

const getAsset = async (context:any) => {

    const url = `https://rpc.helius.xyz/?api-key=${process.env.HELIUS_KEY}`

    const { data } = await axios.post(url, {
        "jsonrpc": "2.0",
        "id": "my-id",
        "method": "getAsset",
        "params": {
            "id": context
        }
    });

    return data.result.ownership.owner
};

export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {

            let data = await getAsset(req.body.context)

            res.status(200).json(data)
        };

    }

    catch (err) { console.log(err) }

}
