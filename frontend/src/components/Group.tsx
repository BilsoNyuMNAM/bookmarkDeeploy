import Display from "./Display";
import Total from "./Total";
import { useBookmarkFilter } from "../hooks/useBookmarkFilter";
import CategoryFilter from "./CategoryFilter";
import { useState } from "react";
type GroupProps = {
    refresh: number;
    setrefresh: React.Dispatch<React.SetStateAction<number>>;
};
export default function Group({ refresh, setrefresh }: GroupProps) {
    const [selectCategory, setSelectCategory] = useState<string | null>(null);
    const {
        bookMark,
        loading,
        searchQuery,
        setSearchQuery,
        filterBookmark,
    } = useBookmarkFilter(refresh);
    const displayBookmarks = selectCategory
        ? filterBookmark.filter(
              (bookmark) => bookmark.category?.CategoryName === selectCategory
          )
        : filterBookmark;
    return (
        <div className="space-y-6">
            {/* Control Bar: Search & Status */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 border border-hairline bg-surface-soft">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="search bookmarks by title, url, or category..."
                        className="w-full bg-canvas text-ink text-xs px-3 py-2 border border-hairline rounded-[4px] focus:outline-none focus:border-hairline-strong placeholder:text-stone font-mono"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-mute hover:text-ink cursor-pointer"
                        >
                            [x]
                        </button>
                    )}
                </div>
                <CategoryFilter originalBookmarks={bookMark} setSelectCategory={setSelectCategory} />
                {/* Total Stats */}
                <Total
                    filterBookmark={displayBookmarks}
                    totalCount={bookMark.length}
                />
            </div>

            {/* Bookmarks Grid / Empty / Loading State */}
            {loading ? (
                <div className="py-20 text-center border border-hairline bg-surface-soft">
                    <p className="text-xs font-mono text-mute animate-pulse">
                        [ FETCHING BOOKMARK ENTRIES... ]
                    </p>
                </div>
            ) : (
                <Display bookMark={displayBookmarks} setrefresh={setrefresh} />
            )}
        </div>
    );
}