import {BASE_URL, INDEX_ROW_LIMIT_NUM, INTEREST_TYPE_COUNT_LIMIT_NUM} from "@/constants/const";

const requests = {
    // home page
    fetchBanner: `${BASE_URL}/banner`,
    fetchTopRated: `${BASE_URL}/info/topRated`,
    fetchUserInterestTypeMovies: `/info/topRatedAndNumByType/`,
    fetchActionMovies: `${BASE_URL}/info/topRatedAndNumByType/Action/${INDEX_ROW_LIMIT_NUM}`,
    fetchComedyMovies: `${BASE_URL}/info/topRatedAndNumByType/Comedy/${INDEX_ROW_LIMIT_NUM}`,
    fetchTopNumType: `${BASE_URL}/info/topNumType/${INTEREST_TYPE_COUNT_LIMIT_NUM}`,
    favorites: `/favorites`,
    fetchUserFavorites: `/favorites/user`,
    likes: `/likes`,
    fetchUserLikes: `/likes/user`,
    fetchPersonalizedRecommendation: '/info/recommend',
    comments: `/reviews/`,

    // login page
    fetchLoginImage: `${BASE_URL}/loginImage/login`,
    signUp: `${BASE_URL}/auth/register`,
    signIn: `${BASE_URL}/auth/login`,
    token: `${BASE_URL}/auth/token`,
    saveInterest: `/user/saveInterest`
}

export default requests