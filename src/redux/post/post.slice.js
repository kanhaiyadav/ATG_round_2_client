import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const createPost = createAsyncThunk(
    "post/createPost",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3000/api/post/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
                body: JSON.stringify(data.formData),
            });
            if (!response.ok) {
                return rejectWithValue(await response.json());
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const fetchPosts = createAsyncThunk(
    "post/fetchPosts",
    async (token, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3000/api/post/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                return rejectWithValue(await response.json());
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const createComment = createAsyncThunk(
    "post/createComment",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/api/post/comment/${data.postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.jwtToken}`,
                },
                body: JSON.stringify({ content: data.content }),
            });
            if (!response.ok) {
                return rejectWithValue(await response.json());
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const createInteraction = createAsyncThunk(
    "post/createInteraction",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/api/post/interaction/${data.postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.jwtToken}`,
                },
                body: JSON.stringify({ type: data.type }),
            });
            if (!response.ok) {
                return rejectWithValue(await response.json());
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);    


const initialState = {
    myPosts: [],
    otherPosts: [],
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        createLocalComment: (state, action) => {
            console.log(action.payload);
            const { postId, content, owner } = action.payload;
            const post = state.myPosts.find((post) => post._id === postId);
            if (post) {
                post.comments.push({
                    content,
                    owner,
                });
            } else {
                const post2 = state.otherPosts.find((post) => post._id === postId);
                if (post2) {
                    post2.comments.push({
                        content,
                        owner
                    });
                }
            }
        },
        // createLocalInteraction: (state, action) => {
        //     const { postId, type, owner } = action.payload;
        //     const post = state.myPosts.find((post) => post._id === postId);
        //     if (post) {

        //         post.interactions.find((interaction) => {
                    
        //         });
                
                
        //         post.interactions.push({
        //             type,
        //             owner,
        //         });
        //     } else {
        //         const post2 = state.otherPosts.find((post) => post._id === postId);
        //         if (post2) {
        //             post2.interactions.push({
        //                 type,
        //                 owner,
        //             });
        //         }
        //     }
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.myPosts.push(action.payload.data.post);
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.myPosts = action.payload.data.myPosts;
            state.otherPosts = action.payload.data.otherPosts;
        });
    },
});

export const { createLocalComment } = postSlice.actions;
export default postSlice.reducer;

