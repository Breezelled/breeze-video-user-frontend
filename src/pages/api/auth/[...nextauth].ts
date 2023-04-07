import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import requests from "@/utils/requests";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            id: "Credentials",
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@mail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const {email, password, flag} = credentials as any
                let user, res = null
                if (flag === "signIn") {
                    res = await fetch(requests.signIn, {
                        method: "post",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            email, password
                        })
                    }).then((res) => res.json())
                        .then((data) => user = data.data.user)
                        .catch((error) => {
                            console.log(error.response)
                        })
                } else {
                    res = await fetch(requests.signUp, {
                        method: "post",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            email, password
                        })
                    }).then((res) => res.json())
                        .then((data) => user = data.data.user)
                        .catch((error) => {
                            console.log(error.response)
                        });
                }
                // console.log({user})
                // console.log({flag})

                if (user) {
                    return user
                }
                return null
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        // async signIn({user, account, profile, credentials, email}) {
        //     return true
        // },
        // async redirect({ url, baseUrl }) {
        //     console.log(baseUrl)
        //     return baseUrl
        // },
        async jwt({token, user, trigger, session}) {
            if (trigger === 'update' && session?.interestType) {
                // session is the data sent from the client in the update() function above
                // Note, that `session` can be any arbitrary object, remember to validate it!
                // if (typeof session.interestType === 'string') {
                    token.interestType = session?.interestType
                // }
            }
            return {...token, ...user};
        },
        async session({session, token, user}) {
            session.user = token as any;
            return session
        }
    },
    secret: "breeze-video",
    debug: true,
}
export default NextAuth(authOptions)