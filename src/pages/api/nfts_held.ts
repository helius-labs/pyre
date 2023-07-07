const axios = require('axios')

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
      method: 'getAssetsByOwner',
      params: {
        ownerAddress: context,
        page: 1, // Starts at 1
        limit: 1000
      },
    }),
  });
  const { result } = await response.json();
  console.log("Assets by Owner: ", result.items);
  return result.items
};

const getAssetsByOwner = async (context: string) => {

  let held = [], page: any = 1;

  while (page) { // pagination is definitely overkill

    const url = `https://rpc.helius.xyz/?api-key=${process.env.HELIUS_KEY}`

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

      let data;

      if (req.body.type == "answer") {
        data = await getAssetsByOwner(req.body.context)
      }
      else if (req.body.type == "example") {
        data = await getExample(req.body.context)
      }

      res.status(200).json(data)
    };

  }

  catch (err) { console.log(err) }

}
