// import { useRecoilValue } from "recoil";
import Datefilter from "./Datefilter";
import Display from "./Display";
import { useBookmarkFilter } from "../hooks/useBookmarkFilter"
import Total from "./Total";
import CategoryDropdown from "./CategoryFilter";


export default function Group({ refresh, setrefresh }: { refresh: number, setrefresh: React.Dispatch<React.SetStateAction<number>> }) {
    const { filter, filterBookmark, bookMarkfilter, filterByid, bookMark } = useBookmarkFilter(refresh)

    // Derive detailed categories from the full list (bookMark) not the filtered list
    //@ts-ignore
    const uniqueCategories = Array.from(
        //@ts-ignore
        new Map(bookMark.map(b => [b.CategoryId, b.category])).entries()
    ).map(([CategoryId, categoryObj]) => ({
        CategoryId,
        //@ts-ignore
        CategoryName: String(categoryObj.CategoryName) // Ensure it is a primitive string
    }));

    return (
        <div>
            <>
                <div className="flex justify-between items-center mb-4">
                    <Total filterBookmark={filterBookmark} />
                    <div className="flex gap-4">
                        <CategoryDropdown
                            categories={uniqueCategories}
                            filterByid={filterByid}
                            onReset={() => bookMarkfilter({ target: { id: "all" } })}
                        />
                    </div>
                </div>

                <Datefilter bookMarkfilter={bookMarkfilter} />
                <Display bookMark={filterBookmark} setrefresh={setrefresh} />
            </>
        </div>
    )
}