import Head from "next/head";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import Avatar from "@/components/Avatar";
import {useEffect, useState} from "react";
import AccountInfo from "@/components/AccountInfo";

function Account() {
    const { data: session } = useSession();
    const [createTime, setCreateTime] = useState<string | null>(null);
    useEffect(() => {
        if (session?.user) {
            setCreateTime(new Date(session?.user.createTime).toLocaleDateString())
        }
    }, [session]);

    const changeAvatar = () => {

    }

    return (
        <div>
            <Head>
                <title>Account - Breeze Video</title>
                <meta name="description" content="Breeze Video" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="bg-[#141414]">
                <Link href="/">
                    <img src="/long_logo.svg"
                         width={100}
                         height={100}
                         className="cursor-container object-contain"
                         alt="Breeze Video"
                    />
                </Link>
                <Link href="/account">
                    <Avatar />
                </Link>
            </header>

            <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
                <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
                    <h1 className="text-3xl md:text-4xl">Account</h1>
                    <div className="flex items-center gap-x-1.5">
                        {/*<img/>*/}
                        <p className="text-xs font-semibold text-[#555]">
                            Member since {createTime}
                        </p>
                    </div>
                </div>

                <AccountInfo />

                <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4
                md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0
                md:pb-0">
                    <h4>
                        Settings
                    </h4>
                    <p className="accountLink" onClick={() => changeAvatar()}>
                        Change avatar
                    </p>
                    <p className="accountLink md:text-left" onClick={() => signOut()}>
                        Sign out
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Account;