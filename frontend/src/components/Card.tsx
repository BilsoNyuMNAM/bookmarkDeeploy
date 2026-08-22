import React, { useState } from "react";

type BookmarkItem = {
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

type CardProps = {
    bookMark: BookmarkItem[];
    setrefresh: React.Dispatch<React.SetStateAction<number>>;
};

function SingleCard({
    id,
    url,
    Name,
    CategoryName,
    Description,
    createdAt,
    setrefresh,
}: {
    id: number;
    url: string;
    Name: string;
    CategoryName: string;
    Description?: string;
    createdAt: Date;
    setrefresh: React.Dispatch<React.SetStateAction<number>>;
}) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!window.confirm(`Delete bookmark "${Name}"?`)) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`https://square-forest-972c.yumnambilson.workers.dev/link/delete/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setrefresh((prev) => prev + 1);
            } else {
                console.error("Failed to delete bookmark");
                setIsDeleting(false);
            }
        } catch (error) {
            console.error("Error deleting bookmark:", error);
            setIsDeleting(false);
        }
    };

    // Format display date
    const dateFormatted = new Date(createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).replace(/\//g, ".");

    // Extract domain from URL
    let domain = url;
    try {
        domain = new URL(url).hostname.replace("www.", "");
    } catch {
        // fallback to url if invalid URL format
    }

    return (
        <div className="group relative flex flex-col justify-between border border-hairline bg-surface-soft p-5 transition-all duration-150 hover:border-hairline-strong">
            {/* Top Bar: Category & Delete */}
            <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-medium text-mute tracking-wider uppercase">
                    [{CategoryName || "NO CATEGORY"}]
                </span>
                
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    title="Delete bookmark"
                    className="px-2 py-0.5 text-xs text-mute hover:text-red-500 hover:bg-surface-elevated rounded-[4px] transition-colors cursor-pointer disabled:opacity-50"
                >
                    {isDeleting ? "..." : "[x]"}
                </button>
            </div>

            {/* Main Content: Title & Link */}
            <div className="flex-1 mb-4">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group-hover:underline underline-offset-4"
                >
                    <h3 className="text-[15px] font-bold text-ink leading-snug tracking-tight line-clamp-2 mb-1.5">
                        {Name || "Untitled Bookmark"} <span className="inline-block text-mute font-normal text-xs">↗</span>
                    </h3>
                </a>

                {Description && (
                    <p className="text-xs text-body-text line-clamp-2 leading-relaxed mt-1">
                        {Description}
                    </p>
                )}
            </div>

            {/* Bottom Meta Bar */}
            <div className="pt-3 border-t border-hairline flex items-center justify-between text-[11px] text-stone">
                <span className="truncate max-w-[140px] text-mute font-mono" title={domain}>
                    {domain}
                </span>
                <span className="font-mono">
                    {dateFormatted}
                </span>
            </div>
        </div>
    );
}

export default function Card({ bookMark, setrefresh }: CardProps) {
    if (!bookMark || bookMark.length === 0) {
        return (
            <div className="col-span-full py-16 text-center border border-hairline bg-surface-soft p-8">
                <p className="text-sm font-mono text-mute mb-2">[!] NO BOOKMARKS FOUND</p>
                <p className="text-xs text-stone">Add a bookmark or adjust your date/category filter.</p>
            </div>
        );
    }

    return (
        <>
            {bookMark.map((bookmark) => (
                <SingleCard
                    key={bookmark.id}
                    id={bookmark.id}
                    url={bookmark.url}
                    CategoryName={bookmark.category?.CategoryName || "NO CATEGORY"}
                    createdAt={bookmark.createdAt}
                    Name={bookmark.Name}
                    Description={bookmark.Description}
                    setrefresh={setrefresh}
                />
            ))}
        </>
    );
}
