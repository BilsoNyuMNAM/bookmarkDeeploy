
// import { useRecoilState } from "recoil" 
// import { fetchingOrnot } from "../hooks/refresh"
type response = {
    id: number,
    createdAt: Date,
    url: string,
    Name: string,
    Description: string,
    CategoryId: number
    CategoryName: string
}

function Logic({ id, url, Name, CategoryName, createdAt, setrefresh }: Omit<response, 'Description' | 'CategoryId'> & { setrefresh: any }) {


    const handleDelete = async () => {
        try {
            const response = await fetch(`https://square-forest-972c.yumnambilson.workers.dev/link/delete/${id}`, {
                method: 'DELETE',
            });
            if (response.status == 204) {
                // Toggle refresh to trigger refetch in Group.tsx
                setrefresh((prev: number) => prev + 1);
            } else {
                console.error('Failed to delete bookmark');
            }
        } catch (error) {
            console.error('Error deleting bookmark:', error);
        }
    };

    return (
        //[]todo : wrap this in an anchor tag so that when i click on the card it gets redirected 
        <div className="border-4 border-black  hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1" >
            <button onClick={handleDelete} data-delete-id={id} className="cursor-pointer top-3  left-3 z-1  m-2 w-8 h-8 flex items-center justify-center p-0" >
                <img src="./delete.svg" className="h-6 w-6"></img>
            </button>

            <div className="border-t-4 border-black p-4 mt-10">
                <a href={url}>
                    <div>
                        <div className="mb-2 font-bold  text-[10px] ">
                            <span className="px-2 py-1 border-2  text-[10px] font-bold tracking-widest">{CategoryName}</span>
                        </div>
                        <h3 className="  font-bold mb-2 tracking-tight leading-tight line-clamp-2">{Name}</h3>
                        <div className=" border-t-2 border-gray-200 ">
                            <span className="text-[10px] tracking-widest text-gray-500 font-bold  ">Added:{new Date(createdAt).toLocaleDateString('en-US')}</span>
                        </div>
                    </div>
                </a>
            </div>

        </div>
    )
}
//@ts-ignore
export default function Card({ bookMark, setrefresh }) {

    return (
        <>
            {bookMark.length == 0 ? (
                <div>No bookmark to display</div>
            ) : (
                //@ts-ignore
                bookMark.map((bookmark) => (

                    //@ts-ignore
                    <Logic setrefresh={setrefresh} id={bookmark.id} url={bookmark.url} CategoryName={bookmark.category.CategoryName.toUpperCase()} createdAt={bookmark.createdAt} Name={bookmark.Name} Description={bookmark.Description} CategoryId={bookmark.CategoryId} />

                ))
            )}
        </>
    )

}
