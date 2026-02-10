


export default function Total({ filterBookmark }: { filterBookmark: any }) {
    return (
        <div>
            <span className="font-black text-xl uppercase tracking-widest border-b-4 border-yellow-300">
                Total: {filterBookmark.length}
            </span>
        </div>
    )
}