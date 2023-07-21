import { ConcurrentMerkleTreeAccount } from '@solana/spl-account-compression'
import { Connection, PublicKey } from '@solana/web3.js';

const connection = `https://rpc.helius.xyz/?api-key=${process.env.HELIUS_KEY}`

const getCanopyDepth = async (treeAddress:string) => {

    const treeAccount = await ConcurrentMerkleTreeAccount.fromAccountAddress(
        new Connection(connection),
        new PublicKey(treeAddress),
    );

    const canopyDepth = treeAccount.getCanopyDepth();
    
    return canopyDepth
};

const getExample = async (context: string) => {
    const response = await fetch(connection, {
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
                let tree = await getExample(req.body.context)
                data = await getCanopyDepth(tree.tree_id)
            }
            else if (req.body.type == "example") {
                data = await getExample(req.body.context)
            }

            res.status(200).json(data)

        };

    }

    catch (err) { console.log(err) }

}
