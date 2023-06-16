import Image from "next/image"
import ProgressBar from "./ProgressBar"

export default function AppBar({ setSelectedComponent, progress, component }: any) {

    return (
        <div className='absolute w-full top-0 sticky z-10 px-2 xl:px-8 pb-2 py-4 bg-zinc-950'>
            <div className='flex flex-row justify-center items-center space-x-2 xl:space-x-8 select-none'>
                <button
                    className="flex opacity-70 hover:opacity-100 duration-200 font-bold justify-center rounded-full overflow-show"
                    // onClick={()=>(component=="Demo")?(setSelectedComponent("Landing")):(component=="Menu")?(setSelectedComponent("Demo")):((setSelectedComponent("Menu")))}
                    onClick={() => (component == "QuestionMenu") ? (setSelectedComponent("Landing")) : progress==0?(setSelectedComponent("Landing")):(setSelectedComponent("QuestionMenu"))}

                >
                    <div className='flex items-center justify-center w-6 h-4'>
                        <Image className='' alt="back" src="/back.svg" width={16} height={16}></Image>
                    </div>
                </button>

                <ProgressBar progress={progress}></ProgressBar>
            </div>
        </div>
    )
}

// left and right section like codecademy, on the left is super detailed step by step for description, with hints
// on the right is a code snippet of the base boiler plate code they need, on the bottom of the right side is the text input for their final answer
// have links to gitbook, postman if possible