import Landing from '../components/Landing';
import Menu from '../components/Menu';
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
    console.log(progress)
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
    <main className={`flex w-full h-screen flex-col items-center justify-between font-sans bg-zinc-950 text-zinc-200`}>
        <title>Pyre</title>
      {selectedComponent === "Landing" ? (
        <>

          <div className='flex flex-row justify-between w-full items-center p-2'>
            <div className='flex text-zinc-200 text-2xl font-bold px-6 space-x-4'>
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
        (selectedComponent === "Menu") ? (
          <Menu userData={userData} questions={questions} progress={progress} setProgress={setProgress} setQuestion={setQuestion} setSelectedComponent={setSelectedComponent} />
        ) : (
          <Question question={question} questions={questions} progress={progress} setQuestions={setQuestions} setProgress={setProgress} setSelectedComponent={setSelectedComponent} />
        )
      )}

    </main>
  )
}
