import Link from "next/link";
import Avatar from "@/components/Avatar";
import React, {useEffect, useState} from "react";
import BasicMenu from "@/components/Header/BasicMenu";
import {useRecoilState} from "recoil";
import {listPageState} from "@/atoms/listAtom";
import useAuth from "@/hooks/useAuth";
import requests from "@/utils/requests";
import {useRouter} from "next/router";
import {isPostState, listPaginationState, postContentState} from "@/atoms/paginationAtom";
import {DEFAULT_PAGINATION_SIZE} from "@/constants/const";
import {useSession} from "next-auth/react";
import SearchBox from "@/components/SearchBox";

function Header() {
    const [scroll, setScroll] = useState(false)
    const [listPage, setListPage] = useRecoilState(listPageState)
    const [pagination, setPagination] = useRecoilState(listPaginationState)
    const [postContent, setPostContent] = useRecoilState(postContentState)
    const [isPost, setIsPost] = useRecoilState(isPostState)
    const auth = useAuth()
    const {data: session} = useSession();
    const router = useRouter()

    const handleClick = (url: string) => {
        auth.get(url + `?pageNum=1&pageSize=${DEFAULT_PAGINATION_SIZE}`)
            .then(res => {
                setListPage(res.data.data.records)
                setPagination({
                    url: url,
                    total: res.data.data.total,
                    size: res.data.data.size,
                    current: res.data.data.current,
                    page: res.data.data.page
                })
                setIsPost(false)
                setPostContent({})
            })
        router.push("/listPage")
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    return (
        <header className={`${scroll && 'bg-[#141414]'}`}>
            <div className="flex items-center space-x-2 md:space-x-10">
                <Link href="/">
                    <img src="/long_logo.svg"
                         width={100}
                         height={100}
                         className="cursor-container object-contain"
                         alt="Breeze Video"
                    />
                </Link>
                <BasicMenu/>

                <ul className="hidden space-x-4 md:flex">
                    <li className="headerLink"><Link href="/">Home</Link></li>
                    <li className="headerLink">
                        <div onClick={() => {handleClick(requests.fetchPageMovies)}}>
                            Movies
                        </div>
                    </li>
                    <li className="headerLink">
                        <div onClick={() => {handleClick(requests.fetchPageTopRated)}}>
                            New & Popular
                        </div>
                    </li>
                    <li className="headerLink">
                        <div onClick={() => {
                            auth.post(
                                requests.fetchUserFavorites + `?pageNum=1&pageSize=${DEFAULT_PAGINATION_SIZE}`,
                                {'userId': session?.user.userid})
                                .then(res => {
                                    setListPage(res.data.data.records)
                                    setPagination({
                                        url: requests.fetchUserFavorites,
                                        total: res.data.data.total,
                                        size: res.data.data.size,
                                        current: res.data.data.current,
                                        page: res.data.data.page
                                    })
                                    setIsPost(true)
                                    setPostContent({'userId': session?.user.userid})
                                })
                            router.push("/listPage")
                        }}>
                            My List
                        </div>

                    </li>
                </ul>
            </div>

            <div className="flex items-center space-x-4">
                <div className="pr-8"><SearchBox /></div>
                <Link href="account">
                    <Avatar/>
                </Link>
            </div>
        </header>
    );
}

export default Header;