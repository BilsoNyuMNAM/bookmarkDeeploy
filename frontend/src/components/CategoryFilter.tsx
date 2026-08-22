type CategoryFilterProps = {
    categories: Array<{ id: number; name: string; count?: number }>;
    selectedCategoryId: number | null;
    onSelectCategory: (id: number | null) => void;
};

export default function CategoryFilter({
    categories,
    selectedCategoryId,
    onSelectCategory,
}: CategoryFilterProps) {
    if (!categories || categories.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center gap-1.5 py-1">
            <span className="text-[11px] font-mono text-mute mr-1 uppercase">
                CATEGORY:
            </span>
            <button
                onClick={() => onSelectCategory(null)}
                className={`px-2.5 py-1 text-xs font-mono rounded-[4px] transition-all cursor-pointer ${
                    selectedCategoryId === null
                        ? "bg-surface-elevated text-ink border border-hairline-strong font-bold"
                        : "text-mute hover:text-ink hover:bg-surface-soft border border-hairline"
                }`}
            >
                [ ALL ]
            </button>
            {categories.map((cat) => {
                const isSelected = selectedCategoryId === cat.id;
                return (
                    <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className={`px-2.5 py-1 text-xs font-mono rounded-[4px] transition-all cursor-pointer ${
                            isSelected
                                ? "bg-surface-elevated text-ink border border-hairline-strong font-bold"
                                : "text-mute hover:text-ink hover:bg-surface-soft border border-hairline"
                        }`}
                    >
                        [{cat.name.toUpperCase()}]
                    </button>
                );
            })}
        </div>
    );
}