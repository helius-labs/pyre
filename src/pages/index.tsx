import Landing from '../components/Landing';
import Menu from '../components/Menu';
import Question from '../components/Question';
import dynamic from "next/dynamic";
import axios from 'axios';

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
  const [questions, setQuestions] = useState<Questions[]>([
    {
      name: "Find the number of NFTs held by a wallet",
      description: "You are provided a wallet address. Make use of Helius's service to determine the number of NFTs held by the provided wallet.",
      difficulty: 1,
      api: 'nfts_held',
      solved: false,
      type: 'wallet',
      example_answer: "25",
      tags: ["DAS", "RPC"]
    },
    {
      name: "Extract the image URL of a NFT",
      description: "You are provided the mint address of a token. Make use of Helius's services to find the image of an NFT, you'll need to extract the URL pointing to the image from the data.",
      difficulty: 1,
      api: 'image_nft',
      solved: false,
      type: 'nft',
      example_answer: "https://madlads.s3.us-west-2.amazonaws.com/images/8420.png",
      tags: ["NFT API", "DAS", "RPC"]
    },
    {
      name: "Identify the NFT's holder",
      description: "You are provided the mint address of a token. Make use of Helius's services to identify the holder of the provided NFT token address.",
      difficulty: 1,
      api: 'nft_holder',
      solved: false,
      type: 'nft',
      example_answer: "T1d3crwf5cYLcVU5ojNRgJbJUXJta2uBgbtev2xWLAW",
      tags: ["DAS", "RPC"]
    },
    {
      name: "Identify the epoch time of a transaction",
      description: "You are provided the signature of a transaction. Make use of Helius's services to identify the time at which the provided transaction took place.",
      difficulty: 1,
      api: 'epoch_tx',
      solved: false,
      type: 'tx',
      example_answer: "1633112174",
      tags: ["ENHANCED API"]
    },
    {
      name: "Find the first transaction of a wallet",
      description: "You are provided a wallet address. Make use of Helius's services in order to retrieve the first transaction signature of the provided wallet.",
      difficulty: 2,
      api: "first_tx",
      solved: false,
      type: "wallet",
      example_answer: "42JQVGf7V6LzAMizHEMk8tJ1HPozrBmB4dCxNgU14CSx8sXLxWau3JsS2NcM8vnDYK2XSXXhnNSVN8zfnBqiqGDd",
      tags: ["RPC"]
    },
    {
      name: "Find the SOL balance of a wallet",
      description: "You are provided a wallet address. Make use of Helius's services in order to retrieve the wallet's native balance, otherwise known as SOL (data should be inputted rounded to 2 decimal places).",
      difficulty: 1,
      api: "sol_held",
      solved: false,
      type: "wallet",
      example_answer: "25.01",
      tags: ["ENHANCED API"]
    },
    {
      name: "Find the number of times an NFT has been sold.",
      description: "You are provided a token address. Make use of Helius's services in order to find the number of times it has been sold since being minted.",
      difficulty: 1,
      api: "times_sold",
      solved: false,
      type: "nft",
      example_answer: "5",
      tags: ["NFT API"]
    },
    {
      name: "Find the supply of a collection.",
      description: "You are provided a token address. Make use of Helius's services in order to retrieve the token's collection address, and use that in order to figure out the supply of the collection (this does not include burned NFTs).",
      difficulty: 2,
      api: "nft_supply",
      solved: false,
      type: "nft",
      example_answer: "9999",
      tags: ["ENHANCED API", "RPC", "DAS"]
    },
  ])
  const { publicKey } = useWallet();
  const [wallet, setWallet] = useState('')

  useEffect(() => {

    async function saveProgress() {
      const { data } = await axios.post(`/api/user_progress`,
        {
          user: publicKey?.toBase58(),
          questions_remaining: questions,
          progress: progress,
        });
      console.log(data)
    }

    if (publicKey) {
      saveProgress()
    }

  }, [progress])

  return (
    <main className={`flex w-full h-screen flex-col items-center justify-between font-sans bg-neutral-950 text-zinc-200`}>


      {selectedComponent === "Landing" ? (
        <>
            <WalletMultiButtonDynamic className='relative bg-zinc-900 hover:bg-zinc-900 hover:opacity-100 duration-200' />

            <Landing setSelectedComponent={setSelectedComponent} />
        </>
      ) : (
        selectedComponent === "Menu" ? (
          <Menu questions={questions} progress={progress} setProgress={setProgress} setQuestion={setQuestion} setSelectedComponent={setSelectedComponent} />
        ) : (
          <Question question={question} questions={questions} progress={progress} setQuestions={setQuestions} setProgress={setProgress} setSelectedComponent={setSelectedComponent} />
        )
      )}

    </main>
  )
}
