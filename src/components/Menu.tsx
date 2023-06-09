import AppBar from './AppBar';
import End from './End';


interface Questions {
    name: string,
    description: string,
    difficulty: number,
    tags: string[]
}

export default function Menu({ setSelectedComponent, progress, userData, questions, setQuestion }: any) {

    let questionDIVs: JSX.Element[] = []

    for (let i = 0; i < questions.length; i++) {
        let tags = [];
        for (let x = 0; x < questions[i].tags.length; x++) {
            tags.push(
                <div key={questions[i].tags[x] + i + x} className='flex bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>{questions[i].tags[x]}</div>
            )
        }

        questionDIVs.push(

            <div key={questions[i].api} onClick={() => { setSelectedComponent('Question'); setQuestion(questions[i]) }}
                className={`flex bg-zinc-800 justify-between items-center animate-fade w-full h-max rounded-lg hover:bg-zinc-700 duration-200 cursor-pointer`}>

                <div className='flex rounded-lg xl:w-1/3'>
                <div className='flex flex-col w-10 space-y-2 p-2'>
                    <div className={`flex w-full h-1/3 rounded-md ${(questions[i].difficulty > 2) ? (`bg-orange-500`) : (`bg-zinc-900`)}`}></div>
                    <div className={`flex w-full h-1/3 rounded-md ${(questions[i].difficulty > 1) ? (`bg-orange-500`) : (`bg-zinc-900`)}`}></div>
                    <div className='flex w-full bg-orange-500 h-1/3 rounded-md'></div>
                </div>

                <div className='flex w-max flex-col p-2 gap-1'>
                    <div className='text-lg font-semibold truncate'>{questions[i].name}</div>
                    <div className="flex space-x-2 flex-row text-[10px] tracking-wider leading-5">
                        {tags}
                    </div>
                </div>
                </div>
                {/* <div className='flex h-full w-2/3 py-2 px-3 w-2/3 rounded-r-lg bg-neutral-900 text-zinc-300 font-medium'>
                    <div className=''>{questions[i].description}</div>
                </div> */}

            </div>
        )
    }

    return (


        (questions.length != 0) ? (

            <div className='flex items-center h-full w-full flex-col bg-zinc-950'>


                <AppBar setSelectedComponent={setSelectedComponent} progress={progress} component="Menu" ></AppBar>


                <div className='flex space-y-10 flex-col h-full w-full items-center justify-center'>
                    <div className='flex xl:w-2/3 items-start text-zinc-300 font-semibold text-lg xl:text-3xl py-2 px-4 xl:py-0'>
                        <div className='flex'>
                            Remaining Questions
                        </div>
                    </div>

                    <div className='flex w-full xl:w-2/3 h-max flex-col justify-center items-center gap-4 py-2 px-4 xl:py-0 no-scrollbar'>
                        {questionDIVs}
                    </div>
                </div>
            </div>

        ) : (
            <div className='flex items-center justify-center h-full w-full flex-col bg-zinc-950 xl:space-y-16'>
                <End setSelectedComponent={setSelectedComponent} progress={progress} userData={userData}></End>
            </div>
        )


    )
}