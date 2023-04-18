import MuiModal from "@mui/material/Modal"
import {useRecoilState, useRecoilValue} from "recoil";
import {modalState, videoState} from "@/atoms/modalAtom";
import {CheckIcon, PlusIcon, VolumeOffIcon, XIcon} from "@heroicons/react/outline";
import {useEffect, useState} from "react";
import {BASE_URL} from "@/constants/const";
import ReactPlayer from "react-player/lazy";
import {FaPause, FaPlay} from "react-icons/fa";
import {InformationCircleIcon, VolumeUpIcon} from "@heroicons/react/solid";
import useAuth from "@/hooks/useAuth";
import requests from "@/utils/requests";
import {useSession} from "next-auth/react";
import {toast, Toaster} from "react-hot-toast";
import {likeState, listState} from "@/atoms/listAtom";
import {ThumbUp, ThumbUpOutlined} from "@mui/icons-material";
function Modal() {
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [curVideo, setCurVideo] = useRecoilState(videoState)
    const [list, setList] = useRecoilState(listState)
    const [like, setLike] = useRecoilState(likeState)
    const [mute, setMute] = useState(true)
    const [play, setPlay] = useState(true)
    const [add, setAdd] = useState(false)
    const [thumb, setThumb] = useState(false)
    const { data: session } = useSession();
    const auth = useAuth()

    const toastStyle = {
        background: 'white',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '16px',
        padding: '15px',
        borderRadius: '9999px',
        maxWidth: '1000px',
    }

    console.log(list)
    console.log(add)
    console.log(list.findIndex((result) => result.id === curVideo?.id))

    useEffect(
        () =>
            setAdd(
                list.findIndex((result) => result.id === curVideo?.id) != -1
            ),
        [list]
    )

    useEffect(
        () =>
            setThumb(
                like.findIndex((result) => result.id === curVideo?.id) != -1
            ),
        [like]
    )
    const handleList = async (status: string) => {
        if (!curVideo) return
        if (status === "favorite") {
            if (add) {
                await auth.delete(requests.favorites, {data:
                        {'userId': session?.user.userid, 'movieId': curVideo.id,}})

                toast.success(`${curVideo.name} has been removed from My List.`, {
                    duration: 5000,
                    style: toastStyle,
                })
                const temp = [...list]
                temp.splice(list.findIndex((result) => result.id === curVideo.id), 1)
                setList(temp)

            } else {
                await auth.post(requests.favorites, {'userId': session?.user.userid, 'movieId': curVideo.id},)

                toast.success(`${curVideo.name} has been added to My List.`, {
                    duration: 5000,
                    style: toastStyle
                })
                setList([curVideo, ...list])
            }
        } else if (status === "like") {
            if (thumb) {
                await auth.delete(requests.likes, {data:
                        {'userId': session?.user.userid, 'movieId': curVideo.id,}})

                toast.success(`${curVideo.name} has been unliked`, {
                    duration: 3000,
                    style: toastStyle
                })
                const temp = [...like]
                temp.splice(list.findIndex((result) => result.id === curVideo.id), 1)
                setLike(temp)

            } else {
                await auth.post(requests.likes, {'userId': session?.user.userid, 'movieId': curVideo.id},)

                toast.success(`${curVideo.name} has been given a like.`, {
                    duration: 3000,
                    style: toastStyle
                })
                setLike([curVideo, ...like])
            }
        }

    }
    const handleClose = () => {
        setShowModal(false)
        setCurVideo(null)
    }

    return (
        <MuiModal
            open={showModal}
            onClose={handleClose}
            className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden
            overflow-y-scroll rounded-md scrollbar-hide"
        >
            <>
                <Toaster position="bottom-center"/>
                <button onClick={handleClose}
                        className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none
                        bg-[#141414] hover:bg-[#141414]"
                >
                    <XIcon className="h-6 w-6"/>
                </button>

                <div className="relative pt-[56.25%]">
                    <ReactPlayer
                        className="bg-black"
                        url={`${BASE_URL}/s3/${curVideo?.trailerUrl}`}
                        width="100%"
                        height="100%"
                        style={{position: 'absolute', top: '0', left: '0'}}
                        playing={play}
                        muted={mute}
                    />
                    <div className="absolute bottom-4 md:bottom-10 flex w-full items-center justify-between md:px-10 px-5">
                        <div className="flex space-x-2">
                            <button className="flex items-center md:gap-x-2 rounded bg-[gray]/70 px-4 text-xs
                        font-bold transition hover:opacity-75 md:text-xl md:px-8">
                                More Info
                                <InformationCircleIcon className="h-5 w-5 md:h-7 md:w-7"/>
                            </button>

                            <button className="modalButton" onClick={() => setPlay(!play)}>
                                {play? (
                                    <FaPause className="h-3 w-3 md:h-5 md:w-5"/>
                                ): (
                                    <FaPlay className="h-3 w-3 md:h-5 md:w-5"/>
                                )}
                            </button>

                            <button className="modalButton" onClick={() => handleList("favorite")}>
                                {add? (
                                    <CheckIcon className="h-4 w-4 md:h-7 md:w-7"/>
                                ): (
                                    <PlusIcon className="h-4 w-4 md:h-7 md:w-7"/>
                                )}

                            </button>

                            <button className="modalButton" onClick={() => handleList("like")}>
                                {thumb? (
                                    <ThumbUp className="h-4 w-4 md:h-7 md:w-7 outline-orange-500"/>
                                ): (
                                    <ThumbUpOutlined className="h-4 w-4 md:h-7 md:w-7"/>
                                )}

                            </button>
                        </div>
                        <button className="modalButton" onClick={() => setMute(!mute)}>
                            {mute? (
                                <VolumeOffIcon className="h-4 w-4 md:h-6 md:w-6"/>
                            ): (
                                <VolumeUpIcon className="h-4 w-4 md:h-6 md:w-6"/>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex space-x-16 rounded-b-md bg-[#141414] px-10 py-8">
                    <div className="space-y-6 text-lg">
                        <div className="flex items-center space-x-4 text-sm">
                            <p className="font-semibold text-xl">{curVideo?.name}</p>
                            <p className="text-[#eb6d38]">{curVideo?.rating}</p>
                            <p>{curVideo?.runtime}</p>
                            <div className="flex h-4 items-center justify-center rounded border
                            border-white/40 px-1.5 text-xs">HD
                            </div>
                        </div>

                        <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                            <p className="w-5/6">{curVideo?.intro}</p>
                            <div className="flex flex-col space-y-3 text-sm row-span-1 md:row-span-1">
                                <div>
                                    <span className="text-[gray]">Genres:&nbsp;&nbsp;</span>
                                    {curVideo?.type.replaceAll('|', ", ")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    );
}

export default Modal;