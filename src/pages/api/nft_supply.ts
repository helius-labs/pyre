const axios = require('axios')

const getAssetsByGroup = async (context:any) => {

    let url = `https://api.helius.xyz/v0/token-metadata?api-key=${process.env.HELIUS_KEY}`

    let { data } = await axios.post(url, {
        mintAccounts: [context],
        includeOffChain: true,
        disableCache: false,
    });
    
    console.log(data[0].onChainMetadata.metadata)
    const collection = data[0].onChainMetadata.metadata.collection.key

    url = `https://rpc.helius.xyz/?api-key=${process.env.HELIUS_KEY}`

    let mintlist = [], page:any = 1;

    while (page) {
        const { data } = await axios.post(url, {
            "jsonrpc": "2.0",
            "id": "my-id",
            "method": "getAssetsByGroup",
            "params": {
                "groupKey": "collection",
                "groupValue": collection,
                "page": page,
                "limit": 1000
            }
        });

        if (data.result.total != 1000) {
            mintlist.push(...data.result.items);
            page = false; 
        }
        else {
            mintlist.push(...data.result.items);
            page++;
        }
    }
    return mintlist.length
};


export default async function handler(req: any, res: any) {

    try {
      if (req.method === "POST") {
  
        let data = await getAssetsByGroup(req.body.context)
  
        res.status(200).json(data)
      };
  
    }
  
    catch (err) { console.log(err) }
  
  }
  