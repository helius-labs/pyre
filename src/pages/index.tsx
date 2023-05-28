import { useState } from 'react';
import Landing from '../components/Landing';
import Menu from '../components/Menu';
import Question from '../components/Question';

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState('Landing')
  console.log(selectedComponent)

  return (
    <main className={`flex w-full h-screen flex-col items-center justify-between p-24 font-sans `}>
      {selectedComponent === "Landing" ? (
          <Landing setSelectedComponent={setSelectedComponent} />
        ) : (
          selectedComponent === "Menu" ? (
            <Menu setSelectedComponent={setSelectedComponent} />
          ) : (
            <Question setSelectedComponent={setSelectedComponent}  />
          )
        )}
    </main>
  )
}
