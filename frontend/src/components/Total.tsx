type TotalProps = {
    filterBookmark: any[];
    totalCount?: number;
};

export default function Total({ filterBookmark, totalCount }: TotalProps) {
    const count = filterBookmark ? filterBookmark.length : 0;
    const isFiltered = totalCount !== undefined && totalCount !== count;

    return (
        <div className="flex items-center gap-2 text-xs font-mono text-mute">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
                [ TOTAL: <strong className="text-ink">{count}</strong>
                {isFiltered ? ` OF ${totalCount}` : ""} BOOKMARKS ]
            </span>
        </div>
    );
}