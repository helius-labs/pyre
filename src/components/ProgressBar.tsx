export default function ProgressBar({ progress }: any) {

    return (
        <div className="flex relative w-full h-4 bg-zinc-300 dark:bg-zinc-900 rounded-lg z-0">
            <div style={{ width: `${progress * 8}%` }}
                className={`flex duration-200 relative h-4 items-center rounded-lg bg-orange-400 max-w-full justify-center`}>
            </div>
        </div>
    )
}