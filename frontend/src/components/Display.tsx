import Card from "./Card";

type DisplayProps = {
    bookMark: any[];
    setrefresh: React.Dispatch<React.SetStateAction<number>>;
};

export default function Display({ bookMark, setrefresh }: DisplayProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <Card bookMark={bookMark} setrefresh={setrefresh} />
        </div>
    );
}
