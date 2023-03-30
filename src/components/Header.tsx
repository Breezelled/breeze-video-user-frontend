import {BellIcon, SearchIcon} from "@heroicons/react/solid";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import {useEffect, useState} from "react";
import useAuth from "@/hooks/useAuth";
function Header() {
    const [scroll, setScroll] = useState(false)
    const {logOut} = useAuth()

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
                <img src="/long_logo.svg"
                     width={100}
                     height={100}
                     className="cursor-container object-contain"
                     alt="Breeze Video"
                />
                <ul className="hidden space-x-4 md:flex">
                    <li className="headerLink">Home</li>
                    <li className="headerLink">Movies</li>
                    <li className="headerLink">New & Popular</li>
                    <li className="headerLink">My List</li>
                </ul>
            </div>

            <div className="flex items-center space-x-4">
                <SearchIcon className="hidden h-6 w-6 sm:inline"/>
                <BellIcon className="h-6 w-6"/>
                <Link href="/account">
                    <Avatar />
                </Link>
            </div>
        </header>
    );
}

export default Header;