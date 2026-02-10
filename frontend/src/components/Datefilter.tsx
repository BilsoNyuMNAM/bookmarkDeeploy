type DatefilterProps = {
    bookMarkfilter?: Function
}

export default function Datefilter({ bookMarkfilter }: DatefilterProps) {

    const btnClass = "border-2 border-black px-4 py-2 text-xs font-black tracking-widest bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer uppercase";

    return (
        <div className="mt-8 border-t-4 border-black pt-6" >
            <div className="flex gap-2 items-center mb-4">
                <div className="p-1 bg-black text-white">
                    <img src="./calender.svg" className="h-4 w-4 invert">
                    </img>
                </div>
                <span className="text-sm font-black tracking-widest uppercase">Filter by Date</span>
            </div>
            <div className="flex flex-wrap gap-3" onClick={(e) => { bookMarkfilter?.(e) }}>
                <button className={btnClass} id="all">All</button>
                <button className={btnClass} id="today">Today</button>
                <button className={btnClass} id="seven">Last 7 Days</button>
                <button className={btnClass} id="thirty">Last 30 Days</button>
                <button className={btnClass} id="older">Older</button>
            </div>
        </div>
    )
}