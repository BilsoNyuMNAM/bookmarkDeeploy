// import { useRecoilValue } from "recoil";
import Datefilter from "./Datefilter";
import Display from "./Display";
import { useBookmarkFilter } from "../hooks/useBookmarkFilter"
import Total from "./Total";
import CategoryFilterCard from "./CategoryFilter";


type response = {
    id: number,
    createdAt: Date,
    url: String,
    Name: String,
    Description: String,
    CategoryId: number,

    category: {
        CategoryName: String
    }
}

export default function Group({ refresh, setrefresh }: { refresh: number, setrefresh: React.Dispatch<React.SetStateAction<number>> }) {
    const { filter, filterBookmark, bookMarkfilter, filterByid } = useBookmarkFilter(refresh)

    return (
        <div>
            {
                filter == "all" ?
                    <>
                        <Total filterBookmark={filterBookmark} />
                        <div className="flex gap-1 flex-wrap">
                            {
                                Array.from(
                                    new Map(filterBookmark.map(b => [b.CategoryId, b.category.CategoryName])).entries()
                                ).map(([categoryId, categoryName]) => (
                                    <CategoryFilterCard key={categoryId} CategoryName={categoryName} CategoryId={categoryId} filterByid={filterByid} />
                                ))
                            }
                        </div>

                        <Datefilter bookMarkfilter={bookMarkfilter} />
                        <Display bookMark={filterBookmark} setrefresh={setrefresh} />
                    </> :

                    <>
                        <Total filterBookmark={filterBookmark} />
                        <div className="flex gap-1 flex-wrap">
                            {
                                Array.from(
                                    new Map(filterBookmark.map(b => [b.CategoryId, b.category.CategoryName])).entries()
                                ).map(([categoryId, categoryName]) => (
                                    <CategoryFilterCard key={categoryId} CategoryName={categoryName} CategoryId={categoryId} filterByid={filterByid} />
                                ))
                            }
                        </div>

                        <Datefilter bookMarkfilter={bookMarkfilter} />
                        <Display bookMark={filterBookmark} setrefresh={setrefresh} />
                    </>
            }
        </div>
    )
}