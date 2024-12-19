/* eslint-disable react/prop-types */
import { FiUser } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    // CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { createLocalComment, createComment } from "@/redux/post/post.slice";
import { selectUserInfo, selectUserToken } from "@/redux/user/user.selector";
import { createInteraction } from "@/redux/post/post.slice";

const Post = ({ post, ...otherPorps }) => {
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [dislikeCount, setDislikeCount] = useState(post.dislikes);
    const [commentOpen, setCommentOpen] = useState(false);
    const [comment, setComment] = useState("");
    const userInfo = useSelector(selectUserInfo);
    const token = useSelector(selectUserToken);

    const dispatch = useDispatch();

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        dispatch(
            createLocalComment({
                postId: post._id,
                content: comment,
                owner: userInfo,
            })
        );
        dispatch(
            createComment({
                postId: post._id,
                content: comment,
                jwtToken: token,
            })
        );
        setComment("");
    };

    useEffect(() => {
        setLikeCount(post.likes);
        setDislikeCount(post.dislikes);
    }, [post.likes, post.dislikes]);

    useEffect(() => {
        if(post.interactions.length === 0) return;
        post.interactions.find((interaction) => {
            if (interaction.owner === userInfo._id) {
                if (interaction.type === "like") {
                    setLike(true);
                    setDislike(false);
                } else if (interaction.type === "dislike") {
                    setDislike(true);
                    setLike(false);
                }
            }
        });
    }, [post.interactions, userInfo._id]);

    return (
        <Card {...otherPorps}>
            <CardHeader>
                <div className="flex-between">
                    <div className="flex-start gap-4">
                        <div className="rounded-full overflow-hidden border shadow-sm p-2">
                            <FiUser className="text-2xl" />
                        </div>
                        <div>
                            <CardTitle>
                                <span className="text-lg">
                                    {post.owner.name}
                                </span>
                            </CardTitle>
                            <p className="text-xs mt-[-1px]">Few moments ago</p>
                        </div>
                    </div>
                    <BsThreeDots className="text-lg" />
                </div>
            </CardHeader>
            <CardContent>
                <h1 className="text-xl font-semibold">{post.title}</h1>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Possimus, eos! Quam maiores reprehenderit ullam, enim
                    laborum aliquam, non reiciendis dignissimos maxime corrupti
                    architecto debitis accusantium sapiente quia! Odio, magni
                    nam.
                </p>
            </CardContent>
            <CardFooter>
                <div className="flex-center w-fit gap-10">
                    <div className="flex-center w-fit gap-4">
                        <div
                            className="flex-center gap-1"
                            onClick={() => {
                                setLike(!like);
                                if (dislike) {
                                    setDislike(false);
                                    setDislikeCount(dislikeCount - 1);
                                }
                                setLikeCount(
                                    like ? likeCount - 1 : likeCount + 1
                                );
                                dispatch(
                                    createInteraction({
                                        postId: post._id,
                                        type: "like",
                                        jwtToken: token,
                                    })
                                );
                            }}
                        >
                            {like ? (
                                <AiFillLike className="text-xl" />
                            ) : (
                                <AiOutlineLike className="text-xl" />
                            )}
                            <span>{likeCount}</span>
                        </div>
                        <div
                            className="flex-center gap-1"
                            onClick={() => {
                                setDislike(!dislike);
                                if (like) {
                                    setLikeCount(likeCount - 1);
                                    setLike(false);
                                }
                                setDislikeCount(
                                    dislike ? dislikeCount - 1 : dislikeCount + 1
                                );
                                dispatch(
                                    createInteraction({
                                        postId: post._id,
                                        type: "dislike",
                                        jwtToken: token,
                                    })
                                );
                            }}
                        >
                            {dislike ? (
                                <AiFillDislike className="text-xl" />
                            ) : (
                                <AiOutlineDislike className="text-xl" />
                            )}
                            <span>{dislikeCount}</span>
                        </div>
                    </div>
                    <div
                        className="flex-center gap-1"
                        onClick={() => setCommentOpen(!commentOpen)}
                    >
                        <GoCommentDiscussion className="text-xl" />
                        <span>{post.comments.length}</span>
                    </div>
                </div>
            </CardFooter>
            {commentOpen && (
                <div className="w-full p-4 pt-0">
                    <form
                        className="flex-center gap-4"
                        onSubmit={handleCommentSubmit}
                    >
                        <Input
                            value={comment}
                            type="text"
                            placeholder="Comment"
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button type="submit">Post</Button>
                    </form>
                    <hr className="border mt-4" />
                    <div className="w-full h-[250px] overflow-auto">
                        {post.comments.length > 0 ? (
                            <div className="flex-col-center pt-4 pb-2 gap-2">
                                {post.comments.map((comment, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-1 w-[95%] shadow-sm px-4 py-2 rounded-lg border"
                                    >
                                        <div className="flex-between">
                                            <div className="flex-center w-fit gap-2">
                                                <div className="rounded-full overflow-hidden border shadow-sm p-1 w-fit">
                                                    <FiUser className="text-xl" />
                                                </div>
                                                <div className="flex flex-col gap-0">
                                                    <span className="text-md font-semibold">
                                                        {comment.owner.name}
                                                    </span>
                                                    <span className="text-[11px] mt-[-4px]">
                                                        Few moments ago
                                                    </span>
                                                </div>
                                            </div>
                                            <BsThreeDots className="text-lg" />
                                        </div>
                                        <div>
                                            <p className="ml-4  leading-[14px] text-sm">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-col-center h-full w-full">
                                <img
                                    src="/noComents.png"
                                    alt=""
                                    className="w-[150px]"
                                />
                                <p className="text-xl">There are no comment</p>
                                <p className="text-xs">
                                    Be the first one to comment
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Card>
    );
};

export default Post;
