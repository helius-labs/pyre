
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
      method: 'getGenesisHash',
      params: [],
    }),
  });
  const { result } = await response.json();
  return result
};

const getGenesisHash = async (context: string) => {
    const url = `https://rpc.helius.xyz/?api-key=${process.env.HELIUS_KEY}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getGenesisHash',
        params: [],
      }),
    });
    const { result } = await response.json();
    console.log("Genesis Hash:", result);
    return result
};


export default async function handler(req: any, res: any) {

  try {
    if (req.method === "POST") {

      let data;

      if (req.body.type == "answer") {
        data = await getGenesisHash(req.body.context)
      }
      else if (req.body.type == "example") {
        data = await getExample(req.body.context)
      }

      res.status(200).json(data)
    };

  }

  catch (err) { console.log(err) }

}
