import {Props} from "@/components/Row/Thumbnail/data";
import Image from "next/image";
import {BASE_URL} from "@/constants/const";

function Thumbnail({video}: Props) {
    console.log(video.posterUrl)
    return (
        <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200
        ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
            <Image
                className="rounded-sm object-cover md:rounded object-cover"
                src={`${BASE_URL}/s3/${video.posterUrl}`}
                alt={video.name}
                fill
                placeholder="blur"
                blurDataURL={`${BASE_URL}/s3/${video.posterUrl}`}
            />
        </div>
    );
}

export default Thumbnail;