import axios from "@/lib/axios";
import {signOut, useSession} from "next-auth/react";

export const useRefreshToken = () => {
    const { data: session } = useSession();

    const refreshToken = async () => {
        const res = await axios.post("/auth/token", {
            refreshToken: session?.user.refreshToken,
        });
        if (session) session.user.accessToken = res.data.data.accessToken;
        else signOut();
    };
    return refreshToken;
};