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

const getExample = async (context:string) => {

    const url = `https://api.helius.xyz/v1/nft-events?api-key=${process.env.HELIUS_KEY}`
  
    const response = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: {
            accounts: [context],
            types: ["NFT_SALE"],
          }
        }),
      });
  
    const data = await response.json()
    return data  
  };
  
  getNftEvents("T1d3crwf5cYLcVU5ojNRgJbJUXJta2uBgbtev2xWLAW")

export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {
            let data;

            if (req.body.type=="answer") {
                data = await getNftEvents(req.body.context)
            }
            else if (req.body.type=="example") {
                data = await getExample(req.body.context)
            }

            res.status(200).json(data)
        };

    }

    catch (err) { console.log(err) }

}
