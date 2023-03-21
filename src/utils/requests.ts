import {BASE_URL} from "@/constants/const";

const requests = {
    fetchBanner: `${BASE_URL}/banner`,
    fetchTopRated: `${BASE_URL}/info/topRated`,
    fetchActionMovies: `${BASE_URL}/info/topRatedAndNumByType/Action`,
    fetchComedyMovies: `${BASE_URL}/info/topRatedAndNumByType/Comedy`,
}

export default requests