import {Props} from "@/components/Banner/data";
import {useEffect, useState} from "react";
import {Info} from "@/types/data";
import {BASE_URL} from "@/constants/const";
import Image from 'next/image'
import {FaPlay} from "react-icons/fa";
import {InformationCircleIcon} from "@heroicons/react/solid";
import {useRecoilState} from "recoil";
import {modalState, videoState} from "@/atoms/modalAtom";
import {useRouter} from "next/router";

function Banner({banner}: Props) {
    const [video, setVideo] = useState<Info | null>(null)
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [curVideo, setCurVideo] = useRecoilState(videoState)
    const router = useRouter()

    useEffect(() => {
        setVideo(banner[Math.floor(Math.random() * banner.length)])
    }, [banner])

    return (
        <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end
        lg:pb-12">
            <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
                <Image className="object-cover" src={`${BASE_URL}/s3/${video?.posterUrl}`}
                       style={{objectPosition:"50% 20%"}}
                       fill
                       alt=""/>
            </div>
            <h1 className="font-bold text-2xl md:text-4xl lg:text-7xl">
                {video?.name}
            </h1>
            <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
                {video?.intro}
            </p>
            <div className="flex space-x-3">
                <button className="bannerButton bg-white text-black"
                        onClick={() => {
                    setCurVideo(video)
                    setShowModal(true)
                }}>
                    <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7"/>Play
                </button>
                <button className="bannerButton bg-[gray]/70"
                        onClick={() => {
                            setCurVideo(video)
                            router.push("/detail")
                        }}>
                    More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8"/>
                </button>
            </div>
        </div>
    );
}
export default Banner;
