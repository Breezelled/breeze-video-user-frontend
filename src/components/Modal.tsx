import MuiModal from "@mui/material/Modal"
import {useRecoilState} from "recoil";
import {modalState, videoState} from "@/atoms/modalAtom";
import {PlayIcon, PlusIcon, ThumbUpIcon, VolumeOffIcon, XIcon} from "@heroicons/react/outline";
import {useEffect, useState} from "react";
import {Info} from "@/data";
import {BASE_URL} from "@/constants/const";
import ReactPlayer from "react-player/lazy";
import {FaPause, FaPlay} from "react-icons/fa";
import {InformationCircleIcon, VolumeUpIcon} from "@heroicons/react/solid";
function Modal() {
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [curVideo, setCurVideo] = useRecoilState(videoState)
    const [mute, setMute] = useState(true)
    const [play, setPlay] = useState(true)
    const handleClose = () => {
        setShowModal(false)
    }
    return (
        <MuiModal
            open={showModal}
            onClose={handleClose}
            className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden
            overflow-y-scroll rounded-md scrollbar-hide"
        >
            <>
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
                    <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                        <div className="flex space-x-2">
                            <button className="flex items-center gap-x-2 rounded bg-[gray]/70 px-8 text-xl
                        font-bold transition hover:opacity-75">
                                More Info
                                <InformationCircleIcon className="h-7 w-7"/>
                            </button>

                            <button className="modalButton" onClick={() => setPlay(!play)}>
                                {play? (
                                    <FaPause className="h-5 w-5"/>
                                ): (
                                    <FaPlay className="h-5 w-5"/>
                                )}
                            </button>

                            <button className="modalButton">
                                <PlusIcon className="h-7 w-7"/>
                            </button>

                            <button className="modalButton">
                                <ThumbUpIcon className="h-7 w-7"/>
                            </button>
                        </div>
                        <button className="modalButton" onClick={() => setMute(!mute)}>
                            {mute? (
                                <VolumeOffIcon className="h-6 w-6"/>
                            ): (
                                <VolumeUpIcon className="h-6 w-6"/>
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