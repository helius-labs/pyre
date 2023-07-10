# **Getting Started**

**In order to run locally:**


- **Node.js** needs to be installed on your OS
- Clone the **pyre** [repo](https://github.com/Tidelaw/pyre.git)
- Start the project
    1. Run `npm install` to install all our project dependencies
    2. Run `npm run dev` to run our application


`npm install` downloads the packages found in **package.json**

`npm run dev` runs the website. The website can now be accessed from `localhost:3000` or `0.0.0.0`

In order for queries to be made, a **Helius API** key is necessary - in order to obtain one, visit 

`https://www.helius.xyz `

Now, create a file called `.env.local` on the outermost directory of the cloned repo, adding the following text into the file.

```
HELIUS_KEY = <your Helius API key>
```
The app is now fully functional on your local machine.


# **Contribute**

Help add questions by following the interface below:

``` js
interface Questions {
  name: string,
  description: string,
  difficulty: number, // 1 to 3
  api: string, // can leave null
  solved: boolean, // always false
  type: string, // wallet, tx, token
  example_answer: string, // serves as a placeholder for input
  hints: string[] // can leave null
  code: string, // can leave null, or copy from Helius docs
  docs: string, // link to the relevant docs used to solve
  tags: string[], // currently only DAS, RPC, ENHANCED API, NFT API
}
```

Here is an example:
```js
    
      name: "Number of NFTs Held",
      description: "You are provided a wallet address. Make use of Helius's service to determine the number of NFTs held by the provided wallet.",
      difficulty: 1,
      api: 'nfts_held',
      solved: false,
      type: 'wallet',
      example_answer: "25",
      hints: ["There are multiple ways to determine the number of NFTs held, some options include: using the Balances API, using the more efficient DAS protocol.",
        "Assuming the wallet provided has fewer NFTs than the limit returned in one query, the answer would simply be the length of the returned NFT array.",
        "You can adjust the limit of NFTs returned! For some wallets you may still need to paginate."],
      code:
`const url = "https://rpc.helius.xyz/?api-key=<api-key>"

const getAssetsByOwner = async () => {
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
        ownerAddress: '86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY',
        page: 1, // Starts at 1
        limit: 1000
      },
    }),
  });
  const { result } = await response.json();
  console.log("Assets by Owner: ", result.items);
};

getAssetsByOwner();`,
      docs: "https://docs.helius.xyz/solana-compression/digital-asset-standard-das-api/get-assets-by-owner",
      tags: ["DAS", "RPC"]

```

You can also contribute to the project by submitting pull requests to the repository to fix bugs or to add new features! For any inquiries, visit the [Helius Discord](https://discord.gg/helius) or message Tidelaw#0707.