import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from "@/components/Header/Header";
import Banner from "@/components/Banner/Banner";
import requests from "@/utils/requests";
import {Props} from "@/pages/data";
import Row from "@/components/Row/Row";
import useAuth from "@/hooks/useAuth";
import {useRecoilState, useRecoilValue} from "recoil";
import {modalState, videoState} from "@/atoms/modalAtom";
import Modal from "@/components/Modal";
import Interest from "@/components/Interest/Interest";
import {INDEX_ROW_LIMIT_NUM} from "@/constants/const";
import React, {useEffect, useState} from "react";
import {Info} from "@/types/data";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {likeState, listState} from "@/atoms/listAtom";
// home page
export default function Home({
    banner,
    topRated,
    genres,
                             }: Props) {
    const { data: session } = useSession();
    const auth = useAuth()
    const showModal = useRecoilValue(modalState)
    const interest = session?.user?.interestType != null
    const [userRows, setUserRows] = useState<React.ReactNode[]>([]);
    const [list, setList] = useRecoilState(listState)
    const [like, setLike] = useRecoilState(likeState)
    const curVideo = useRecoilValue(videoState)

    console.log("user:" + session?.user)
    console.log("interest:" + interest)
    console.log("interest:" + session?.user.interestType)
    // dynamic fetch user interest type row
    useEffect(() => {
        async function fetchData() {
            const types = session?.user?.interestType?.split('|') || [];
            const requestsPromises = types.map(type =>
                auth.get(`${requests.fetchUserInterestTypeMovies}${type}/${INDEX_ROW_LIMIT_NUM}`)
                    .then(res => res.data)
                    .then(data => data.data)
            );
            const results = await Promise.all(requestsPromises);

            const rows = results.map((videos, i) => (
                <Row key={types[i]} title={types[i]} videos={videos} />
            ));

            setUserRows(rows);
        }
        fetchData();
    }, [session?.user]);

    useEffect(() => {
        if (session?.user) {
            auth.post(requests.fetchUserFavorites, {'userId': session.user.userid})
                .then(res => {
                    setList(res.data.data)
                })
        }
    }, [session?.user])

    useEffect(() => {
        if (session?.user) {
            auth.post(requests.fetchUserLikes, {'userId': session.user.userid})
                .then(res => {
                    setLike(res.data.data)
                })
        }
    }, [session?.user])


    // interest is null
    if (!interest) {
        return <Interest genres={genres}/>
    }
  return (
    <div className={`relative h-screen bg-gradient-to-b lg:h-[140vh] 
    ${showModal && "overflow-hidden"}`}>
      <Head>
        <title>{curVideo?.name || 'Home'} - Breeze Video</title>
        <meta name="description" content="Breeze Video" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner banner={banner}/>
        <section className="md:space-y-24">
            <Row title="Top Rated" videos={topRated}/>
            {userRows}
            {list.length > 0 && <Row title="My List" videos={list}/>}
        </section>
      </main>
        {showModal && <Modal/>}
    </div>
  )
}

// server side rendering
export async function getServerSideProps()  {
    const [
        banner,
        topRated,
        genres,
    ] = await Promise.all([
        fetch(requests.fetchBanner).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchTopNumType).then((res) => res.json()),
    ])

    return {
        props: {
            banner: banner.data,
            topRated: topRated.data,
            genres: genres.data,
        }
    }
}
