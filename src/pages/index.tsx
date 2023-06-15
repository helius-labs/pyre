import Landing from '../components/Landing';
import QuestionMenu from '../components/QuestionMenu';
import Question from '../components/Question';
import dynamic from "next/dynamic";
import axios from 'axios';
import Guide from '../components/Guide'
import Image from 'next/image';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from "react";

import { Inter } from 'next/font/google'
 const inter = Inter({ subsets: ['latin'] })

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

interface Questions {
  name: string,
  description: string,
  difficulty: number,
  api: string,
  solved: boolean,
  type: string,
  example_answer: string,
  tags: string[]
}

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState('Landing')
  const [question, setQuestion] = useState()
  const [progress, setProgress] = useState(0)
  const originalQuestions = [
    {
      name: "Number of NFTs held by a wallet",
      description: "You are provided a wallet address. Make use of Helius's service to determine the number of NFTs held by the provided wallet.",
      difficulty: 1,
      api: 'nfts_held',
      solved: false,
      type: 'wallet',
      example_answer: "25",
      hints: ["There are multiple ways to determine the number of NFTs held, using the Balances API, or the more efficient DAS protocol which is what the boiler plate code is based on.",
              "Assuming the wallet provided has fewer NFTs than the limit returned in one query, the answer would simply be the length of the returned NFT array.",
              "You can adjust the limit of NFTs returned! For some wallets you may still need to paginate."],
      code: `
const url = "https://rpc.helius.xyz/?api-key=<api-key>"

const getAssetsByGroup = async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getAssetsByGroup',
        params: {
          groupKey: 'collection',
          groupValue: 'J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w',
          page: 1, // Starts at 1
          limit: 1000,
        },
      }),
    });
    const { result } = await response.json();
    console.log("Assets by Group: ", result.items);
};
      `,
      docs:"https://docs.helius.xyz/solana-rpc-nodes/digital-asset-standard-api/get-assets-by-owner",
      tags: ["DAS", "RPC"]
    },
    {
      name: "Image URL of an NFT",
      description: "You are provided the mint address of a token. Make use of Helius's services to find the image of an NFT, you'll need to extract the URL pointing to the image from the data.",
      difficulty: 1,
      api: 'image_nft',
      solved: false,
      type: 'nft',
      example_answer: "https://madlads.s3.us-west-2.amazonaws.com/images/8420.png",
      hints: ["You can log the data returned from the endpoint in order to find out the path that has the URL for the image.",
      "You'll need to log the 1st index, or data[0] if using the token-metadata endpoint as it is returned as an array.",
      "If the link you've provided is not accepted, try querying for the link found in the offChainMetadata property of the data returned."],
      code: `
const getMetadata = async (context) => {
  const url = "https://api.helius.xyz/v0/token-metadata?api-key=<api-key>"

  const { data } = await axios.post(url, {
      mintAccounts: [context],
      includeOffChain: true,
      disableCache: false,
  });

  console.log(data);
};
      `,
      docs:"https://docs.helius.xyz/solana-apis/token-metadata-api",
      tags: ["DAS", "RPC"]
    },
    {
      name: "Identify an NFT's holder",
      description: "You are provided the mint address of a token. Make use of Helius's services to identify the holder of the provided NFT token address.",
      difficulty: 1,
      api: 'nft_holder',
      solved: false,
      type: 'nft',
      example_answer: "T1d3crwf5cYLcVU5ojNRgJbJUXJta2uBgbtev2xWLAW",
      hints: ["There are multiple ways to determine the owner, the provided boiler plate code here uses DAS, however the NFT Events API is also viable albeit less efficient.",
      "You should log the data, regardless of which method you choose, expanding each property to see what lies within.",
      "If you're using DAS, the path to locate the holder of the NFT is data.result.ownership.owner."],
      code: `
const getAsset = async (token) => {
  const url = "https://rpc.helius.xyz/?api-key=<api-key>"

  const { data } = await axios.post(url, {
      "jsonrpc": "2.0",
      "id": "my-id",
      "method": "getAsset",
      "params": {
          "id": token
      }
  });

  console.log(data)
  return data
};
      `,
      docs:"https://docs.helius.xyz/solana-rpc-nodes/digital-asset-standard-api/get-asset",
      tags: ["DAS", "RPC"]
    },
    {
      name: "Epoch time of a transaction",
      description: "You are provided the signature of a transaction. Make use of Helius's services to identify the time at which the provided transaction took place.",
      difficulty: 1,
      api: 'epoch_tx',
      solved: false,
      type: 'tx',
      example_answer: "1633112174",
      hints: ["You can log the data returned from the endpoint in order to find out the path that has the epoch of the transaction.",
      "You'll need to log the 1st index, or data[0] if using the /v0/transactions/ endpoint as it is returned as an array.",
      "If you're using the /v0/transactions/ endpoint, the path to locate the holder of the NFT is data[0].timestamp."],
      code: `
const url = "https://api.helius.xyz/v0/transactions/?api-key=<your-key>";

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
      `,
      docs:"https://docs.helius.xyz/solana-apis/enhanced-transactions-api/parse-transaction-s",
      tags: ["ENHANCED API"]
    },
    {
      name: "First transaction of a wallet",
      description: "You are provided a wallet address. Make use of Helius's services in order to retrieve the first transaction signature of the provided wallet.",
      difficulty: 2,
      api: "first_tx",
      solved: false,
      type: "wallet",
      example_answer: "42JQVGf7V6LzAMizHEMk8tJ1HPozrBmB4dCxNgU14CSx8sXLxWau3JsS2NcM8vnDYK2XSXXhnNSVN8zfnBqiqGDd",
      hints: ["There are two endpoints you can use for this question, one being the provided /v0/addresses/<address>/transactions and the other by querying directly through an RPC.",
      "Depending on the wallet provided, you may need to paginate through all their transactions.",
      "If you're using the RPC, a quick way to check would be to use the before and after properties, if no transactions occur before your answer for the transaction, it is the first transaction to take place!"],
      code: `
const url = "https://api.helius.xyz/v0/addresses/<address>/transactions?api-key=<your-key>";

const parseTransactions = async () => {
  const response = await fetch(url);

  const data = await response.json();

  console.log("parsed transactions: ", data);
};
      `,
      docs:"https://docs.helius.xyz/solana-apis/enhanced-transactions-api/parsed-transaction-history",
      tags: ["RPC"]
    },
    {
      name: "SOL balance of a wallet",
      description: "You are provided a wallet address. Make use of Helius's services in order to retrieve the wallet's native balance, otherwise known as SOL (data should be inputted rounded to 2 decimal places).",
      difficulty: 1,
      api: "sol_held",
      solved: false,
      type: "wallet",
      example_answer: "25.01",
      hints: ["As the data returned in the Balances API is returned in terms of Lamports, you'll need to divide by 1 billion for an accurate SOL answer.",
      "You can call the native javascript function of variable.toFixed(2) to round your answer to 2 decimal places, necessary for the answer checking.",
      "If you're using the Balances API, the amount of SOL held is contained in the property 'nativeBalance'."],
      code: `
const getBalance = async (context) => {
  const url = "https://api.helius.xyz/v0/addresses/<address>/balances?api-key=<api-key>"

  const { data } = await axios.get(url)

  console.log((data);
};
      `,
      docs:"https://docs.helius.xyz/solana-apis/balances-api",
      tags: ["ENHANCED API"]
    },
    {
      name: "Sale activity of an NFT",
      description: "You are provided a token address. Make use of Helius's services in order to find the number of times it has been sold.",
      difficulty: 1,
      api: "times_sold",
      solved: false,
      type: "nft",
      example_answer: "5",
      hints: ["You can use the NFT Events (Historical Querying) to determine the number of times an NFT has been sold, by changing the account to that of the token's mint address.",
      "Assuming you've applied the NFT_SALE filter, the number of times sold is simply the length of the returned array.",
      "Fiddle around with the options, e.g sources, types, and other properties found on the Gitbook to get a better understanding of this endpoint."],
      code: `
const url = "https://api.helius.xyz/v1/nft-events?api-key=<api-key>"

const getNftEvents = async () => {
    const { data } = await axios.post(url, {
        query: {
            accounts: ["B1rzqj4cEM6pWsrm3rLPCu8QwcXMn6H6bd7xAnk941dU"],
            types: ["NFT_SALE"],
        }
    });

    console.log(data);
};
      `,
      docs:"https://docs.helius.xyz/solana-apis/nft-api/nft-events-historical-querying",
      tags: ["NFT API"]
    },
    
    // {
    //   name: "Supply of a collection",
    //   description: "You are provided a token address. Make use of Helius's services in order to retrieve the token's collection address, and use that in order to figure out the supply of the collection; this does not include burned NFTs (be patient, this question may take a little longer to check).",
    //   difficulty: 2,
    //   api: "nft_supply",
    //   solved: false,
    //   type: "nft",
    //   example_answer: "9999",
    //   tags: ["ENHANCED API", "RPC", "DAS"]
    // },
  ]
  const [questions, setQuestions] = useState<Questions[]>(originalQuestions)
  const { publicKey } = useWallet();
  const [userData, setUserData] = useState()

  let walletConnect = <WalletMultiButtonDynamic className='relative z-10 bg-zinc-900 hover:bg-zinc-900 hover:opacity-100 duration-200 animate-fade' />

  useEffect(() => {

    async function saveProgress() {
      const { data } = await axios.post(`/api/user_progress`,
        {
          user: publicKey?.toBase58(),
          questions_remaining: questions,
          progress: progress,
        });

    }

    if (publicKey) {
      saveProgress()
    }
  }, [progress])


  useEffect(() => {

    async function retrieveProgress() {

      const { data } = await axios.post("/api/retrieve_progress",
        {
          user: publicKey?.toBase58()
        })
      if (data[0]?.user) {
        setProgress(data[0].progress)
        setQuestions(data[0].questions_remaining)
        setUserData(data[0])
      }
      else {
        setProgress(0)
        setQuestions(originalQuestions)
      }
    }

    if (publicKey) {
      retrieveProgress()
    }
    else {
      setProgress(0)
      setQuestions(originalQuestions)
    }

  }, [publicKey])

  return (
    <main className={`flex w-full h-screen flex-col items-center justify-between bg-zinc-950 text-zinc-200 no-scrollbar ${inter.className}`}>
        <title>Pyre</title>
      {selectedComponent === "Landing" ? (
        <>

          <div className='flex flex-row justify-between w-full items-center p-2'>
            <div className='flex text-zinc-200 text-2xl font-bold px-6 space-x-4 select-none'>
              <Image className='' alt="Helius" src="/helius.svg" width={24} height={24}></Image>
              <span>
                PYRE
              </span>
            </div>


            <div className='flex'>
              {walletConnect}
            </div>

          </div>

          <Landing setSelectedComponent={setSelectedComponent} />
        </>
      ) : (
        // selectedComponent === "Guide" ? (
        //   <Guide setSelectedComponent={setSelectedComponent} progress={progress} walletConnect={walletConnect} ></Guide>
        // ) :
        (selectedComponent === "QuestionMenu") ? (
          <QuestionMenu userData={userData} questions={questions} progress={progress} setProgress={setProgress} setQuestion={setQuestion} setSelectedComponent={setSelectedComponent} />
        ) : (
          <Question question={question} questions={questions} progress={progress} setQuestions={setQuestions} setProgress={setProgress} setSelectedComponent={setSelectedComponent} />
        )
      )}

    </main>
  )
}
