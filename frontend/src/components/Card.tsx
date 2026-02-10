
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
        <div className="relative bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col h-full group" >

            {/* Top section with Delete Button */}
            <div className="flex justify-between items-start p-4 pb-2">
                <button
                    onClick={handleDelete}
                    data-delete-id={id}
                    className="w-8 h-8 flex items-center justify-center bg-red-400 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-none transition-all active:translate-y-[2px]"
                    title="Delete Bookmark"
                >
                    <img src="./delete.svg" className="h-5 w-5 invert" />
                </button>
            </div>

            {/* Content Section with Divider */}
            <div className="border-t-4 border-black mt-auto">
                <a href={url} target="_blank" rel="noreferrer" className="block p-5 hover:bg-yellow-50 transition-colors">
                    <div className="flex flex-col gap-3">
                        {/* Category Pill */}
                        <div>
                            <span className="inline-block px-3 py-1 bg-purple-400 border-2 border-black text-[10px] font-black tracking-widest uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-white">
                                {CategoryName}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-black text-xl leading-tight uppercase tracking-tight line-clamp-2">
                            {Name}
                        </h3>

                        {/* Date */}
                        <div className="pt-3 border-t-2 border-black/10">
                            <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                                Added: {new Date(createdAt).toLocaleDateString('en-GB').replace(/\//g, '.')}
                            </span>
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
                    <Logic
                        setrefresh={setrefresh}
                        id={bookmark.id}
                        url={bookmark.url}
                        CategoryName={bookmark.category?.CategoryName ? String(bookmark.category.CategoryName).toUpperCase() : "UNCATEGORIZED"}
                        createdAt={bookmark.createdAt}
                        Name={bookmark.Name}
                    />

                ))
            )}
        </>
    )

}
