import Landing from '../components/Landing';
import QuestionMenu from '../components/QuestionMenu';
import Question from '../components/Question';
import dynamic from "next/dynamic";
import axios from 'axios';
import Guide from '../components/Guide'
import Image from 'next/image';

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from "react";

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
      hints: ["You will have to paginate through the wallet's balance!",
              "In order to paginate you will need to make use of the 'page' property returned!",
              "As you paginate through the wallet's balance, if a query does not return the maximum, 1000 tokens back, you'll have found every NFT a wallet has!"],
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

  console.log(data[0].offChainMetadata.metadata.image);
};
      `,
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
      hints: ["You can log the data returned from the endpoint in order to find out the path that has the URL for the image.",
      "You'll need to log the 1st index, or data[0] if using the token-metadata endpoint as it is returned as an array.",
      "If the link you've provided is not accepted, try querying for the link found in the offChainMetadata property of the data returned."],
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
      hints: ["You can log the data returned from the endpoint in order to find out the path that has the URL for the image.",
      "You'll need to log the 1st index, or data[0] if using the token-metadata endpoint as it is returned as an array.",
      "If the link you've provided is not accepted, try querying for the link found in the offChainMetadata property of the data returned."],
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
      hints: ["You can log the data returned from the endpoint in order to find out the path that has the URL for the image.",
      "You'll need to log the 1st index, or data[0] if using the token-metadata endpoint as it is returned as an array.",
      "If the link you've provided is not accepted, try querying for the link found in the offChainMetadata property of the data returned."],
      code: `
const url = "https://api.helius.xyz/v0/addresses/<signature>/transactions?api-key=<your-key>";

const parseTransactions = async () => {
  const response = await fetch(url);

  const data = await response.json();

  console.log("parsed transactions: ", data);
};
      `,
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
      hints: ["Make sure the data input is rounded to 2 decimal places.",
      "You can call the function .toFixed(2) to round to 2 decimal places.",
      "If the link you've provided is not accepted, try querying for the link found in the offChainMetadata property of the data returned."],
      code: `
const getBalance = async (context) => {
  const url = "https://api.helius.xyz/v0/addresses/<address>/balances?api-key=<api-key>"

  const { data } = await axios.get(url)

  console.log((data);
};
      `,
      tags: ["ENHANCED API"]
    },
    {
      name: "Sale activity of an NFT",
      description: "You are provided a token address. Make use of Helius's services in order to find the number of times it has been sold since being minted.",
      difficulty: 1,
      api: "times_sold",
      solved: false,
      type: "nft",
      example_answer: "5",
      hints: ["Make sure the data input is rounded to 2 decimal places.",
      "You can call the function .toFixed(2) to round to 2 decimal places.",
      "If the link you've provided is not accepted, try querying for the link found in the offChainMetadata property of the data returned."],
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
    <main className={`flex w-full h-screen flex-col items-center justify-between font-sans bg-zinc-950 text-zinc-200 no-scrollbar`}>
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
