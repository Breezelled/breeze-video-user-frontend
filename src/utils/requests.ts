import {BASE_URL, INDEX_ROW_LIMIT_NUM, INTEREST_TYPE_COUNT_LIMIT_NUM} from "@/constants/const";

const requests = {
    // home page
    fetchBanner: `${BASE_URL}/banner`,
    fetchTopRated: `${BASE_URL}/info/topRated`,
    fetchActionMovies: `${BASE_URL}/info/topRatedAndNumByType/Action/${INDEX_ROW_LIMIT_NUM}`,
    fetchComedyMovies: `${BASE_URL}/info/topRatedAndNumByType/Comedy/${INDEX_ROW_LIMIT_NUM}`,
    fetchTopNumType: `${BASE_URL}/info/topNumType/${INTEREST_TYPE_COUNT_LIMIT_NUM}`,

    // login page
    fetchLoginImage: `${BASE_URL}/loginImage/login`,
    signUp: `${BASE_URL}/user`,
    signIn: `${BASE_URL}/user/login`,
    logOut: `${BASE_URL}/user/logOut`
}

export default requests