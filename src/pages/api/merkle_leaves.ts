import { ConcurrentMerkleTreeAccount } from "@solana/spl-account-compression";
import web3 from "@solana/web3.js"

const url = `https://rpc.helius.xyz/?api-key=${process.env.HELIUS_KEY}`

const getAsset = async (context:string) => {

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getAsset',
            params: {
                id: context
            },
        }),
    });

    const { result } = await response.json();

    const connection = new web3.Connection(url);
    const publicKey = new web3.PublicKey(result.compression.tree);

    const cmt = await ConcurrentMerkleTreeAccount.fromAccountAddress(connection, publicKey)

    return cmt.tree.rightMostPath.index
};

const getExample = async (context:string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'my-id',
      method: 'getAsset',
      params: {
        id: context
      },
    }),
  });
  const { result } = await response.json();
  return result
};

export default async function handler(req: any, res: any) {

  try {
      if (req.method === "POST") {

          let data;

          if (req.body.type == "answer") {
              data = await getAsset(req.body.context)
          }
          else if (req.body.type == "example") {
              data = await getExample(req.body.context)
          }

          res.status(200).json(data)

      };

  }

  catch (err) { console.log(err) }

}
