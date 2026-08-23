import { useEffect } from "react";


type WrapperProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refresh: number;
    setrefresh: React.Dispatch<React.SetStateAction<number>>;
};

export default function Wrapper({ setOpen}: WrapperProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [setOpen]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
                onClick={() => setOpen(false)}
            />
            {/* Modal Content */}
           
        </div>
    );
}