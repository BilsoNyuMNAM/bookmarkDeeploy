import React, { useState } from "react";

type BookmarkProps = {
    setrefresh: React.Dispatch<React.SetStateAction<number>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Bookmark({ setrefresh, setOpen }: BookmarkProps) {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [linkInfo, setLinkInfo] = useState({
        url: "",
        Name: "",
        Description: "",
        categoryName: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLinkInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!linkInfo.url.trim()) {
            setError("URL is required");
            return;
        }

        setSaving(true);
        try {
            const response = await fetch("https://square-forest-972c.yumnambilson.workers.dev/link/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url: linkInfo.url.trim(),
                    Name: linkInfo.Name.trim() || linkInfo.url.trim(),
                    Description: linkInfo.Description.trim(),
                    categoryName: linkInfo.categoryName.trim() || "no category",
                }),
            });

            if (response.status === 201 || response.ok) {
                setrefresh((prev) => prev + 1);
                setOpen(false);
            } else {
                const data = await response.json().catch(() => ({}));
                setError(data.error || "Failed to save bookmark");
                setSaving(false);
            }
        } catch (err) {
            console.error("Save error:", err);
            setError("Network error while saving");
            setSaving(false);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto border border-hairline-strong bg-canvas shadow-2xl p-6 text-ink">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-hairline pb-4 mb-5">
                <div>
                    <h2 className="text-base font-bold tracking-tight">
                        [+] NEW BOOKMARK
                    </h2>
                    <p className="text-xs text-mute mt-0.5">
                        ENTER POST DETAILS AND CATEGORY
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="text-xs text-mute hover:text-ink px-2 py-1 border border-hairline hover:border-hairline-strong rounded-[4px] cursor-pointer"
                >
                    [ESC]
                </button>
            </div>

            {error && (
                <div className="mb-4 p-2.5 text-xs text-red-500 bg-red-500/10 border border-red-500/30 rounded-[4px]">
                    [ERROR] {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-mute uppercase mb-1.5">
                        URL <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="url"
                        name="url"
                        required
                        autoFocus
                        value={linkInfo.url}
                        onChange={handleChange}
                        placeholder="https://example.com/post"
                        className="w-full bg-surface-soft text-ink text-xs px-3 py-2.5 border border-hairline rounded-[4px] focus:outline-none focus:border-hairline-strong focus:bg-canvas transition-colors placeholder:text-stone"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-mute uppercase mb-1.5">
                        Title / Name
                    </label>
                    <input
                        type="text"
                        name="Name"
                        value={linkInfo.Name}
                        onChange={handleChange}
                        placeholder="Post title or note..."
                        className="w-full bg-surface-soft text-ink text-xs px-3 py-2.5 border border-hairline rounded-[4px] focus:outline-none focus:border-hairline-strong focus:bg-canvas transition-colors placeholder:text-stone"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-mute uppercase mb-1.5">
                        Category
                    </label>
                    <input
                        type="text"
                        name="categoryName"
                        value={linkInfo.categoryName}
                        onChange={handleChange}
                        placeholder="e.g. Frontend, Design, AI, Coffee"
                        className="w-full bg-surface-soft text-ink text-xs px-3 py-2.5 border border-hairline rounded-[4px] focus:outline-none focus:border-hairline-strong focus:bg-canvas transition-colors placeholder:text-stone"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-mute uppercase mb-1.5">
                        Description (Optional)
                    </label>
                    <textarea
                        name="Description"
                        rows={2}
                        value={linkInfo.Description}
                        onChange={handleChange}
                        placeholder="Brief summary or thoughts..."
                        className="w-full bg-surface-soft text-ink text-xs px-3 py-2.5 border border-hairline rounded-[4px] focus:outline-none focus:border-hairline-strong focus:bg-canvas transition-colors resize-none placeholder:text-stone"
                    />
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-hairline flex items-center justify-end gap-2.5">
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 text-xs font-medium text-mute hover:text-ink border border-hairline hover:border-hairline-strong rounded-[4px] transition-colors cursor-pointer"
                    >
                        CANCEL
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-5 py-2 text-xs font-medium bg-surface-elevated text-ink border border-hairline-strong rounded-[4px] hover:bg-canvas transition-colors cursor-pointer disabled:opacity-50"
                    >
                        {saving ? "[ SAVING... ]" : "[ SAVE BOOKMARK ]"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Bookmark;