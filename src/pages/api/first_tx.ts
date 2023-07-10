const web3 = require("@solana/web3.js");

async function firstTransaction (context:string) {
  const solana = new web3.Connection(`https://rpc.helius.xyz/?api-key=${process.env.HELIUS_KEY}`);
  const publicKey = new web3.PublicKey(context);

  let current = await solana.getSignaturesForAddress(publicKey);

  let latestSig = current[current.length-1].signature, answer = '';

  if (current.length!=1000) {
    answer = latestSig;
  }

  while (!answer) {
    
    let current = await solana.getSignaturesForAddress(publicKey, { before: latestSig });
    
    latestSig = current[current.length-1].signature;

    if (current.length!=1000) {
      answer = latestSig;
    }
  }

  return answer
  
};

const getExample = async (context:string) => {

  
  const url = `https://api.helius.xyz/v0/addresses/${context}/transactions?api-key=${process.env.HELIUS_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data)
  return data[0]
};

export default async function handler(req: any, res: any) {

  try {
      if (req.method === "POST") {

          let data;

          if (req.body.type == "answer") {
              data = await firstTransaction(req.body.context)
          }
          else if (req.body.type == "example") {
              data = await getExample(req.body.context)
          }

          res.status(200).json(data)

      };

  }

  catch (err) { console.log(err) }

}
