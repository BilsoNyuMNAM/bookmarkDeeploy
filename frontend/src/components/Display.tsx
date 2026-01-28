
import Card from "./Card"
//@ts-ignore
type ReceivedProps = {
    bookMark?: Array<Object>
    setrefresh?: React.Dispatch<React.SetStateAction<number>>
}
export default function Display({ bookMark, setrefresh }:ReceivedProps) {
    console.log("data received inside Display component:", bookMark)

    return (

        <div className=" grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-1 gap-3 mt-10">

            <Card bookMark={bookMark} setrefresh={setrefresh} />

        </div>


    )
}

