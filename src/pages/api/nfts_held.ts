const axios = require('axios')

const getAssetsByOwner = async (context:string) => {

  let held = [], page:any = 1;

  while (page) { // pagination is definitely overkill

    const url = `https://icarus.helius.xyz/?api-key=${process.env.HELIUS_KEY}`

    const { data } = await axios.post(url, {
      "jsonrpc": "2.0",
      "id": "my-id",
      "method": "getAssetsByOwner",
      "params": {
       "ownerAddress": context,
        "page": page,
        "limit": 1000
      }
    });

    if (data.result.total != 1000) {
      held.push(...data.result.items);
      page = false;
    }
    else {
      held.push(...data.result.items);
      page++;
    }
  }
  return held.length
};


export default async function handler(req: any, res: any) {

  try {
    if (req.method === "POST") {

      let data = await getAssetsByOwner(req.body.context)

      res.status(200).json(data)
    };

  }

  catch (err) { console.log(err) }

}
