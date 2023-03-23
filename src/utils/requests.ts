import {BASE_URL} from "@/constants/const";

const requests = {
    // home page
    fetchBanner: `${BASE_URL}/banner`,
    fetchTopRated: `${BASE_URL}/info/topRated`,
    fetchActionMovies: `${BASE_URL}/info/topRatedAndNumByType/Action`,
    fetchComedyMovies: `${BASE_URL}/info/topRatedAndNumByType/Comedy`,

    // login page
    fetchLoginImage: `${BASE_URL}/loginImage/login`,
    signUp: `${BASE_URL}/user`
}

export default requests