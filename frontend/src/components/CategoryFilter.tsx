import { useState, useRef, useEffect } from "react";

type Category = {
    CategoryName: string;
    CategoryId: number;
};

type Props = {
    categories: Category[]; // Derived from unique categories in parent
    filterByid: (id: number) => void;
    onReset: () => void; // To clear filter
};

export default function CategoryDropdown({ categories, filterByid, onReset }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedName, setSelectedName] = useState("ALL CATEGORIES");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (id: number, name: string) => {
        filterByid(id);
        setSelectedName(name.toUpperCase());
        setIsOpen(false);
    };

    const handleReset = () => {
        onReset();
        setSelectedName("ALL CATEGORIES");
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left z-1" ref={dropdownRef}>
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="inline-flex justify-between items-center w-64 px-4 py-3 bg-white border-4 border-black font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                >
                    <span className="truncate">{selectedName}</span>
                    <svg className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 max-h-60 overflow-y-auto">
                    <div className="py-1">
                        <button
                            onClick={handleReset}
                            className="block w-full text-left px-4 py-3 font-bold hover:bg-yellow-300 border-b-2 border-black last:border-b-0"
                        >
                            ALL CATEGORIES
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.CategoryId}
                                onClick={() => handleSelect(cat.CategoryId, cat.CategoryName)}
                                className="block w-full text-left px-4 py-2 font-bold hover:bg-yellow-300 border-b-2 border-dashed border-gray-300 last:border-b-0"
                            >
                                {cat.CategoryName.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}