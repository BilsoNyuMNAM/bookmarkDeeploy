

export default function Total({ filterBookmark }: { filterBookmark: any }){
        return(
        <div>
            <span className="font-bold text-xs tracking-widest">
                Total:{filterBookmark.length}
                
            </span>
        </div>
    )
}