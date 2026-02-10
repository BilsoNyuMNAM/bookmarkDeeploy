
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
import { useState, useEffect } from "react";

export function useBookmarkFilter(refresh: number = 0) {
    const [bookMark, setbookMark] = useState<response[]>([])
    const [filter, setFilter] = useState("all")
    const [filterBookmark, setfilterBookmark] = useState<response[]>([])
    useEffect(() => {
        console.log("refetching")
        fetch("https://square-forest-972c.yumnambilson.workers.dev/link/showall")
            .then(result => {
                if (result.status == 404) {
                    console.log("No things to display")
                    return
                }
                return result.json()
                    .then(jsonresponse => {
                        // Change: Don't spread old state, just set the new data
                        setbookMark(jsonresponse.result)
                        // Change: Also initialize filterBookmark with the fetched data
                        setfilterBookmark(jsonresponse.result)
                    })
            })
    }, [refresh])


    const datefilter = {
        "today": 1,
        "seven": 7,
        "thirty": 30
    }


    function bookMarkfilter(e: any) {
        // Safety check: ensure target exists
        if (!e || !e.target) return;

        const date = e.target.id;

        // If clicked on container (no ID) or invalid ID, ignore
        if (!date || (date !== "all" && !(date in datefilter) && date !== "older")) {
            return;
        }

        if (date == "all") {
            setFilter("all")
            setfilterBookmark(bookMark)
            return
        }

        setFilter(date)

        const todayTime = new Date().getTime()
        const filtered = bookMark.filter(bookmark => {
            const createdTime = new Date(bookmark.createdAt).getTime()
            const divisor = (1000 * 60 * 60 * 24);
            const daysDifference = (todayTime - createdTime) / divisor

            if (date === "older") {
                return daysDifference > 30;
            }
            const key = date as keyof typeof datefilter;
            return daysDifference <= datefilter[key]
        })
        console.log("filtered:", filtered)
        setfilterBookmark(filtered)
    }

    //a funciton that filter the bookmark according to the id 
    function filterByid(categoryId: number) {
        const filtered = bookMark.filter(bookmark =>
            bookmark.CategoryId === categoryId
        );
        setfilterBookmark(filtered);
    }
    return { bookMark, filter, filterBookmark, bookMarkfilter, filterByid }
}