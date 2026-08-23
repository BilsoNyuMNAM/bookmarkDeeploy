import { useState } from "react";
import Group from "./components/Group";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function MainContent() {
    const [refresh, setrefresh] = useState(0);
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-canvas text-ink flex flex-col selection:bg-ink selection:text-canvas">
            <header className="border-b border-hairline sticky top-0 z-40 bg-canvas/90 backdrop-blur-xs">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-sm tracking-tight">
                            [ BOOKMARK.DIR ]
                        </span>
                    </div>

                    {/* Right Action Cluster */}
                    <div className="flex items-center gap-2.5">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
                            className="px-2.5 py-1.5 text-xs font-mono border border-hairline hover:border-hairline-strong rounded-[4px] bg-surface-soft hover:bg-surface-elevated text-ink transition-colors cursor-pointer"
                        >
                            {theme === "dark" ? "[☀ LIGHT]" : "[☾ DARK]"}
                        </button>

                        {/* Add Bookmark CTA */}
                        <Button refresh={refresh} setrefresh={setrefresh} />
                    </div>
                </div>
            </header>

            {/* Main Workspace */}
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">


                {/* Bookmarks & Filters */}
                <Group refresh={refresh} setrefresh={setrefresh} />
            </main>

            <footer className="border-t border-hairline mt-16 py-8 bg-surface-soft text-mute text-xs font-mono">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© 2026 BOOKMARK.DIR</p>
                </div>
            </footer>
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <MainContent />
        </ThemeProvider>
    );
}
