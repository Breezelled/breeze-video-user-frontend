import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import {useState} from "react";
import {useSession} from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import requests from "@/utils/requests";
import {useRecoilState, useRecoilValue} from "recoil";
import {videoState} from "@/atoms/modalAtom";
import {commentState} from "@/atoms/commentAtom";
import {Comment} from "@/components/Comment/data";

function CommentBox() {
    const [italic, setItalic] = useState(false);
    const [fontWeight, setFontWeight] = useState('normal');
    const [text, setText] = useState("")
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {data: session} = useSession();
    const auth = useAuth()
    const curVideo = useRecoilValue(videoState)
    const [comments, setComments] = useRecoilState(commentState)

    return (
        <div>
            <FormControl>
                <FormLabel className="text-white text-lg md:text-xl">
                    {`Your comment`}
                    {session?.user.username == null ? (
                        <span className="text-red-500 text-sm">&nbsp;&nbsp;&nbsp; Please set your username first.</span>
                    ): (
                        ``
                    )}
                </FormLabel>
                <Textarea
                    className="bg-[#fff4e5]"
                    disabled={session?.user.username == null}
                    placeholder="Type something here…"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    minRows={3}
                    endDecorator={
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 'var(--Textarea-paddingBlock)',
                                pt: 'var(--Textarea-paddingBlock)',
                                borderTop: '1px solid',
                                borderColor: 'divider',
                                flex: 'auto',
                            }}
                        >
                            <IconButton
                                variant="plain"
                                color="neutral"
                                onClick={(event) => setAnchorEl(event.currentTarget)}
                            >
                                <FormatBold/>
                                <KeyboardArrowDown fontSize="medium"/>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                size="sm"
                                placement="bottom-start"
                                sx={{'--ListItemDecorator-size': '24px'}}
                            >
                                {['200', 'normal', 'bold'].map((weight) => (
                                    <MenuItem
                                        key={weight}
                                        selected={fontWeight === weight}
                                        onClick={() => {
                                            setFontWeight(weight);
                                            setAnchorEl(null);
                                        }}
                                        sx={{fontWeight: weight}}
                                    >
                                        <ListItemDecorator>
                                            {fontWeight === weight && <Check fontSize="small"/>}
                                        </ListItemDecorator>
                                        {weight === '200' ? 'lighter' : weight}
                                    </MenuItem>
                                ))}
                            </Menu>
                            <IconButton
                                variant={italic ? 'soft' : 'plain'}
                                color={italic ? 'primary' : 'neutral'}
                                aria-pressed={italic}
                                onClick={() => setItalic((bool) => !bool)}
                            >
                                <FormatItalic/>
                            </IconButton>
                            <Button className="appearance-none hover:bg-transparent text-black bg-[#fff4e5]"
                                    sx={{ml: 'auto'}}
                                    onClick={() => {
                                        auth.post(requests.comments,
                                            {
                                                'movieId': curVideo?.id,
                                                'author': session?.user.username,
                                                'content': text,
                                                'ipArea': session?.user.lastLoginArea
                                            })
                                            .then(res => {
                                                setComments([
                                                    {
                                                        id: res.data.data,
                                                        movieId: curVideo!.id,
                                                        author: session!.user.username,
                                                        content: text
                                                    },
                                                    ...comments
                                                ])
                                                setText("")
                                            })
                                    }}
                            >
                                Send
                            </Button>
                        </Box>
                    }
                    sx={{
                        minWidth: 300,
                        fontWeight,
                        fontStyle: italic ? 'italic' : 'initial',
                    }}
                />
            </FormControl>
        </div>
    );
}

export default CommentBox;