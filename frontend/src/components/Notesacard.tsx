

export default function Notescard(){
    return(
        <div>
            <div  className="border-2 border-black">
                <button></button>
                <div className="p-6">
                    <div className="mb-4 pb-4 border-b-4 border-black">
                        <div >
                            <div className="flex items-start gap-2 mb-2">
                                <div className="w-3 h-3 bg-black mt-1 flex-shrink-0"></div>
                                <span className="text-[10px] tracking-widest font-bold text-gray-500">Category</span>
                            </div>
                            <h3 className="font-bold text-lg tracking-tight leading-tight">Notes Title</h3>
                        </div>
                        
                    </div>
                    <div className="mb-4 text-sm leading-relaxed line-clamp-6 whitespace-pre-line">
                            <p>Notes content/description</p>
                    </div>
                    <div className="pt-3 border-t-2 border-gray-200">
                        <p  className="text-[10px] tracking-widest text-gray-500 font-bold">20.10.2026</p>
                       
                    </div>
                <div></div>
            </div>
        </div>
        </div>
        
    )
}