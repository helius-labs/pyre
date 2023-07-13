const url = `https://rpc.helius.xyz/?api-key=${process.env.HELIUS_KEY}`

const getSignaturesForAsset = async (context: string) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getSignaturesForAsset',
            params: {
                id: context,
                page: 1, // Starts at 1
                limit: 1000, // Limit 1000 per request.
            },
        }),
    });
    const { result } = await response.json();
    return result.total;
};

const getExample = async (context: string) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getSignaturesForAsset',
            params: {
                id: context,
                page: 1, // Starts at 1
                limit: 1000, // Limit 1000 per request.
            },
        }),
    });
    const { result } = await response.json();
    return result;
};

export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {

            let data;

            if (req.body.type == "answer") {
                data = await getSignaturesForAsset(req.body.context)
            }
            else if (req.body.type == "example") {
                data = await getExample(req.body.context)
            }

            res.status(200).json(data)

        };

    }

    catch (err) { console.log(err) }

}
