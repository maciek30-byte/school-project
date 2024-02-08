import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from '@mui/material';
import {fetchComments, fetchPosts, fetchUserById, fetchUserPosts} from "../services/AppService";
import {PostWithData} from "../models/appModels";
import {useUser} from "../context/UserContext";

interface PostsProps {
    isUserOnly?: boolean;
}

const AllPosts: React.FC<PostsProps> = ({isUserOnly}) => {
    const [posts, setPosts] = useState<PostWithData[]>([]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostBody, setNewPostBody] = useState('');
    const [loading, setLoading] = useState(false); // Add a loading state
    const { username, id } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading
            const postsData = isUserOnly ? await fetchUserPosts(id) : await fetchPosts();

            // Enhance posts with user and comments
            const enhancedPosts = await Promise.all(postsData.map(async (post) => {
                const userData = await fetchUserById(post.userId);

                const commentsData = await fetchComments(post.id);

                return { ...post, user: userData, comments: commentsData };
            }));

            setPosts(enhancedPosts);
            setLoading(false); // Finish loading
        };

        fetchData();
    }, []);

    const addComment = (postId: number, commentText: string) => {
        // Simulate adding a comment by updating the post's comments in the local state
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                const newComment = {
                    id: Date.now(), // Simulate a unique ID
                    postId: postId,
                    name: username,
                    body: commentText
                };
                return { ...post, comments: [...post.comments, newComment] };
            }
            return post;
        });

        // @ts-ignore
        setPosts(updatedPosts);
    };

    const deleteComment = (postId: number, commentId: number) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                // Filter out the comment to be deleted
                const filteredComments = post.comments.filter(comment => comment.id !== commentId);
                return { ...post, comments: filteredComments };
            }
            return post;
        });

        setPosts(updatedPosts);
    };

    const handleAddPost = () => {
        const newPost = {
            id: Date.now(), // Simulating a unique ID for the new post
            title: newPostTitle,
            body: newPostBody,
            userId: id,
            user: {
                id,
                name: username,
                username,
                email: 'superEmail',
                website: 'superWebsite',
            },
            comments: [] // New posts start with no comments
        };
        setPosts([newPost, ...posts]); // Add the new post at the beginning of the posts array
        setNewPostTitle(''); // Reset the title input field
        setNewPostBody(''); // Reset the body input field
    };

    if (loading) { // Display the spinner while loading
        return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
    }

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>Create a New Post</Typography>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel htmlFor="new-post-title">Title</InputLabel>
                    <OutlinedInput
                        id="new-post-title"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        label="Title"
                    />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel htmlFor="new-post-body">Body</InputLabel>
                    <OutlinedInput
                        id="new-post-body"
                        value={newPostBody}
                        onChange={(e) => setNewPostBody(e.target.value)}
                        multiline
                        rows={4}
                        label="Body"
                    />
                </FormControl>
                <Button variant="contained" onClick={handleAddPost}>Add Post</Button>
            </Box>
            {posts.map((post) => (
                <Box key={post.id} sx={{ p: 4, mb: 4, boxShadow: 3}}>
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography variant="subtitle2">
                        Posted by:
                        <span style={{color: '#009bd6', fontStyle: 'italic', marginLeft: 5}}>{post.user.name}</span>
                    </Typography>
                    <Typography paragraph>{post.body}</Typography>
                    <Typography>Comments:</Typography>
                    {post.comments.map((comment) => (
                        <Box key={comment.id} sx={{ ml: 2, mt: 1, display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                                <span style={{color: '#009bd6', fontStyle: 'italic', marginRight: 5}}>{comment.name}</span>
                                says:</Typography>
                            <Typography paragraph sx={{ flexGrow: 10 }}>{comment.body}</Typography>
                            {/* Delete button for comment */}
                            <Button
                                onClick={() => deleteComment(post.id, comment.id)}
                                disabled={comment.name !== username}
                                sx={{ ml: 1 }}>Delete</Button>
                        </Box>
                    ))}
                    <Box component="form" onSubmit={(e) => {
                        e.preventDefault();
                        // @ts-ignore
                        const formData = new FormData(e.target);
                        // @ts-ignore
                        const commentText = formData.get("commentText").toString();
                        addComment(post.id, commentText);
                        // @ts-ignore
                        e.target.reset(); // Reset form after submission
                    }}>
                        <TextField name="commentText" label="Your comment" variant="outlined" fullWidth />
                        <Button type="submit" sx={{ mt: 1 }}>Add Comment</Button>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default AllPosts;
