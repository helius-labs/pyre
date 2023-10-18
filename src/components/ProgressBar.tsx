export default function ProgressBar({ current, total }: any) {

    return (
        <div className="flex relative w-full h-4 bg-zinc-800 rounded-lg z-0">
            <div style={{ width: `${(current/total)*100}%` }}
                className={`flex duration-200 relative h-4 items-center rounded-lg bg-orange-400 max-w-full justify-center`}>
            </div>
        </div>
    )
}