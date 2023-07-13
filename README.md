# Pyre

An educational app that teaches users about Helius and Solana.

![Pyre Demo](/public/pyre-demo.png)
[![License](https://img.shields.io/github/license/saltstack/salt)](https://opensource.org/license/apache-2-0/T)

<br>

## **To access the full hosted application, please click [here](www.https://pyre.helius.xyz/)**

<br>

## Description
Pyre is a Next.js app that allows users to learn about Helius and Solana through bite-sized questions. Each question is accompanied by unique contexts to provide a dynamic learning experience.

## Installation and Setup
1. Ensure you have Node.js installed.
2. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/helius-labs/pyre.git
3. Change to the project directory
    ```bash 
    cd pyre
4. Install the project dependencies:
    ```bash
    npm install
## Usage
1. Start the development server: 
    ```bash
    npm run dev
2. Open your browser and navigate to http://localhost:3000 to access the Pyre app.

![Pyre Landing](/public/pyre-landing.png)

## License
This project is open source and available under the Apache 2.0 License.

# **Contribute**

Contributions are welcome! If you'd like to contribute to Helius RPC Playground, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Submit a pull request with all relevant details.

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

Rendered version:

![Pyre Question](/public/pyre-question.png)


Here is an example:
```js
    
      name: "Number of NFTs Held",
      description: "You are provided a wallet address. Make use of Helius' service to determine the number of NFTs held by the provided wallet.",
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

You can also contribute to the project by opening issues and submitting pull requests to fix bugs or add new features! For any inquiries, visit the [Helius Discord](https://discord.gg/helius) or message Tidelaw#0707.

## License
This project is open source and available under the Apache 2.0 License.

## Related Links
* [Live Demo](www.https://pyre.helius.xyz/)
* [Helius Dev Portal](https://dev.helius.xyz/dashboard/app)
* [Helius Documentation](https://docs.helius.xyz/)
* [xNFT Version](https://www.xnft.gg/app/7BvNHEnUZ9oVhpAVFaKSxgYUuHnJqb1sz51fVejFokpb)
