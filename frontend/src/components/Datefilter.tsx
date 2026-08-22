type DatefilterProps = {
    bookMarkfilter: (id: string) => void;
    activeFilter?: string;
};

export default function Datefilter({
    bookMarkfilter,
    activeFilter = "all",
}: DatefilterProps) {
    const tabs = [
        { id: "all", label: "ALL" },
        { id: "today", label: "TODAY" },
        { id: "seven", label: "LAST 7 DAYS" },
        { id: "thirty", label: "LAST 30 DAYS" },
    ];

    return (
        <div className="flex items-center gap-1 overflow-x-auto py-1 border-b border-hairline scrollbar-none">
            <span className="text-[11px] font-mono text-mute mr-2 uppercase shrink-0">
                TIMEFRAME:
            </span>
            {tabs.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                    <button
                        key={tab.id}
                        id={tab.id}
                        onClick={() => bookMarkfilter(tab.id)}
                        className={`px-3 py-1 text-xs font-mono rounded-[4px] transition-all cursor-pointer shrink-0 ${
                            isActive
                                ? "bg-surface-elevated text-ink border border-hairline-strong font-bold"
                                : "text-mute hover:text-ink hover:bg-surface-soft border border-transparent"
                        }`}
                    >
                        [{tab.label}]
                    </button>
                );
            })}
        </div>
    );
}