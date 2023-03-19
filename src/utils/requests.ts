const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const requests = {
    fetchBanner: `${BASE_URL}/`,
    fetchTopRated: `${BASE_URL}/`,
    fetchActionMovies: `${BASE_URL}/`,
    fetchComedyMovies: `${BASE_URL}/`,
}

export default requests