import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Fragment, useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {videoState} from "@/atoms/modalAtom";
import useAuth from "@/hooks/useAuth";
import requests from "@/utils/requests";
import {commentState} from "@/atoms/commentAtom";
import Pagination from '@mui/material/Pagination';
import {ExpandLess, ExpandMore} from "@mui/icons-material";

function Comment() {
    const [curVideo, setCurVideo] = useRecoilState(videoState)
    const [comments, setComments] = useRecoilState(commentState)
    const [expanded, setExpanded] = useState(Array(false))
    const auth = useAuth()
    const MAX_LENGTH = 500

    useEffect(() => {
        if (curVideo != null) {
            auth.get(requests.comments + "/" + curVideo.id)
                .then(res => {
                    setComments(res.data.data)
                    setExpanded(Array(comments.length).fill(false))
                })
        }
    }, [curVideo])

    return (
        <div>
            <span className="text-lg md:text-xl">User Reviews</span>
            {comments.length > 0 ? (
                <List className="bg-[#1e2021] rounded-xl" sx={{width: '100%'}}>
                    {comments.map((comment, index) => (
                        <div key={comment.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={comment.id + comment.author} src="/def_avatar.svg"/>
                                </ListItemAvatar>
                                <ListItemText
                                    className="text-[#79b3ea]"
                                    primary={comment.author}
                                    secondary={
                                        <Fragment>
                                            <Typography
                                                sx={{display: 'inline'}}
                                                component="span"
                                                variant="body2"
                                                color="text.#c7c3bd"
                                            >
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                            </Typography>
                                            {comment.content.length > MAX_LENGTH ? (
                                                <Fragment>
                      <span className="text-[#c7c3bd]">
                        {expanded[index] ? comment.content : comment.content.substring(0, MAX_LENGTH) + '...'}
                      </span>
                                                    <Typography
                                                        sx={{display: 'inline', cursor: 'pointer'}}
                                                        variant="body2"
                                                        onClick={() => {
                                                            const e = [...expanded]
                                                            e[index] = !e[index]
                                                            setExpanded(e)
                                                        }}
                                                        color="#c7c3bd"
                                                    >
                                                        {expanded[index] ? <ExpandLess/> : <ExpandMore/>} More
                                                    </Typography>
                                                </Fragment>
                                            ) : (
                                                <span className="text-[#c7c3bd]">{comment.content}</span>
                                            )}
                                        </Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" className="bg-gray-300"/>
                        </div>
                    ))}
                </List>

            ) : (
                <div>
                    <br/>
                    <span className="text-lg md:text-xl">No comments here yet.</span>
                </div>
            )}
        </div>
    );
}

export default Comment;