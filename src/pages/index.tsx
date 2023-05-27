import { Space_Grotesk } from 'next/font/google'
import Landing from '../components/Landing';

const spaceGrostesk = Space_Grotesk({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`flex w-full h-screen flex-col items-center justify-between p-24 font-sans `}>
      <Landing></Landing>
    </main>
  )
}
