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

const getExample = async (context:string) => {

    const url = `https://api.helius.xyz/v0/token-metadata?api-key=${process.env.HELIUS_KEY}`
    const nftAddresses = [context];
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mintAccounts: nftAddresses,
        includeOffChain: true,
        disableCache: false,
      }),
    });
  
    const data = await response.json();
    return data
  };

export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {

            let data;

            if (req.body.type=="answer") {
                data = await getMetadata(req.body.context)
            }
            else if (req.body.type=="example") {
                data = await getExample(req.body.context)
            }

            res.status(200).json(data)
        };

    }

    catch (err) { console.log(err) }

}
