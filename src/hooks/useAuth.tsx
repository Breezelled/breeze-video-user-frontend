import {useRouter} from "next/router";
import {createContext, useContext, useEffect, useMemo, useState} from "react";
import requests from "@/utils/requests";

function useAuth() {
    const [loading, setLoading] = useState(false)
    // TODO not finish User interface
    // const [user, setUser] = useState<User | null>(null)
    const signUp = async (email:string, password:string) => {
        setLoading(true)
        await fetch(requests.signUp, {
            method: 'post',
            body: JSON.stringify({'email': email, 'password': password}),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
            }).then((res) => res.json())
    }

    return (
        <div>

        </div>
    );
}

export default useAuth;