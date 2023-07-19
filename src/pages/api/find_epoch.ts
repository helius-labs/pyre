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
      method: 'getEpochInfo',
      params: {},
    }),
  });
  const { result } = await response.json();
  console.log("Epoch info: ", result.epoch);
  return result.epoch
};

const getEpochInfo = async (context: string) => {
    const url = `https://rpc.helius.xyz/?api-key=${process.env.HELIUS_KEY}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getEpochInfo',
        params: {},
      }),
    });
    const { result } = await response.json();
    console.log("Epoch info: ", result.epoch);
    return result.epoch
};


export default async function handler(req: any, res: any) {

  try {
    if (req.method === "POST") {

      let data;

      if (req.body.type == "answer") {
        data = await getEpochInfo(req.body.context)
      }
      else if (req.body.type == "example") {
        data = await getExample(req.body.context)
      }

      res.status(200).json(data)
    };

  }

  catch (err) { console.log(err) }

}
