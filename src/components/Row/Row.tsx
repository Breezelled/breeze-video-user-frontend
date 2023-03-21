import {Props} from "@/components/Row/data";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/outline";
import Thumbnail from "@/components/Row/Thumbnail/Thumbnail";
import {useRef, useState} from "react";

function Row({title, videos}: Props) {
    const rowRef = useRef<HTMLDivElement>(null)
    const [isMoved, setIsMoved] = useState(0)

    const handleClick = (direction: string) => {
        if (direction === "left") {
            setIsMoved(isMoved - 1)
        } else if (direction === "right") {
            setIsMoved(isMoved + 1)
        }
        if (rowRef.current) {
            const {scrollLeft, clientWidth} = rowRef.current
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
            rowRef.current.scrollTo({left: scrollTo, behavior: "smooth"})
        }
    }

    return (
        <div className="h-40 space-y-0.5 space-y-2">
            <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition
            duration-200 hover:text-white md:text-2xl">
                {title}
            </h2>
            <div className="group relative md:-ml-2">
                <ChevronLeftIcon className={`rowIcon left-2 ${isMoved === 0 && "hidden"}`}
                                 onClick={() => handleClick("left")}
                />
                <div ref={rowRef} className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide
                md:space-x-2.5 md:p-2">
                    {videos.map((video) => (
                        <Thumbnail key={video.name} video={video}/>
                    ))}
                </div>
                <ChevronRightIcon className="rowIcon right-2"
                                  onClick={() => handleClick("right")}
                />
            </div>
        </div>
    );
}

export default Row;