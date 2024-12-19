import { useState } from "react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import {
    Card,
    CardContent,
    // CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { selectUserToken } from "@/redux/user/user.selector";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "@/redux/post/post.slice";

const PostForm = () => {


    const token = useSelector(selectUserToken);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
    })

    const reset = () => {
        setFormData({
            title: "",
            content: "",
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        dispatch(createPost({formData, token}))
        reset()
    };
    
  return (
      <Card className="w-[550px]">
                      <CardHeader>
                          <CardTitle>Create New Post</CardTitle>
                          {/* <CardDescription>
                              Join us today and start exploring the world 😊
                          </CardDescription> */}
                      </CardHeader>
                      <CardContent>
                          <form id="post-form" onSubmit={handleSubmit}>
                              <div className="grid w-full items-center gap-4">
                                  <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="title">Title</Label>
                                      <Input
                                          id="title"
                                          value={formData.title}
                                          placeholder="Your full name"
                                          required
                                          onChange={(e) => {
                                              setFormData({
                                                  ...formData,
                                                    title: e.target.value,
                                              });
                                          }}
                                      />
                                  </div>
                                  <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="content">Content</Label>
                                      <Textarea
                                          id="content"
                                          value={formData.content}
                                          required
                                          placeholder="Post content..."
                                          onChange={(e) => {
                                              setFormData({
                                                  ...formData,
                                                  content: e.target.value,
                                              });
                                          }}
                                      />
                                  </div>
                              </div>
                          </form>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                          <Button variant="outline" onClick={reset}>
                              Reset
                          </Button>
                          <Button form="post-form" type="submit">Create Post</Button>
                      </CardFooter>
                  </Card>
  )
}

export default PostForm