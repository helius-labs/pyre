import { useState } from 'react';
import Landing from '../components/Landing';
import Menu from '../components/Menu';
import Question from '../components/Question';

interface Questions {
  name: string,
  description: string,
  difficulty: number,
  api: string,
  solved : boolean,
  tags: string[]
}

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState('Landing')
  const [question, setQuestion] = useState()
  const [progress, setProgress] = useState(0)

  const [questions, setQuestions] = useState([
    {
      name: "Find the number of NFTs held by a wallet",
      description: "Query a Helius service to determine the number of NFTs held by the provided wallet.",
      difficulty: 1,
      api: 'nfts_held',
      solved: false,
      tags: ["DAS", "RPC"]
    },
    {
      name: "Extract the image URL of a NFT",
      description: "Make use of Helius's services to find the image of an NFT, you'll need to extract the URL pointing to the image from the data.",
      difficulty: 1,
      api: 'nfts_held',
      solved: false,
      tags: ["NFT API", "DAS", "RPC"]
    },
    {
      name: "Identify the NFT's holder",
      description: "Make use of Helius's services to identify the holder of the provided NFT token address.",
      difficulty: 1,
      api: 'nfts_held',
      solved: false,
      tags: ["NFT API", "DAS"]
    },
    {
      name: "Identify the epoch time of a transaction",
      description: "Make use of Helius's services to identify the time at which the provided transaction took place.",
      difficulty: 1,
      api: 'nfts_held',
      solved: false,
      tags: ["ENHANCED API"]
    },
    {
      name: "Find the biggest holder of the BOOGLE NFT collection",
      description: "You are provided a collection ID and you will need to make use of Helius services to get the biggest holder of the BOOGLE collection.",
      difficulty: 2,
      api: 'nfts_held',
      solved: false,
      tags: ["NFT API", "DAS"]
    },
    {
      name: "Mint an NFT",
      description: "Mint an NFT that has the name: 'Helius Quiz NFT'. It can have any toher attributes and use any image.",
      difficulty: 3,
      api: 'nfts_held',
      solved: false,
      tags: ["Basics", "RPC"]
    },
  ])


  return (
    <main className={`flex w-full h-screen flex-col items-center justify-between font-sans bg-neutral-950 text-zinc-200`}>
      {selectedComponent === "Landing" ? (
        <Landing setSelectedComponent={setSelectedComponent} />
      ) : (
        selectedComponent === "Menu" ? (
          <Menu questions={questions} progress={progress} setQuestion={setQuestion} setSelectedComponent={setSelectedComponent} />
        ) : (
          <Question question={question} questions={questions} progress={progress} setQuestions={setQuestions} setProgress={setProgress} setSelectedComponent={setSelectedComponent} />
        )
      )}
    </main>
  )
}
