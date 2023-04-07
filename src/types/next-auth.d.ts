import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            username: string
            phone: string
            nickname: string
            intro: string
            gender: string
            email: string
            createTime: Date
            lastLoginArea: string
            avatar: string
            interestType: string
            userid: string
            accessToken: string
            refreshToken: string
        }
    }
}