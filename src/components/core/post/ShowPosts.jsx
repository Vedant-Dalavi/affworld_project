/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../../../services/apiconnector";
import { postEndPoints } from "../../../services/apis";
import PostCard from "./PostCard";
import { setPosts } from "../../../redux/slices/postSlice";

const { GET_ALL_POST } = postEndPoints;

const ShowPosts = () => {
    const dispatch = useDispatch();
    const { allPost } = useSelector((state) => state.posts); // Access posts from Redux store
    const { token } = useSelector((state) => state.auth); // Access token from Redux store

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await apiConnector("GET", GET_ALL_POST, null, {
                    Authorization: `Bearer ${token}`,
                });
                dispatch(setPosts(response.data.posts)); // Update Redux store
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts(); // Fetch posts on component mount
    }, []); // Dependency array should be empty to avoid infinite re-renders

    return (
        <div>
            {allPost?.length > 0 ? (
                <div className="flex flex-col gap-y-3">
                    {allPost.map((post) => (
                        <div key={post._id} className="">
                            <PostCard
                                avatar={post.user.image} // Corrected access to user details
                                firstName={post.user.firstName}
                                lastName={post.user.lastName}
                                caption={post.caption}
                                image={post.image}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div> // Display loading message if no posts
            )}
        </div>
    );
};

export default ShowPosts;
