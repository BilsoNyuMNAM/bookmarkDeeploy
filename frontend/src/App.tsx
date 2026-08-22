import { useState } from "react";
import Button from "./components/Button";
import Group from "./components/Group";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function MainContent() {
    const [refresh, setrefresh] = useState(0);
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-canvas text-ink flex flex-col selection:bg-ink selection:text-canvas">
            {/* Top Navigation Bar */}
            <header className="border-b border-hairline sticky top-0 z-40 bg-canvas/90 backdrop-blur-xs">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
                    {/* Brand / Logo */}
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-sm tracking-tight">
                            [ BOOKMARK.DIR ]
                        </span>
                        <span className="hidden sm:inline-block text-[11px] text-mute font-mono">
                            // ARCHIVE
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
                {/* Hero TUI Strip */}
                <div className="mb-8 p-5 border border-hairline bg-surface-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-base font-bold tracking-tight text-ink">
                            COLLECTED LINKS & REELS ARCHIVE
                        </h1>
                        <p className="text-xs text-mute mt-1 font-mono">
                            Auto-synced from Apple Shortcuts & Web Interface
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-mute">
                        <div className="flex items-center gap-1.5">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>ENDPOINT LIVE</span>
                        </div>
                        <span className="text-stone">|</span>
                        <span>CLOUDFLARE WORKER</span>
                    </div>
                </div>

                {/* Bookmarks & Filters */}
                <Group refresh={refresh} setrefresh={setrefresh} />
            </main>

            {/* Footer */}
            <footer className="border-t border-hairline mt-16 py-8 bg-surface-soft text-mute text-xs font-mono">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© 2026 BOOKMARK.DIR // ALL RIGHTS RESERVED</p>
                    <div className="flex items-center gap-4 text-stone">
                        <span>[ APPLE SHORTCUTS ]</span>
                        <span>·</span>
                        <span>[ POSTGRES / PRISMA ]</span>
                        <span>·</span>
                        <span>[ HONO / WORKERS ]</span>
                    </div>
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
