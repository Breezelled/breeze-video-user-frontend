import Head from "next/head";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import {CheckIcon} from "@heroicons/react/outline";
import {Props} from "@/components/Interest/data";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Image from "next/image";
import {BASE_URL} from "@/constants/const";
import {useRecoilState} from "recoil";
import {interestState} from "@/atoms/interestAtom";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import {useState} from "react";
import Loader from "@/components/Interest/Loader";
import requests from "@/utils/requests";
import {useRouter} from "next/router";
import {signOut} from "next-auth/react";
import {useSession} from "next-auth/react";

function Interest({genres}: Props) {
    const router = useRouter()
    const auth = useAuth()
    const { data: session, update } = useSession();
    const checkIconLi = (text: string) => {
        return (<li className="checkLi">
            <CheckIcon className="checkIcon"/>
            {text}
        </li>)
    }

    const saveUserPreference = async () => {
        setLoading(true)
        console.log(requests.saveInterest)
        await auth.put(requests.saveInterest, {'email': session?.user?.email, "types": interests},
        ).then((res) => {
            update({interestType: res.data.data});
            router.push("/")
            setLoading(false)
        }).catch((error) => console.log(error.message))
            .finally(() => setLoading(false))
    }

    const [interests, setInterests] = useRecoilState(interestState)
    const [disable, setDisable] = useState(0)
    const [loading, setLoading] = useState(false)

    console.log(interests)
    console.log(disable)
    return (
        <div>
            <Head>
                <title>Breeze Video</title>
                <meta name="description" content="Breeze Video"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <header className="border-b border-white/10 bg-[#141414]">
                <Link href="/">
                    <img className="cursor-pointer object-contain"
                         src="/long_logo.svg"
                         width={150}
                         height={90}
                         alt="Breeze Video"
                    />
                </Link>
                <button className="text-lg font-medium hover:underline"
                        onClick={() => signOut()}>
                    Log Out
                </button>
            </header>

            <main className="mx-auto pt-28 max-w-5xl pb-12 transition-all md:px-10">
                <h1 className="mb-3 text-3xl font-medium">
                    Pick some favorite video genres for you
                </h1>
                <h1 className={(disable < 3 || disable > 6) ? "text-red-500" : "text-white"}>
                    At least choose 3 genres &nbsp; &nbsp; &nbsp;{disable} / 6
                </h1>

                <ul>
                    {checkIconLi("Recommendations just for you.")}
                    {checkIconLi("Tell community your thoughts in the comments.")}
                </ul>

                <div className="flex w-full items-center justify-center mt-4">
                    <Box sx={{flexGrow: 1}}>
                        <Grid container spacing={{xs: 4, md: 5}}>
                            {Array.from(Array(genres.length)).map((_, index) => (
                                <Grid xs={6} sm={6} md={4} key={index}>
                                    <div className="relative h-48 min-w-[180px] transition duration-200 ease-out
                                                    md:h-64 md:min-w-[260px] text-2xl md:text-4xl text-white/60
                                                    font-semibold"
                                    >
                                        <Checkbox icon={<FavoriteBorder color="warning"
                                                                        className="h-8 w-8 md:h-11 md:w-11" />}
                                                  checkedIcon={<Favorite color="warning"
                                                                         className="h-8 w-8 md:h-11 md:w-11" />}
                                                  onChange={() => {
                                                      if (interests?.includes(genres[index].type)) {
                                                          const temp = [...interests]
                                                          temp.splice(temp.indexOf(genres[index].type), 1)
                                                          setInterests(temp)
                                                          setDisable(disable - 1)
                                                      } else {
                                                          setInterests([...interests, genres[index].type])
                                                          setDisable(disable + 1)
                                                      }
                                                  }}
                                                  className="absolute transform right-1"
                                        />
                                        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2
                                                -translate-y-1/2 hover:scale-110 cursor-default transition duration-200">
                                            {genres[index].type}
                                        </h1>
                                        <Image className="object-cover opacity-60 -z-50 rounded"
                                               src={`${BASE_URL}/s3/${genres[index].posterUrl}`}
                                               alt={genres[index].type}
                                               fill
                                               sizes="50vw"
                                        />
                                    </div>
                                </Grid>
                            ))}
                            <Grid xs={6} sm={6} md={4} className="flex items-center justify-center">
                                <button color="warning" disabled={disable < 3 || disable > 6 || loading}
                                        className="mx-auto w-2/3 my-auto rounded-2xl text-xl border-2 text-orange-300
                                        scale-125 md:scale-150 shadow py-4 border-[#eb6d38] hover:bg-orange-300/10
                                        disabled:hover:bg-[gray]/10 disabled:border-[gray] disabled:bg-[gray]/10
                                        disabled:text-[gray]"
                                        onClick={saveUserPreference}
                                        >
                                    {loading ? (
                                        <Loader color="dark:fill-[gray]" />
                                    ) : (
                                        'Confirm'
                                    )}
                                </button>
                            </Grid>
                        </Grid>
                    </Box>
                </div>

            </main>
        </div>
    );
}

export default Interest;