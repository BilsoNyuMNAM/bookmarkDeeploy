
export default function Addnotebutton({ setOpen, setpassNote }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, setpassNote: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div>
            <button
                onClick={() => { setOpen(true); setpassNote(false) }}
                className="px-8 py-4 border-4 border-black bg-white text-black font-black text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
            >
                ADD NOTE
            </button>
        </div>
    )
}