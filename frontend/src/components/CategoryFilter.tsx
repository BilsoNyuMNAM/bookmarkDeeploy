
type response = {

    CategoryName: String,
    CategoryId: number

}

export function CategoryLogic({ CategoryName, CategoryId, filterByid }: response & { filterByid: any }) {
    return (
        <div>
            <button className="text-xs p-2 py-2 border-2 border-black font-bold" data-filter-id={CategoryId} onClick={() => filterByid(CategoryId)}>{CategoryName}</button>
        </div>
    )
}

export default function CategoryFilterCard({ CategoryName, CategoryId, filterByid }: response & { filterByid: any }) {

    return (
        <div >
            <CategoryLogic CategoryName={CategoryName} CategoryId={CategoryId} filterByid={filterByid} />
        </div>

    )
}