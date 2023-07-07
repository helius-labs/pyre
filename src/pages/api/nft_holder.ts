const axios = require('axios')

const getAsset = async (context: any) => {

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

const getExample = async (context: string) => {

    const url = `https://rpc.helius.xyz/?api-key=${process.env.HELIUS_KEY}`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getAsset',
            params: {
                id: context
            },
        }),
    });
    const { result } = await response.json();
    return result
};

export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {

            let data;

            if (req.body.type=="answer") {
                data = await getAsset(req.body.context)
            }
            else if (req.body.type=="example") {
                data = await getExample(req.body.context)
            }

            res.status(200).json(data)
        };

    }

    catch (err) { console.log(err) }

}
