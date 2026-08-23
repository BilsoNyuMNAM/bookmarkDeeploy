type CategoryFilterProps = {
    originalBookmarks: Array<{
        id: number;
        category?: {
            CategoryName: string;
        };
    }>;
    setSelectCategory: (category: string | null) => void;
};

export default function CategoryFilter({
    originalBookmarks,
    setSelectCategory,
}: CategoryFilterProps) {
    const categoryNames = Array.from( //1. make a set to only store unique categoryName, 2. convert the set to an array using Array.from() t
        new Set(
            originalBookmarks
                ?.map((item) => item.category?.CategoryName)
                .filter((name): name is string => Boolean(name))
        )
    );

    return (
        <div className="flex items-center gap-2">
            <select
                onChange={(e) => setSelectCategory(e.target.value || null)}
                className="bg-canvas text-ink text-xs px-2.5 py-2 border border-hairline rounded-[4px] focus:outline-none focus:border-hairline-strong font-mono cursor-pointer"
            >
                <option value="">ALL CATEGORIES </option>
                {categoryNames.map((name) => (
                    <option key={name} value={name}>
                        {name.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}