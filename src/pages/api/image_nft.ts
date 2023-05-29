const axios = require('axios')

const getMetadata = async (context: string) => {

    const url = `https://api.helius.xyz/v0/token-metadata?api-key=${process.env.HELIUS_KEY}`

    const { data } = await axios.post(url, {
        mintAccounts: [context],
        includeOffChain: true,
        disableCache: false,
    });

    return data[0].offChainMetadata.metadata.image;
};


export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {

            let data = await getMetadata(req.body.context)

            res.status(200).json(data)
        };

    }

    catch (err) { console.log(err) }

}
