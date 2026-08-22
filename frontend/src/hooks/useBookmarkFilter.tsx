import { useState, useEffect, useMemo } from "react";

export type BookmarkItem = {
    id: number;
    createdAt: Date;
    url: string;
    Name: string;
    Description?: string;
    CategoryId: number;
    category?: {
        CategoryName: string;
    };
};

export function useBookmarkFilter(refresh: number = 0) {
    const [bookMark, setbookMark] = useState<BookmarkItem[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        fetch("https://square-forest-972c.yumnambilson.workers.dev/link/showall")
            .then((result) => {
                if (result.status === 404) {
                    setbookMark([]);
                    setLoading(false);
                    return;
                }
                return result.json().then((jsonresponse) => {
                    setbookMark(jsonresponse.result || []);
                    setLoading(false);
                });
            })
            .catch((err) => {
                console.error("Failed to load bookmarks:", err);
                setLoading(false);
            });
    }, [refresh]);

    // Filtered bookmarks computed from real-time search query
    const filterBookmark = useMemo(() => {
        if (!searchQuery.trim()) {
            return bookMark;
        }

        const q = searchQuery.toLowerCase();
        return bookMark.filter((item) => {
            const matchesName = item.Name?.toLowerCase().includes(q);
            const matchesUrl = item.url?.toLowerCase().includes(q);
            const matchesDesc = item.Description?.toLowerCase().includes(q);
            const matchesCategory = item.category?.CategoryName?.toLowerCase().includes(q);
            return matchesName || matchesUrl || matchesDesc || matchesCategory;
        });
    }, [bookMark, searchQuery]);

    return {
        bookMark,
        loading,
        searchQuery,
        setSearchQuery,
        filterBookmark,
    };
}