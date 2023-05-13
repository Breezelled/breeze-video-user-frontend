import { useState } from "react";
import {SearchIcon} from "@heroicons/react/solid";
import {XIcon} from "@heroicons/react/outline";
import {useRecoilState} from "recoil";
import {listPageState} from "@/atoms/listAtom";
import {isPostState, listPaginationState, postContentState} from "@/atoms/paginationAtom";
import requests from "@/utils/requests";
import useAuth from "@/hooks/useAuth";
import {DEFAULT_PAGINATION_SIZE} from "@/constants/const";
import {useRouter} from "next/router";
import {inputState} from "@/atoms/searchAtom";

function SearchBox() {
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useRecoilState(inputState);
    const [listPage, setListPage] = useRecoilState(listPageState)
    const [pagination, setPagination] = useRecoilState(listPaginationState)
    const [postContent, setPostContent] = useRecoilState(postContentState)
    const [isPost, setIsPost] = useRecoilState(isPostState)
    const auth = useAuth()
    const router = useRouter()

    const handleSearch = () => {
        if (!isActive) {
            setIsActive(true);
        } else{
            auth.post(
                requests.fetchSearchResult + `?pageNum=1&pageSize=${DEFAULT_PAGINATION_SIZE}`,
                {'content': inputValue})
                .then(res => {
                    setListPage(res.data.data.records)
                    setPagination({
                        url: requests.fetchSearchResult,
                        total: res.data.data.total,
                        size: res.data.data.size,
                        current: res.data.data.current,
                        page: res.data.data.page
                    })
                    setIsPost(true)
                    setPostContent({'content': inputValue})
                })
            router.push("/listPage")
        }
    };

    const handleCancel = () => {
        setIsActive(false);
        setInputValue("");
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className={`search-box ${isActive ? "active" : ""}`}>
            <input
                type="text"
                placeholder="Type to search.."
                className={`search-input ${isActive ? "active" : ""}`}
                value={inputValue}
                onChange={handleInputChange}
            />
            <div className={`search-icon ${isActive ? "active" : ""}`} onClick={handleSearch}>
                <SearchIcon className="h-6 w-6 inline"/>
            </div>
            <div className={`cancel-icon ${isActive ? "active" : ""}`} onClick={handleCancel}>
                <XIcon className="h-6 w-6 inline"/>
            </div>
        </div>
    );
};

export default SearchBox;
