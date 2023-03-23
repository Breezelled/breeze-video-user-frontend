import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from "@/components/Header";
import Banner from "@/components/Banner/Banner";
import requests from "@/utils/requests";
import {Props} from "@/pages/data";
import Row from "@/components/Row/Row";

const inter = Inter({ subsets: ['latin'] })

// home page
export default function Home({
    banner,
    topRated,
    actionMovies,
    comedyMovies,
                             }: Props) {
  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
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
            <Row title="Action" videos={actionMovies}/>
            <Row title="Comedy" videos={comedyMovies}/>
        </section>
      </main>
    {/*  Modal  */}
    </div>
  )
}

// server side rendering
export async function getServerSideProps()  {
    const [
        banner,
        topRated,
        actionMovies,
        comedyMovies,
    ] = await Promise.all([
        fetch(requests.fetchBanner).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
    ])

    return {
        props: {
            banner: banner.data,
            topRated: topRated.data,
            actionMovies: actionMovies.data,
            comedyMovies: comedyMovies.data,
        }
    }
}
