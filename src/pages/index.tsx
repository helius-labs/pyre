import { useState } from 'react';
import Landing from '../components/Landing';
import Menu from '../components/Menu';
import Question from '../components/Question';

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState('Landing')
  const [question, setQuestion] = useState()

  let questions = [
    {
      name: "Find number of NFTs held",
      description: "Query a Helius service to determine the number of NFTs held by the provided wallet.",
      difficulty: 3,
      tags: ["DAS", "RPC"]
    },
    {
      name: "Find image URL of NFT",
      description: "You are provided a token address, you will need to identify a suitable endpoint from Helius to query, with the token as an input, you'll need to extract the URL pointing to the image, for this question the answer should start with 'https://madlads.s3.us-west-2.amazonaws.com/images/' ",
      difficulty: 2,
      tags: ["NFT API", "DAS", "RPC"]
    },
    {
      name: "Find owner of NFT",
      description: "You are provided a token address, you will need to identify a suitable endpoint from Helius to query, with the token as an input, you'll need to extract the URL pointing to the image, for this question the answer should start with 'https://madlads.s3.us-west-2.amazonaws.com/images/' ",
      difficulty: 3,
      tags: ["NFT API", "DAS"]
    },
    {
      name: "Identify time of transaction",
      description: "You are provided a token address, you will need to identify a suitable endpoint from Helius to query, with the token as an input, you'll need to extract the URL pointing to the image, for this question the answer should start with 'https://madlads.s3.us-west-2.amazonaws.com/images/' ",
      difficulty: 2,
      tags: ["ENHANCED API"]
    },
    {
      name: "Find number of NFTs held",
      description: "You are provided a wallet address, you will need to identify a suitable endpoint from Helius to query, allowing you to answer the question.",
      difficulty: 1,
      tags: ["NFT API", "DAS"]
    },
    {
      name: "Find image URL of NFT",
      description: "You are provided a token address, you will need to identify a suitable endpoint from Helius to query, with the token as an input, you'll need to extract the URL pointing to the image, for this question the answer should start with 'https://madlads.s3.us-west-2.amazonaws.com/images/' ",
      difficulty: 2,
      tags: ["NFT API", "DAS", "RPC"]
    },
    {
      name: "Find owner of NFT",
      description: "You are provided a token address, you will need to identify a suitable endpoint from Helius to query, with the token as an input, you'll need to extract the URL pointing to the image, for this question the answer should start with 'https://madlads.s3.us-west-2.amazonaws.com/images/' ",
      difficulty: 3,
      tags: ["NFT API", "DAS"]
    },
    {
      name: "Identify time of transaction",
      description: "You are provided a token address, you will need to identify a suitable endpoint from Helius to query, with the token as an input, you'll need to extract the URL pointing to the image, for this question the answer should start with 'https://madlads.s3.us-west-2.amazonaws.com/images/' ",
      difficulty: 2,
      tags: ["NFT API", "DAS"]
    },
  ]


  return (
    <main className={`flex w-full h-screen flex-col items-center justify-between font-sans `}>
      {selectedComponent === "Landing" ? (
        <Landing setSelectedComponent={setSelectedComponent} />
      ) : (
        selectedComponent === "Menu" ? (
          <Menu questions={questions} setQuestion={setQuestion} setSelectedComponent={setSelectedComponent} />
        ) : (
          <Question question={question} setSelectedComponent={setSelectedComponent} />
        )
      )}
    </main>
  )
}
