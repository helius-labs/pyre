import { useState } from 'react';
import Landing from '../components/Landing';
import Menu from '../components/Menu';
import Question from '../components/Question';

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState('Landing')


  let questions = [
    {
      name: "Find the number of NFTs in a wallet",
      description: "You are provided a wallet address, you will need to identify a suitable endpoint from Helius to query, allowing you to answer the question.",
      difficulty: 1,
      tags: ["NFT API", "DAS"]
    },
    {
      name: "Steal PFPs",
      description: "You are provided a token address, you will need to identify a suitable endpoint from Helius to query, with the token as an input, you'll need to extract the URL pointing to the image, for this question the answer should start with 'https://madlads.s3.us-west-2.amazonaws.com/images/' ",
      difficulty: 2,
      tags: ["NFT API", "DAS"]
    },
    {
      name: "Steal PFPs",
      description: "You are provided a token address, you will need to identify a suitable endpoint from Helius to query, with the token as an input, you'll need to extract the URL pointing to the image, for this question the answer should start with 'https://madlads.s3.us-west-2.amazonaws.com/images/' ",
      difficulty: 3,
      tags: ["NFT API", "DAS"]
    },
    {
      name: "Steal PFPs",
      description: "You are provided a token address, you will need to identify a suitable endpoint from Helius to query, with the token as an input, you'll need to extract the URL pointing to the image, for this question the answer should start with 'https://madlads.s3.us-west-2.amazonaws.com/images/' ",
      difficulty: 2,
      tags: ["NFT API", "DAS"]
    },
    {
      name: "Steal PFPs",
      description: "You are provided a token address, you will need to identify a suitable endpoint from Helius to query, with the token as an input, you'll need to extract the URL pointing to the image, for this question the answer should start with 'https://madlads.s3.us-west-2.amazonaws.com/images/' ",
      difficulty: 3,
      tags: ["NFT API", "DAS"]
    },
    {
      name: "Find the number of NFTs in a wallet",
      description: "You are provided a wallet address, you will need to identify a suitable endpoint from Helius to query, allowing you to answer the question.",
      difficulty: 1,
      tags: ["NFT API", "DAS"]
    },
    {
      name: "Steal PFPs",
      description: "You are provided a token address, you will need to identify a suitable endpoint from Helius to query, with the token as an input, you'll need to extract the URL pointing to the image, for this question the answer should start with 'https://madlads.s3.us-west-2.amazonaws.com/images/' ",
      difficulty: 2,
      tags: ["NFT API", "DAS"]
    },
    {
      name: "Find the number of NFTs in a wallet",
      description: "You are provided a wallet address, you will need to identify a suitable endpoint from Helius to query, allowing you to answer the question.",
      difficulty: 1,
      tags: ["NFT API", "DAS"]
    },
    {
      name: "Steal PFPs",
      description: "You are provided a token address, you will need to identify a suitable endpoint from Helius to query, with the token as an input, you'll need to extract the URL pointing to the image, for this question the answer should start with 'https://madlads.s3.us-west-2.amazonaws.com/images/' ",
      difficulty: 2,
      tags: ["NFT API", "DAS"]
    },
    {
      name: "Steal PFPs",
      description: "You are provided a token address, you will need to identify a suitable endpoint from Helius to query, with the token as an input, you'll need to extract the URL pointing to the image, for this question the answer should start with 'https://madlads.s3.us-west-2.amazonaws.com/images/' ",
      difficulty: 3,
      tags: ["NFT API", "DAS"]
    },
    {
      name: "Steal PFPs",
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
          <Menu questions={questions} setSelectedComponent={setSelectedComponent} />
        ) : (
          <Question setSelectedComponent={setSelectedComponent} />
        )
      )}
    </main>
  )
}
