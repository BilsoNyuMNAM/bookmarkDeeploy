import { useState } from "react";
import Wrapper from "./Wrapper";

type ButtonProps = {
    refresh: number;
    setrefresh: React.Dispatch<React.SetStateAction<number>>;
};

function Button({ refresh, setrefresh }: ButtonProps) {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <button
                id="add-bookmark-button"
                className="px-3.5 py-1.5 bg-surface-elevated text-ink border border-hairline-strong rounded-[4px] font-medium text-xs tracking-wide hover:bg-canvas hover:border-ink transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                onClick={() => setOpen(true)}
            >
                <span className="font-bold text-mute">[+]</span>
                <span>ADD BOOKMARK</span>
            </button>

            {isOpen && (
                <Wrapper setOpen={setOpen} refresh={refresh} setrefresh={setrefresh} />
            )}
        </>
    );
}

export default Button;
