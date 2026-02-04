import { useVisibility } from "../hooks/useVisibility"
import Wrapper from "./Wrapper"

function Button({ refresh, setrefresh }: { refresh: number, setrefresh: React.Dispatch<React.SetStateAction<number>> }) {
    const { isOpen, setOpen } = useVisibility();
    return (
        <>

            <div>
                <button id="button" className="px-5 py-4 border-3 border-black" onClick={() => {
                    setOpen(true)
                }}>+ ADD BOOKMARK</button>
            </div>



            {
                isOpen ?
                    <>

                        <Wrapper setOpen={setOpen} refresh={refresh} setrefresh={setrefresh} />
                    </>
                    : null
            }
        </>
    )
}


export default Button


