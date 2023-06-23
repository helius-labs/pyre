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
  difficulty: number,
  api: string,
  solved: boolean,
  type: string,
  example_answer: string,
  hints: string[]
  code: string,
  docs: string,
  tags: string[],
}
```

Here is an example:
```js
    {
      name: "Number of NFTs held by a wallet",
      description: "You are provided a wallet address. Make use of Helius's service to determine the number of NFTs held by the provided wallet.",
      difficulty: 1,
      api: 'nfts_held',
      solved: false,
      type: 'wallet',
      example_answer: "25",
      hints: ["There are multiple ways to determine the number of NFTs held, some options include: using the Balances API, using the more efficient DAS protocol.",
        "Assuming the wallet provided has fewer NFTs than the limit returned in one query, the answer would simply be the length of the returned NFT array.",
        "You can adjust the limit of NFTs returned! For some wallets you may still need to paginate."],
      code: `
const url = "https://api.helius.xyz/v0/addresses/<address>/balances?api-key=<your-key>";

const getBalances = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log("balances: ", data);
};

getBalances();
      `,
      docs: "https://docs.helius.xyz/solana-rpc-nodes/digital-asset-standard-api/get-assets-by-owner",
      tags: ["DAS", "RPC"]
    },
```

You can also contribute to the project by submitting pull requests to the repository to fix bugs or to add new features! For any inquiries, visit the [Helius Discord](https://discord.gg/helius) or message Tidelaw#0707.