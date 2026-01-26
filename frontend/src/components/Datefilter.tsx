

export default function Datefilter({bookMarkfilter}:{bookMarkfilter:Function}){
    
    return(
        <div className="mt-3 border-4 border-black p-4" >
            <div className="flex gap-2 items-center mb-2">
                <div>
                    <img src="./calender.svg" className="h-6 w-6">  
                    </img>
                </div>
                <span className="text-xs tracking-widest font-bold">FILTER BY DATE</span>
            </div>
            <div className="flex flex-wrap gap-3"  onClick={(e)=>{bookMarkfilter(e)}}>
                <button className="border-2 border-black px-4 py-2 text-xs font-bold tracking-widest transition-colors bg-black text-white" id="all">ALL</button>
                <button className="border-2 border-black px-4 py-2 text-xs font-bold tracking-widest transition-colors bg-white hover:bg-gray-100" id="today">TODAY</button>
                <button className="border-2 border-black px-4 py-2 text-xs font-bold tracking-widest transition-colors bg-white hover:bg-gray-100" id="seven">LAST 7 DAYS</button>
                <button className="border-2 border-black px-4 py-2 text-xs font-bold tracking-widest transition-colors bg-white hover:bg-gray-100" id="thirty">LAST 30 DAYS</button>
                <button className="border-2 border-black px-4 py-2 text-xs font-bold tracking-widest transition-colors bg-white hover:bg-gray-100">OLDER</button>
            </div>
        </div>
    )
}