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

function Comment() {
    const [curVideo, setCurVideo] = useRecoilState(videoState)
    const [comments, setComments] = useRecoilState(commentState)
    const auth = useAuth()

    useEffect(() => {
        if (curVideo != null){
            auth.get(requests.comments + curVideo.id)
                .then(res => {
                    setComments(res.data.data)
                })
        }
    }, [curVideo])

    return (
        <div>
            <span className="text-lg md:text-xl">User Reviews</span>
            {comments.length > 0 ? (
                <List className="bg-[#fff4e5] rounded-xl" sx={{width: '100%'}}>
                    {comments.map((comment) => (
                        <div key={comment.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={comment.id + comment.author} src="/def_avatar.svg"/>
                                </ListItemAvatar>
                                <ListItemText
                                    className="text-orange-500"
                                    primary={comment.author}
                                    secondary={
                                        <Fragment>
                                            <Typography
                                                sx={{display: 'inline'}}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                            </Typography>
                                            {comment.content}
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