import Head from "next/head";
import Image from "next/image";
import requests from "@/utils/requests";
import {Inputs, LoginImage} from "@/pages/data";
import {BASE_URL} from "@/constants/const";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import useAuth from "@/hooks/useAuth";

function Login({
    loginImage
               }: LoginImage) {
    const [login, setLogin] = useState(false)
    const {signIn, signUp} = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
        if (login) {
            await signIn(email, password)
        } else {
            await signUp(email, password)
        }
    }

        return (
            <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center
             md:bg-transparent">
                <Head>
                    <title>Breeze Video</title>
                    <meta name="description" content="Breeze Video" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Image className="-z-10 !hidden opacity-60 object-cover sm:!inline"
                       src={loginImage}
                       alt=""
                       fill
                />
                <img className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
                     src="/long_logo.svg"
                     width={150}
                     height={150}
                     alt=""
                />

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0
                md:max-w-md md:px-14">
                    <h1 className="text-4xl font-semibold">Sign In</h1>
                    <div className="space-y-4">
                        <label className="inline-block w-full">
                            <input type="email"
                                   placeholder="Email"
                                   className="input"
                                   {...register('email', {required: true})}
                            />
                            {errors.email &&
                                <p className="loginError">
                                    Please enter a valid email.
                                </p>}
                        </label>
                        <label className="inline-block w-full">
                            <input type="password"
                                   placeholder="Password"
                                   className="input"
                                   {...register('password', {
                                       required: true,
                                       minLength:6,
                                       maxLength:64,
                                   })}
                            />
                            {errors.password &&
                                <p className="loginError">
                                    Your password must contain between 6 and 64 characters.
                                </p>}
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded bg-[#eb6d38] py-3 font-semibold"
                        onClick={() => setLogin(true)}
                    >
                        Sign In
                    </button>

                    <div className="text-[gray]">
                        New to Breeze Video?&nbsp;&nbsp;
                        <button
                            type="submit"
                            className="text-[gray] hover:underline hover:text-[#bbbbbb]"
                            onClick={() => setLogin(false)}
                        >
                            Sign up now
                        </button>
                    </div>
                </form>
            </div>
        );
    }

export default Login;

// server side rendering
export async function getServerSideProps()  {
    const [
        loginImage,
    ] = await Promise.all([
        fetch(requests.fetchLoginImage).then((res) => res.json()),
    ])

    return {
        props: {
            loginImage: BASE_URL + '/s3/' + loginImage.data,
        }
    }
}