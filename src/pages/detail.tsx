import MuiModal from "@mui/material/Modal"
import {useRecoilState, useRecoilValue} from "recoil";
import {modalState, videoState} from "@/atoms/modalAtom";
import {CheckIcon, PlusIcon, VolumeOffIcon, XIcon} from "@heroicons/react/outline";
import React, {useEffect, useState} from "react";
import {BASE_URL, toastStyle} from "@/constants/const";
import ReactPlayer from "react-player/lazy";
import {FaPause, FaPlay} from "react-icons/fa";
import {InformationCircleIcon, VolumeUpIcon} from "@heroicons/react/solid";
import useAuth from "@/hooks/useAuth";
import requests from "@/utils/requests";
import {useSession} from "next-auth/react";
import {toast, Toaster} from "react-hot-toast";
import {likeState, listState} from "@/atoms/listAtom";
import {ThumbUp, ThumbUpOutlined} from "@mui/icons-material";
import Head from "next/head";
import Header from "@/components/Header/Header";
import Image from "next/image";
import Comment from "@/components/Comment/Comment";
import CommentBox from "@/components/Comment/CommentBox";
import Interest from "@/components/Interest/Interest";
import {useRouter} from "next/router";
import {router} from "next/client";

function Detail() {
    const [curVideo, setCurVideo] = useRecoilState(videoState)
    const [list, setList] = useRecoilState(listState)
    const [like, setLike] = useRecoilState(likeState)
    const [mute, setMute] = useState(true)
    const [play, setPlay] = useState(true)
    const [add, setAdd] = useState(false)
    const [thumb, setThumb] = useState(false)
    const {data: session} = useSession();
    const auth = useAuth()


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
                await auth.delete(requests.favorites, {
                    data:
                        {'userId': session?.user.userid, 'movieId': curVideo.id,}
                })

                const temp = [...list]
                temp.splice(list.findIndex((result) => result.id === curVideo.id), 1)
                setList(temp)

                toast.success(`${curVideo.name} has been removed from My List.`, {
                    duration: 5000,
                    style: toastStyle,
                })

            } else {
                await auth.post(requests.favorites, {'userId': session?.user.userid, 'movieId': curVideo.id},)

                setList([curVideo, ...list])

                toast.success(`${curVideo.name} has been added to My List.`, {
                    duration: 5000,
                    style: toastStyle
                })
            }
        } else if (status === "like") {
            if (thumb) {
                await auth.delete(requests.likes, {
                    data:
                        {'userId': session?.user.userid, 'movieId': curVideo.id,}
                })

                const temp = [...like]
                temp.splice(list.findIndex((result) => result.id === curVideo.id), 1)
                setLike(temp)

                toast.success(`${curVideo.name} has been unliked`, {
                    duration: 3000,
                    style: toastStyle
                })

            } else {
                await auth.post(requests.likes, {'userId': session?.user.userid, 'movieId': curVideo.id},)

                setLike([curVideo, ...like])

                toast.success(`${curVideo.name} has been given a like.`, {
                    duration: 3000,
                    style: toastStyle
                })
            }
        }

    }
    const handleClose = () => {
        setCurVideo(null)
    }

    if (curVideo == null) {
        return (
            <>
                <Head>
                    <title>{'Breeze Video'}</title>
                    <meta name="description" content="Breeze Video"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <Header/>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>{curVideo && curVideo.name ? `${curVideo.name} - Breeze Video` : 'Breeze Video'}</title>
                <meta name="description" content="Breeze Video"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <Toaster position="bottom-center"/>
            <div className="flex space-x-16 rounded-b-md bg-[#141414] px-4 pb-8 pt-20">
                <div className="space-y-6 text-sm flex flex-col md:text-lg transition">
                    <div className="flex items-end space-x-4">
                        <p className="font-semibold text-3xl md:text-4xl">{curVideo?.name}</p>
                        <p>{curVideo?.releaseDate}</p>
                    </div>
                </div>
            </div>
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

                        <button className="modalButton" onClick={() => setPlay(!play)}>
                            {play ? (
                                <FaPause className="h-3 w-3 md:h-5 md:w-5"/>
                            ) : (
                                <FaPlay className="h-3 w-3 md:h-5 md:w-5"/>
                            )}
                        </button>

                        <button className="modalButton" onClick={() => handleList("favorite")}>
                            {add ? (
                                <CheckIcon className="h-4 w-4 md:h-7 md:w-7"/>
                            ) : (
                                <PlusIcon className="h-4 w-4 md:h-7 md:w-7"/>
                            )}

                        </button>

                        <button className="modalButton" onClick={() => handleList("like")}>
                            {thumb ? (
                                <ThumbUp className="h-4 w-4 md:h-7 md:w-7 outline-orange-500"/>
                            ) : (
                                <ThumbUpOutlined className="h-4 w-4 md:h-7 md:w-7"/>
                            )}

                        </button>
                    </div>
                    <button className="modalButton" onClick={() => setMute(!mute)}>
                        {mute ? (
                            <VolumeOffIcon className="h-4 w-4 md:h-6 md:w-6"/>
                        ) : (
                            <VolumeUpIcon className="h-4 w-4 md:h-6 md:w-6"/>
                        )}
                    </button>
                </div>
            </div>

            <div className="flex space-x-16 rounded-b-md bg-[#141414] px-10 py-8 text-sm md:text-xl">
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <div>
                            <span className="text-[gray]">Genres:&nbsp;&nbsp;</span>
                            {curVideo?.type.replaceAll('|', ", ")}
                        </div>
                        <p className="text-[#eb6d38]">{curVideo?.rating}</p>
                        <p>{curVideo?.runtime}</p>
                        <div className="flex h-4 items-center justify-center rounded border
                            border-white/40 px-1.5 text-xs">HD
                        </div>
                    </div>

                    <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row items-center">
                        <div className="relative h-64 cursor-pointer transition duration-200 ease-out min-w-[180px]
                                            max-w-[180px] hover:scale-105 lg:h-72 lg:min-w-[200px] lg:max-[200px]">
                            <Image className="object-cover rounded"
                                   src={`${BASE_URL}/s3/${curVideo?.posterUrl}`}
                                   alt="poster"
                                   fill
                                   sizes="50vw"
                            />
                        </div>

                        <div className="flex flex-col space-y-3 row-span-1 md:row-span-1">
                            <p className="w-5/6">{curVideo?.intro}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-x-16 rounded-b-md px-10 py-8 md:text-xl">
                <Comment/>
            </div>

            <div className="space-x-16 rounded-b-md px-10 py-8 md:text-xl">
                <CommentBox/>
            </div>

        </>
    );
}

export default Detail;