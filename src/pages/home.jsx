import Navbar from "../components/Global/Navbar";
import PostForm from "../components/Global/PostForm";
import { useState, useEffect } from "react";
import { fetchPosts } from "@/redux/post/post.slice";
import { useDispatch, useSelector } from "react-redux";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    // DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { selectUserToken } from "@/redux/user/user.selector";
import { Outlet } from "react-router-dom";

const Home = () => {
    const [open, setOpen] = useState(false);

    const token = useSelector(selectUserToken);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(token));
    }, [dispatch, token]);

    return (
        <div className="flex-col-center">
            <Navbar />
            <div className="absolute top-[100px] left-10">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>Open</DialogTrigger>
                    <DialogContent className="w-fit max-w-[70vw]">
                        <DialogHeader>
                            <DialogTitle>
                                <span className="text-2xl">
                                    Create New Post
                                </span>
                            </DialogTitle>
                            <DialogDescription>
                                Fill in the following information to create a
                                new post
                            </DialogDescription>
                        </DialogHeader>

                        <PostForm setOpen={setOpen} />
                    </DialogContent>
                </Dialog>
            </div>
            <Outlet/>
        </div>
    );
};

export default Home;
