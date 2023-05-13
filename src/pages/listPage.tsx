import Head from "next/head";
import Header from "@/components/Header/Header";
import React from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {listPageState} from "@/atoms/listAtom";
import ListPageItem from "@/components/ListPageItem";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {isPostState, listPaginationState, postContentState} from "@/atoms/paginationAtom";
import useAuth from "@/hooks/useAuth";
import {DEFAULT_PAGINATION_SIZE} from "@/constants/const";
import requests from "@/utils/requests";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function ListPage() {
    const [listPage, setListPage] = useRecoilState(listPageState)
    const [pagination, setPagination] = useRecoilState(listPaginationState)
    const isPost = useRecoilValue(isPostState)
    const postContent = useRecoilValue(postContentState)
    const auth = useAuth()

    console.log(listPage)
    console.log(isPost)
    console.log(postContent)

    if (listPage.length == 0 || pagination == null) {
        return (
            <>
                <Head>
                    <title>{'Breeze Video'}</title>
                    <meta name="description" content="Breeze Video"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <Header/>
            </>
        )
    }

    return (
        <div>
            <Head>
                <title>Breeze Video</title>
                <meta name="description" content="Breeze Video"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>

            <div className="flex-col items-center pt-20 md:px-8 lg:px-16">
                {listPage.map((video) => (
                    <ListPageItem key={video.id} video={video}/>
                ))}
            </div>

            <ThemeProvider theme={darkTheme}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{mt: 4, mb: 4}}
                >
                    <Pagination count={pagination.page}
                                color="primary"
                                showFirstButton
                                showLastButton
                                page={pagination.current}
                                onChange={(event, value) => {
                                    if (isPost) {
                                        auth.post(
                                            pagination.url + `?pageNum=${value}&pageSize=${DEFAULT_PAGINATION_SIZE}`,
                                            postContent)
                                            .then(res => {
                                                setListPage(res.data.data.records)
                                                setPagination({
                                                    url: pagination.url,
                                                    total: res.data.data.total,
                                                    size: res.data.data.size,
                                                    current: res.data.data.current,
                                                    page: res.data.data.page
                                                })
                                            })
                                    } else {
                                        auth.get(
                                            pagination.url + `?pageNum=${value}&pageSize=${DEFAULT_PAGINATION_SIZE}`)
                                            .then(res => {
                                                setListPage(res.data.data.records)
                                                setPagination({
                                                    url: pagination.url,
                                                    total: res.data.data.total,
                                                    size: res.data.data.size,
                                                    current: res.data.data.current,
                                                    page: res.data.data.page
                                                })
                                            })
                                    }

                                    window.scrollTo(0, 0);
                                }}
                    />
                </Stack>
            </ThemeProvider>

        </div>
    );
}

export default ListPage;