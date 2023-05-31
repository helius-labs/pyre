const axios = require('axios')

const url = `https://api.helius.xyz/v1/nft-events?api-key=${process.env.HELIUS_KEY}`

const getNftEvents = async (context:string) => {
    const { data } = await axios.post(url, {
        query: {
            accounts: [context],
            types: ["NFT_SALE"],
        }
    });
    return data.result.length;
};

export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {

            let data = await getNftEvents(req.body.context)

            res.status(200).json(data)
        };

    }

    catch (err) { console.log(err) }

}
