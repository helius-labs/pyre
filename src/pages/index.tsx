import Landing from '../components/Landing';
import QuestionMenu from '../components/QuestionMenu';
import Question from '../components/Question';
import End from '../components/End';
import Tracks from '../components/Tracks';
import axios from 'axios';
import Demo from '../components/Demo'
import Image from 'next/image';
import { useEffect, useState } from "react";
import { SignMessage } from '../components/SignMessage';
import { useSession } from "next-auth/react"
import { Inter } from 'next/font/google'

import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

interface Questions {
  name: string,
  description: string,
  difficulty: number,
  api: string,
  solved: boolean,
  type: string,
  example_answer: string,
  hints: string[]
  js_code: string,
  docs: string,
  tags: string[],
}

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState('Landing')
  const [question, setQuestion] = useState()
  const [progress, setProgress] = useState(0)
  const originalQuestions = [
    {
      name: "Native Balance",
      description: <Demo></Demo>,
      difficulty: 1,
      api: "sol_held",
      solved: false,
      type: "wallet",
      example_answer: "25.01",
      hints: ["As the data returned in the Balances API is returned in terms of Lamports, you'll need to divide by 1 billion for an accurate SOL answer.",
        "You can call the native javascript function of variable.toFixed(0) to round your answer to the nearest SOL, this is necessary for this question.",
        "If you're using the Balances API, the amount of SOL held is contained in the property 'nativeBalance'."],
      js_code:
        `const url = "https://api.helius.xyz/v0/addresses/<address>/balances?api-key=<api-key>";

const getBalances = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log("balances: ", data);
};

getBalances();`,
      py_code:
        `import os
import requests
import json

API_KEY = os.getenv('API_KEY')
ADDRESS = "<address>"
URL = f"https://api.helius.xyz/v0/addresses/{ADDRESS}/balances?api-key={API_KEY}"

def get_balances():
    response = requests.get(URL)
    print(json.dumps(response.json(), indent=4))

get_balances()
`,
      docs: "https://docs.helius.xyz/solana-apis/balances-api",
      tags: ["ENHANCED API"]
    },
    {
      name: "Value of SOL in wallet",
      description: "Make use of Jupiter's Quote API in order to find a quote for the provided wallet's SOL to USDC value. As values are constantly fluctuating, please round to the nearest USDC! Additionally, use of explorers like Solscan may be incorrect as Jupiter factors in platform fees and etc.",
      difficulty: 2,
      api: "jup_quote",
      solved: false,
      type: 'wallet',
      example_answer: "25.01",
      hints: ["Change the URL of the GET request provided with the amount of SOL in the provided wallet.", "Depending on how you query for the SOL balance, you'll have to divide the returned by a billion. Similarly you'll have to divide the returned USDC value by 1 million."],
      info: 'You can create a swap transaction with the returned quote object!',
      js_code:
`async function getExample(sol) {
  let config = {
      method: 'get',
      url: "https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=<your-sol>",
      headers: {
        'Accept': 'application/json'
      }
    };

  let {data} = await axios.request(config)
  return Math.round(data.outAmount/1_000_000)
}`,
      py_code: null
      ,
      docs: "https://station.jup.ag/api-v6/get-quote",
      tags: ["JUPITER", "RPC"]
    },
    {
      name: "An cNFT's Mint Signature",
      description: "You are provided a cNFT mint address. Make use of Helius' services in order to find it's mint transaction signature.",
      difficulty: 2,
      api: "mint_sig",
      solved: false,
      type: 'cnft',
      example_answer: "5nLi8m72bU6PBcz4Xrk23P6KTGy9ufF92kZiQXjTv9ELgkUxrNaiCGhMF4vh6RAcisw9DEQWJt9ogM3G2uCuwwV7",
      hints: ["Run the example code!", "The 'total' property returned is the total number of transactions that took place involving the cNFT!"],
      js_code:
`const url = "https://mainnet.helius-rpc.com/?api-key=<api_key>"

const getSignaturesForAsset = async () => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'my-id',
      method: 'getSignaturesForAsset',
      params: {
        id: 'FNt6A9Mfnqbwc1tY7uwAguKQ1JcpBrxmhczDgbdJy5AC',
        page: 1, // Starts at 1
        limit: 1000, // Limit 1000 per request.
      },
    }),
  });
  const { result } = await response.json();
  console.log("Signatures: ", result);
};
getSignaturesForAsset();`,
      py_code: null
      ,
      docs: "https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api/get-signatures-for-asset",
      tags: ["DAS"]
    },
    {
      name: "Leaves on a Merkle Tree",
      description: "You are provided a cNFT mint address. Make use of Helius' services in order to find the current number of leaves on the merkle tree the cNFT was minted on.",
      difficulty: 2,
      api: "merkle_leaves",
      solved: false,
      type: "cnft",
      example_answer: "12501",
      hints: ["Find the Merkle Tree ID and look it up on https://xray.helius.xyz/.",
        "Call the ConcurrentMerkleTreeAccount function on the Merkle Tree ID!",
        "The current number of leaves actually vary across explorers, try inputting your value +- 1!"],
      info: "You can use this to determine a cNFT's serial number!",
      js_code:
        `const url = "https://mainnet.helius-rpc.com/?api-key=<api_key>"

const getAsset = async () => {
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
        id: 'Bu1DEKeawy7txbnCEJE4BU3BKLXaNAKCYcHR4XhndGss'
      },
    }),
  });
  const { result } = await response.json();
  console.log(result)
};
getAsset()`,
      py_code:
        `import os
import requests
import json

API_KEY = os.getenv('API_KEY')
URL = f"https://mainnet.helius-rpc.com/?api-key={API_KEY}"
ASSET_ID = "Bu1DEKeawy7txbnCEJE4BU3BKLXaNAKCYcHR4XhndGss"

def get_asset(asset_id):
    data = {
        "jsonrpc": "2.0",
        "id": "request-id",
        "method": "getAsset",
        "params": { "id": asset_id }
    }
    response = requests.post(URL, headers={'Content-Type': 'application/json'}, data=json.dumps(data))
    print(json.dumps(response.json().get('result'), indent=4))

get_asset(ASSET_ID)
`,
      docs: "https://docs.helius.xyz/solana-compression/digital-asset-standard-das-api/get-asset",
      tags: ["DAS", "CNFT"]
    },
    {
      name: "Size of a Merkle Tree",
      description: "You are provided a cNFT mint address. Make use of Helius' services in order to find the maximum number of leaves on the merkle tree the cNFT was minted on.",
      difficulty: 2,
      api: "max_merkle",
      solved: false,
      type: "cnft",
      example_answer: "8192",
      hints: ["Find the Merkle Tree ID and look it up on https://xray.helius.xyz/.",
        "Call the ConcurrentMerkleTreeAccount function on the Merkle Tree ID",
        "Find the maxDepth property and the size of the tree is 2 to the maxDepth."],
      js_code:
        `const url = "https://mainnet.helius-rpc.com/?api-key=<api_key>"

const getAssetProof = async () => {
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
        id: 'Bu1DEKeawy7txbnCEJE4BU3BKLXaNAKCYcHR4XhndGss'
      },
    }),
  });
  const { result } = await response.json();
  console.log("Assets Proof: ", result);
};
getAssetProof()`,
      py_code:
        `import os
import requests
import json

API_KEY = os.getenv('API_KEY')
URL = f"https://mainnet.helius-rpc.com/?api-key={API_KEY}"
ASSET_ID = "Bu1DEKeawy7txbnCEJE4BU3BKLXaNAKCYcHR4XhndGss"

def get_asset_proof(asset_id):
    data = {
        "jsonrpc": "2.0",
        "id": "my-id",
        "method": "getAssetProof",
        "params": { "id": asset_id }
    }
    response = requests.post(URL, headers={'Content-Type': 'application/json'}, data=json.dumps(data))
    print(json.dumps(response.json().get('result'), indent=4))

get_asset_proof(ASSET_ID)
`,
      docs: "https://docs.helius.xyz/solana-compression/digital-asset-standard-das-api/get-asset",
      tags: ["DAS", "CNFT"]
    },
    {
      name: "A cNFT's Merkle Tree",
      description: "You are provided a cNFT mint address. Make use of Helius' services in order to find the ID of the merkle tree the cNFT was minted on.",
      difficulty: 1,
      api: "find_merkle",
      solved: false,
      type: "cnft",
      example_answer: "2kuTFCcjbV22wvUmtmgsFR7cas7eZUzAu96jzJUvUcb7",
      hints: ["Read the docs: https://docs.helius.xyz/solana-compression/digital-asset-standard-das-api/get-asset-proof",
        "Find the property by scrolling through the example output in the demo",
        "The property is called, under compression.tree"],
      js_code:
        `const url = "https://mainnet.helius-rpc.com/?api-key=<api_key>"

const getAssetProof = async () => {
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
        id: 'Bu1DEKeawy7txbnCEJE4BU3BKLXaNAKCYcHR4XhndGss'
      },
    }),
  });
  const { result } = await response.json();
  console.log("Assets Proof: ", result);
};
getAssetProof()`,
      py_code:
        `import os
import requests
import json

API_KEY = os.getenv('API_KEY')
URL = f"https://mainnet.helius-rpc.com/?api-key={API_KEY}"
ASSET_ID = "Bu1DEKeawy7txbnCEJE4BU3BKLXaNAKCYcHR4XhndGss"

def get_asset_proof(asset_id):
    data = {
        "jsonrpc": "2.0",
        "id": "my-id",
        "method": "getAssetProof",
        "params": { "id": asset_id }
    }
    response = requests.post(URL, headers={'Content-Type': 'application/json'}, data=json.dumps(data))
    print(json.dumps(response.json().get('result'), indent=4))

get_asset_proof(ASSET_ID)
`,
      docs: "https://docs.helius.xyz/solana-compression/digital-asset-standard-das-api/get-asset",
      tags: ["DAS", "CNFT"]
    },
    {
      name: "Find Canopy Depth",
      description: "Make use of DAS and native RPC methods to find the canopy depth of a given cNFT's merkle tree.",
      difficulty: 2,
      api: "canopy_depth",
      solved: false,
      type: "cnft",
      example_answer: "12",
      info: ["In order to transfer transferring a cNFT, the needed asset proof is retrieved using the getAssetProof method. However the method returns the 'full proof', in order to reduce it, proof hashes are removed , in order to remove the correct number of proof addresses we need to know the tree's canopy depth."],
      hints: ["You'll first have to retrieve the cNFT's merkle tree using the getAssetProof DAS method.",
        "Use the function ConcurrentMerkleTreeAccount from @solana/spl-account-compression to retrieve a merkle tree's data.",
        "Retrieve the canopy depth from the data returned by ConcurrentMerkleTreeAccount using the .getCanopyDepth() function."],
      js_code:
        `const url = "https://mainnet.helius-rpc.com/?api-key=<api_key>"

const getAssetProof = async () => {
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
        id: 'Bu1DEKeawy7txbnCEJE4BU3BKLXaNAKCYcHR4XhndGss'
      },
    }),
  });
  const { result } = await response.json();
  console.log("Assets Proof: ", result);
};
getAssetProof()`,
      py_code:
        `import os
import requests
import json

API_KEY = os.getenv('API_KEY')
URL = f"https://mainnet.helius-rpc.com/?api-key={API_KEY}"
ASSET_ID = "Bu1DEKeawy7txbnCEJE4BU3BKLXaNAKCYcHR4XhndGss"

def get_asset_proof(asset_id):
    data = {
        "jsonrpc": "2.0",
        "id": "my-id",
        "method": "getAssetProof",
        "params": { "id": asset_id }
    }
    response = requests.post(URL, headers={'Content-Type': 'application/json'}, data=json.dumps(data))
    print(json.dumps(response.json().get('result'), indent=4))

get_asset_proof(ASSET_ID)
`,
      docs: "https://docs.solana.com/api/http#getgenesishash",
      tags: ["DAS", "RPC"]
    },
    {
      name: "A cNFT's Transactions",
      description: "You are provided a cNFT mint address. Make use of Helius' services in order to find the number of transactions relating to the cNFT.",
      difficulty: 1,
      api: "cnft_sigs",
      solved: false,
      type: "cnft",
      example_answer: "2",
      hints: ["Run the example code!", "The 'total' property returned is the total number of transactions that took place involving the cNFT!"],
      info: ["You can use this in order to find the sales history of a cNFT!"],
      js_code:
`const url = "https://mainnet.helius-rpc.com/?api-key=<api_key>"

const getSignaturesForAsset = async () => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'my-id',
      method: 'getSignaturesForAsset',
      params: {
        id: 'FNt6A9Mfnqbwc1tY7uwAguKQ1JcpBrxmhczDgbdJy5AC',
        page: 1, // Starts at 1
        limit: 1000, // Limit 1000 per request.
      },
    }),
  });
  const { result } = await response.json();
  console.log("Signatures: ", result);
};
getSignaturesForAsset();`,
      py_code:
        `import os
import requests
import json

API_KEY = os.getenv('API_KEY')
URL = f"https://mainnet.helius-rpc.com/?api-key={API_KEY}"
ASSET_ID = "FNt6A9Mfnqbwc1tY7uwAguKQ1JcpBrxmhczDgbdJy5AC"

def get_signatures_for_asset(asset_id):
    data = {
        "jsonrpc": "2.0",
        "id": "my-id",
        "method": "getSignaturesForAsset",
        "params": {
            "id": asset_id,
            "page": 1,
            "limit": 1000,
        }
    }
    response = requests.post(URL, headers={'Content-Type': 'application/json'}, data=json.dumps(data))
    print(json.dumps(response.json().get('result'), indent=4))

get_signatures_for_asset(ASSET_ID)
`,
      docs: "https://docs.helius.xyz/solana-compression/digital-asset-standard-das-api/get-signatures-for-asset",
      tags: ["DAS", "CNFT"]
    },
    {
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
      js_code:
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
      py_code:
        `import os
import requests
import json

API_KEY = os.getenv('API_KEY')
URL = f"https://rpc.helius.xyz/?api-key={API_KEY}"
OWNER_ADDRESS = "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY"

def get_assets_by_owner(owner_address):
    data = {
        "jsonrpc": "2.0",
        "id": "my-id",
        "method": "getAssetsByOwner",
        "params": {
            "ownerAddress": owner_address,
            "page": 1,
            "limit": 1000
        }
    }
    response = requests.post(URL, headers={'Content-Type': 'application/json'}, data=json.dumps(data))
    print(json.dumps(response.json().get('result').get('items'), indent=4))

get_assets_by_owner(OWNER_ADDRESS)
`,
      docs: "https://docs.helius.xyz/solana-compression/digital-asset-standard-das-api/get-assets-by-owner",
      tags: ["DAS", "RPC"]
    },
    {
      name: "Image URL of an NFT",
      description: "You are provided the mint address of a token. Make use of Helius' services to find the image of an NFT, you'll need to extract the URL pointing to the image from the data.",
      difficulty: 1,
      api: 'image_nft',
      solved: false,
      type: 'nft',
      example_answer: "https://madlads.s3.us-west-2.amazonaws.com/images/8420.png",
      info: "The most popular application of this are NFT galleries! See here: https://token-display.vercel.app/",
      hints: ["You can log the data returned from the endpoint in order to find out the path that has the URL for the image.",
        "You'll need to log the 1st index, or data[0] if using the token-metadata endpoint as it is returned as an array.",
        "If the link you've provided is not accepted, try querying for the link found in the offChainMetadata property of the data returned."],
      js_code:
        `const getMetadata = async (context) => {


  const url = "https://api.helius.xyz/v0/token-metadata?api-key=<api-key>=";
  const nftAddresses = [context];

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mintAccounts: nftAddresses,
      includeOffChain: true,
      disableCache: false,
    }),
  });

  const data = await response.json();
  console.log("metadata: ", data);
};

getMetadata('F9Lw3ki3hJ7PF9HQXsBzoY8GyE6sPoEZZdXJBsTTD2rk');`,
      py_code:
        `import os
import requests
import json

API_KEY = os.getenv('API_KEY')
URL = f"https://api.helius.xyz/v0/token-metadata?api-key={API_KEY}"
NFT_ADDRESS = 'F9Lw3ki3hJ7PF9HQXsBzoY8GyE6sPoEZZdXJBsTTD2rk'

def get_metadata(nft_address):
    data = {
        "mintAccounts": [nft_address],
        "includeOffChain": True,
        "disableCache": False
    }
    response = requests.post(URL, headers={'Content-Type': 'application/json'}, data=json.dumps(data))
    print(json.dumps(response.json(), indent=4))

get_metadata(NFT_ADDRESS)
`,
      docs: "https://docs.helius.xyz/solana-apis/token-metadata-api",
      tags: ["DAS", "RPC"]
    },
    {
      name: "Identify an NFT's holder",
      description: "You are provided the mint address of a token. Make use of Helius' services to identify the holder of the provided NFT token address.",
      difficulty: 1,
      api: 'nft_holder',
      solved: false,
      type: 'nft',
      example_answer: "T1d3crwf5cYLcVU5ojNRgJbJUXJta2uBgbtev2xWLAW",
      hints: ["There are multiple ways to determine the owner, the provided boiler plate code here uses DAS, however the NFT Events API is also viable albeit less efficient.",
        "You should log the data, regardless of which method you choose, expanding each property to see what lies within.",
        "If you're using DAS, the path to locate the holder of the NFT is data.result.ownership.owner."],
      js_code:
        `const url = "https://rpc.helius.xyz/?api-key=<api_key>"

const getAsset = async () => {
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
        id: 'F9Lw3ki3hJ7PF9HQXsBzoY8GyE6sPoEZZdXJBsTTD2rk'
      },
    }),
  });
  const { result } = await response.json();
  console.log("Asset: ", result);
};

getAsset();`,
      py_code:
        `import os
import requests
import json

API_KEY = os.getenv('API_KEY')
URL = f"https://rpc.helius.xyz/?api-key={API_KEY}"
ASSET_ID = 'F9Lw3ki3hJ7PF9HQXsBzoY8GyE6sPoEZZdXJBsTTD2rk'

def get_asset(asset_id):
    data = {
        "jsonrpc": "2.0",
        "id": "my-id",
        "method": "getAsset",
        "params": {
            "id": asset_id
        }
    }
    response = requests.post(URL, headers={'Content-Type': 'application/json'}, data=json.dumps(data))
    print(json.dumps(response.json().get('result'), indent=4))

get_asset(ASSET_ID)
`,
      docs: "https://docs.helius.xyz/solana-compression/digital-asset-standard-das-api/get-asset",
      tags: ["DAS", "RPC"]
    },
    {
      name: "Transaction Epoch",
      description: "You are provided the signature of a transaction. Make use of Helius' services to identify the time at which the provided transaction took place.",
      difficulty: 1,
      api: 'epoch_tx',
      solved: false,
      type: 'tx',
      example_answer: "1633112174",
      hints: ["You can log the data returned from the endpoint in order to find out the path that has the epoch of the transaction.",
        "You'll need to log the 1st index, or data[0] if using the /v0/transactions/ endpoint as it is returned as an array.",
        "If you're using the /v0/transactions/ endpoint, the path to locate the holder of the NFT is data[0].timestamp."],
      js_code:
        `const url = "https://api.helius.xyz/v0/transactions/?api-key=<your-key>";

const parseTransaction = async () => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      transactions: ["your-txn-id-here"],
    }),
  });

  const data = await response.json();
  console.log("parsed transaction: ", data);
};

parseTransaction()
`,
      py_code:
        `import os
import requests
import json

API_KEY = os.getenv('API_KEY')
URL = f"https://api.helius.xyz/v0/transactions/?api-key={API_KEY}"
TRANSACTION_ID = 'your-txn-id-here'

def parse_transaction(txn_id):
    data = {
        "transactions": [txn_id],
    }
    response = requests.post(URL, headers={'Content-Type': 'application/json'}, data=json.dumps(data))
    print(json.dumps(response.json(), indent=4))

parse_transaction(TRANSACTION_ID)
`,
      docs: "https://docs.helius.xyz/solana-apis/enhanced-transactions-api/parse-transaction-s",
      tags: ["ENHANCED API"]
    },
    {
      name: "First Transaction",
      description: "You are provided a wallet address. Make use of Helius' services in order to retrieve the first transaction signature of the provided wallet.",
      difficulty: 2,
      api: "first_tx",
      solved: false,
      type: "wallet",
      example_answer: "42JQVGf7V6LzAMizHEMk8tJ1HPozrBmB4dCxNgU14CSx8sXLxWau3JsS2NcM8vnDYK2XSXXhnNSVN8zfnBqiqGDd",
      hints: ["There are two endpoints you can use for this question, one being the provided /v0/addresses/<address>/transactions and the other by querying directly through an RPC.",
        "Depending on the wallet provided, you may need to paginate through all their transactions.",
        "If you're using the RPC, a quick way to check would be to use the before and after properties, if no transactions occur before your answer for the transaction, it is the first transaction to take place!"],
      js_code:
        `const url = "https://api.helius.xyz/v0/addresses/<address>/transactions?api-key=<your-key>";

const parseTransactions = async () => {
  const response = await fetch(url);

  const data = await response.json();

  console.log("parsed transactions: ", data);
};

parseTransactions()
`,
      py_code:
        `import os
import requests
import json

API_KEY = os.getenv('API_KEY')
ADDRESS = '<address>'
URL = f"https://api.helius.xyz/v0/addresses/{ADDRESS}/transactions?api-key={API_KEY}"

def parse_transactions():
    response = requests.get(URL)
    print(json.dumps(response.json(), indent=4))

parse_transactions()
`,
      docs: "https://docs.helius.xyz/solana-apis/enhanced-transactions-api/parsed-transaction-history",
      tags: ["RPC"]
    },
    {
      name: "Get the current Epoch",
      description: "Make use of the getEpochInfo RPC method to get information about the current epoch.",
      difficulty: 1,
      api: "find_epoch",
      solved: false,
      type: "RPC",
      example_answer: "420",
      hints: ["Look for the epoch variable in the response. Find more information in the docs: https://docs.solana.com/api/http#getepochinfo",],
      js_code:
        `const url = "https://mainnet.helius-rpc.com/?api-key=<api_key>"

const getEpochInfo = async () => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "jsonrpc": "2.0", "id": 1,
    "method": "getEpochInfo"
    }),
  });
  const { result } = await response.json();
  console.log(result)
};
getEpochInfo()`,
      py_code:
        `import os
import requests
import json

API_KEY = os.getenv('API_KEY')
URL = f"https://mainnet.helius-rpc.com/?api-key={API_KEY}"

def get_epoch_info():
    data = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getEpochInfo"
    }
    response = requests.post(URL, headers={'Content-Type': 'application/json'}, data=json.dumps(data))
    print(json.dumps(response.json().get('result'), indent=4))

get_epoch_info()
`,
      docs: "https://docs.solana.com/api/http#getepochinfo",
      tags: ["RPC"]
    },
    {
      name: "Find the Genesis Hash",
      description: "Make use of the getGenesisHash RPC method to get the genesis hash",
      difficulty: 1,
      api: "find_genesis",
      solved: false,
      type: null,
      example_answer: "GH7ome3EiwEr7tu9JuTh2dpYWBJK3z69Xm1ZE3MEE6JC",
      hints: ["Look for the result variable in the method response.", "You can find more info in the Solana docs: https://docs.solana.com/api/http#getgenesishash"],
      js_code:
        `
const url = "https://mainnet.helius-rpc.com/?api-key=<api_key>"

const getGenesisHash = async () => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "jsonrpc":"2.0","id":1, "method":"getGenesisHash"
    }),
  });
  const { result } = await response.json();
  console.log(result)
};
getGenesisHash()`,
      py_code:
        `import os
import requests
import json

API_KEY = os.getenv('API_KEY')
URL = f"https://mainnet.helius-rpc.com/?api-key={API_KEY}"

def get_genesis_hash():
    data = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getGenesisHash"
    }
    response = requests.post(URL, headers={'Content-Type': 'application/json'}, data=json.dumps(data))
    print(json.dumps(response.json().get('result'), indent=4))

get_genesis_hash()
`,
      docs: "https://docs.solana.com/api/http#getgenesishash",
      tags: ["RPC"]
    },
    {
      name: "Find the Latest Slot",
      description: "Make use of the getLatestBlockhash/getSlot RPC methods to find the latest slot. As slots are constantly changing, please round younr answer to the closest 1000 when submitting.",
      difficulty: 1,
      api: "latest_slot",
      solved: false,
      type: null,
      example_answer: "208053152",
      hints: ["Look for the 'context' property in the response.", "Run the example code and look for the 'slot' property within the aforementioned 'context' property."],
      info: 'This (getLatestBlockhash) is vital in creating transactions!',
      js_code:
        `
const url = "https://mainnet.helius-rpc.com/?api-key=<api_key>"

const getGenesisHash = async () => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "jsonrpc":"2.0","id":1, "method":"getGenesisHash"
    }),
  });
  const { result } = await response.json();
  console.log(result)
};
getGenesisHash()`,
      py_code: null
      ,
      docs: "https://docs.solana.com/api/http#getlatestblockhash",
      tags: ["RPC"]
    },
    {
      name: "TPS on Solana",
      description: "Make use of the getRecentPerformanceSamples RPC method to find the current TPS on Solana. As TPS is constantly changing, please round younr answer to the closest 1000 when submitting.",
      difficulty: 2,
      api: "find_tps",
      solved: false,
      type: null,
      example_answer: "3000",
      hints: ["Log the response of the getRecentPerformanceSamples method!"],
      info: 'This (getLatestBlockhash) is vital in creating transactions!',
      js_code:
        `
import { Connection } from "@solana/web3.js";

const getTPS = async () => {
  const connection = new Connection(
    "https://mainnet.helius-rpc.com/?api-key=<api-key>",
    "confirmed"
  );

  let recentPerformanceSamples = await connection.getRecentPerformanceSamples();
  return recentPerformanceSamples
};
getTPS()
`,
      py_code: null
      ,
      docs: "https://docs.solana.com/api/http#getrecentperformancesamples",
      tags: ["RPC"]
    },
  ]
  const [questions, setQuestions] = useState(originalQuestions)
  const [userData, setUserData] = useState()
  const [mintedAward, setMintedAward] = useState(false);
  const sessionData: any = useSession();
  const [completed, setCompleted] = useState([]);
  const [track, setTrack] = useState();

  useEffect(() => {
    async function saveProgress() {
      const { data } = await axios.post(`/api/user_progress`,
        {
          user: sessionData.data.publicKey,
          completed_questions: completed,
          progress: progress,
          minted_award: mintedAward
        });
    }

    if (sessionData?.data?.publicKey) {
      saveProgress()
    }

  }, [completed, mintedAward])


  useEffect(() => {

    function updateQuestions(completed_questions: any) {

      let updatedQuestions = originalQuestions;
      for (let i = 0; i < completed_questions.length; i++) {
        const index = originalQuestions.findIndex((e: any) => e.api === completed_questions[i]);
        if (index !== -1) {
          updatedQuestions.splice(index, 1);
        }
      }
      setQuestions(updatedQuestions)
    }

    async function retrieveProgress() {

      const { data } = await axios.post("/api/retrieve_progress",
        {
          user: sessionData?.data?.publicKey
        })
      if (data[0]?.user) {
        setProgress(data[0].progress)
        setCompleted(data[0].completed_questions)
        updateQuestions(data[0].completed_questions)
        setMintedAward(data[0].minted_award)
        console.log(mintedAward, data[0].minted_award)
        setUserData(data[0])
        setMintedAward(data[0].minted_award)
      }
      else {
        setProgress(0)
        setQuestions(originalQuestions)
      }
    }

    if (sessionData?.data?.publicKey) {
      retrieveProgress()
    }
    else {
      setProgress(0)
      setQuestions(originalQuestions)
    }

  }, [sessionData?.data?.publicKey])



  return (
    <main className={`flex scrollbar w-full h-screen flex-col items-center justify-between bg-black text-zinc-200 scrollbar ${inter.className}`}>

      <Head>
        <title>Catalyse Your Progress!</title>
        <meta name="description" content="An educational app that teaches users about Helius and Solana development." key="desc" />
        <meta property="og:title" content="Pyre" />
        <meta
          property="og:description"
          content="An educational app that teaches users about Helius and Solana development."
        />
        <meta
          property="og:image"
          content="https://pyre.helius.xyz/pyre-landing.png"
        />
        <meta
          property="og:url"
          content="https://www.pyre.helius.xyz/"
        />
        <meta
          name="twitter:site"
          content="@heliuslabs"
        />
        <meta
          name="twitter:title"
          content="Pyre"
        />
        <meta
          name="twitter:description"
          content="An educational app that teaches users about Helius and Solana development."
        />
        <meta
          name="twitter:url"
          content="https://www.pyre.helius.xyz/"
        />
        <meta
          name="twitter:image"
          content="https://www.pyre.helius.xyz/pyre-landing.png"
        />

      </Head>

      {selectedComponent === "Landing" ? (
        <>

          <div className='flex flex-row justify-between w-full items-center p-4 border-b border-zinc-900'>
            <div className='flex text-zinc-200 text-2xl font-bold xl:px-6 space-x-4 select-none'>
              <Image className='' alt="Helius" src="/helius.svg" width={24} height={24}></Image>
              <span>
                PYRE
              </span>
            </div>


            <div className='flex'>
              <SignMessage />
            </div>

          </div>

          <Landing setSelectedComponent={setSelectedComponent} />
        </>
      ) : (
        (selectedComponent === "QuestionMenu") ? (
          <>
            {
              (questions.length == 0) ?
                <End originalQuestions={originalQuestions} mintedAward={mintedAward} setMintedAward={setMintedAward} setSelectedComponent={setSelectedComponent} progress={progress}></End>
                : (
                  (track) ?
                    <QuestionMenu completed={completed} originalQuestions={originalQuestions} sessionData={sessionData} track={track} setTrack={setTrack} userData={userData} questions={questions} progress={progress} setProgress={setProgress} setQuestion={setQuestion} setSelectedComponent={setSelectedComponent} />
                    :
                    <Tracks originalQuestions={originalQuestions} setTrack={setTrack} progress={progress} setProgress={setProgress} setQuestion={setQuestion} setSelectedComponent={setSelectedComponent} />
                )
            }
          </>
        ) :
          <Question originalQuestions={originalQuestions} completed={completed} setCompleted={setCompleted} question={question} questions={questions} progress={progress} setQuestions={setQuestions} setProgress={setProgress} setSelectedComponent={setSelectedComponent} />

      )}

    </main>
  )
}
