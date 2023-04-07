import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from "@/components/Header";
import Banner from "@/components/Banner/Banner";
import requests from "@/utils/requests";
import {Props} from "@/pages/data";
import Row from "@/components/Row/Row";
import useAuth from "@/hooks/useAuth";
import {useRecoilValue} from "recoil";
import {modalState} from "@/atoms/modalAtom";
import Modal from "@/components/Modal";
import Interest from "@/components/Interest/Interest";
import {INDEX_ROW_LIMIT_NUM} from "@/constants/const";
import React, {useEffect, useState} from "react";
import {Info} from "@/types/data";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
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


    // interest is null
    if (!interest) {
        return <Interest genres={genres}/>
    }
  return (
    <div className={`relative h-screen bg-gradient-to-b lg:h-[140vh] 
    ${showModal && "overflow-hidden"}`}>
      <Head>
        <title>Home - Breeze Video</title>
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
