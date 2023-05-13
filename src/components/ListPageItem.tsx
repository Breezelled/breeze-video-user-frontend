import {Props} from "@/components/Row/Thumbnail/data";
import Image from "next/image";
import {BASE_URL} from "@/constants/const";
import {InformationCircleIcon} from "@heroicons/react/solid";
import {useRecoilState} from "recoil";
import {videoState} from "@/atoms/modalAtom";
import {useRouter} from "next/router";

function ListPageItem({video}: Props) {
    const [curVideo, setCurVideo] = useRecoilState(videoState)
    const router = useRouter()

    const handleClick = () => {
        setCurVideo(video)
        router.push("/detail")
    }
    return (
        <div className="flex items-center space-x-4 rounded-b-md bg-[#141414] px-10 py-8">
            <div className="flex-shrink-0">
                <div className="relative h-64 cursor-pointer transition duration-200 ease-out min-w-[180px]
              max-w-[180px] hover:scale-105 lg:h-72 lg:min-w-[200px] lg:max-[200px]">
                    <Image
                        className="rounded-sm object-cover md:rounded"
                        src={`${BASE_URL}/s3/${video.posterUrl}`}
                        alt={video.name}
                        fill
                        sizes="33vw"
                        onClick={handleClick}
                    />
                </div>
            </div>

            <div className="flex-grow">
                <p className="text-2xl font-semibold lg:text-4xl">{video?.name}</p>
                <p className="text-md text-[#eb6d38]">{video.rating}</p>
                <p className="text-md">
                    <span className="text-[gray]">Genres:&nbsp;&nbsp;</span>
                    {video?.type.replaceAll('|', ", ")}
                </p>

            </div>

            <div className="flex">
                <button className="flex items-center md:gap-x-2 rounded bg-[gray]/70 px-4 text-md
                                               font-bold transition hover:opacity-75 lg:text-xl lg:px-8"
                        onClick={handleClick}>
                    More Info
                    <InformationCircleIcon className="h-5 w-5 lg:h-7 lg:w-7"/>
                </button>
            </div>
        </div>
    );
}

export default ListPageItem;
