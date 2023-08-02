import { Connection } from '@solana/web3.js';

const connection = new Connection(
    `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_KEY}`,
    "confirmed"
  );

const getTPS = async () => {

    let recentPerformanceSamples = await connection.getRecentPerformanceSamples();
    let tps:any =
      recentPerformanceSamples[0].numTransactions /
      recentPerformanceSamples[0].samplePeriodSecs;
    return Math.round(tps/1000)*1000
};

const getExample = async () => {
    let recentPerformanceSamples = await connection.getRecentPerformanceSamples();
    return recentPerformanceSamples
};

export default async function handler(req: any, res: any) {

    try {
        if (req.method === "POST") {

            let data;

            if (req.body.type == "answer") {
                data = await getTPS()
            }
            else if (req.body.type == "example") {
                data = await getExample()
            }
            console.log(data)
            res.status(200).json(data)

        };

    }

    catch (err) { console.log(err) }

}
