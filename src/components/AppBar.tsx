import Image from "next/image"
import ProgressBar from "./ProgressBar"

export default function AppBar({ setSelectedComponent, progress, questions, component }: any) {

    return (
        <div className='absolute w-full border-b border-zinc-900 top-0 sticky z-10 px-2 xl:px-8 py-6 bg-zinc-950 items-center'>
            <div className='flex flex-row justify-center items-center space-x-2 xl:space-x-8 select-none'>
                <button
                    className="flex opacity-70 hover:opacity-100 duration-200 font-bold justify-center rounded-full overflow-show"
                    onClick={() => (component == "QuestionMenu") ? (setSelectedComponent("Landing")) : progress==0?(setSelectedComponent("Landing")):(setSelectedComponent("QuestionMenu"))}

                >
                    <div className='flex items-center justify-center w-6 h-4'>
                        <Image className='' alt="back" src="/back.svg" width={16} height={16}></Image>
                    </div>
                </button>

                <ProgressBar current={progress} total={questions.length} ></ProgressBar>
            </div>
        </div>
    )
}