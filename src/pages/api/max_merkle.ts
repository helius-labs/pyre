import { ConcurrentMerkleTreeAccount } from "@solana/spl-account-compression";
import web3 from "@solana/web3.js"
const url = `https://rpc.helius.xyz/?api-key=${process.env.HELIUS_KEY}`

const getAssetProof = async (context: string) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getAssetProof',
            params: {
                id: context
            },
        }),
    });
    const { result } = await response.json();

    const connection = new web3.Connection(url);
    const publicKey = new web3.PublicKey(result.tree_id);

    const cmt = await ConcurrentMerkleTreeAccount.fromAccountAddress(connection, publicKey)

    return Math.pow(2, cmt.getMaxDepth())
};


const getExample = async (context: string) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getAssetProof',
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
                data = await getAssetProof(req.body.context)
            }
            else if (req.body.type == "example") {
                data = await getExample(req.body.context)
            }

            res.status(200).json(data)

        };

    }

    catch (err) { console.log(err) }

}
