

import toast from "react-hot-toast";
import { postEndPoints } from "../apis"
import { apiConnector } from "../apiconnector";
import { newPost, setPosts } from "../../redux/slices/postSlice";
const { NEW_POST, GET_ALL_POST } = postEndPoints;


export function createPost(formData, token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        // dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", NEW_POST, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            })
            console.log("CREATE POST API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Post Created Successfully")
            dispatch(newPost(response.data.post))
            navigate("/")
        } catch (error) {
            console.log("CREATE POST API ERROR............", error)
            toast.error("Could Not Create Post")
        }
        // dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function getAllPost(token) {

    toast.loading("Fetching all post")

    return async (dispatch) => {
        try {
            const response = await apiConnector("GET", null, GET_ALL_POST, {
                Authorization: `Bearer ${token}`
            })


            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Post Created Successfully")
            dispatch(setPosts(response.data.post))

        } catch (error) {
            console.log("CREATE POST API ERROR............", error)
            toast.error("Could Not Fetch All Post")
        }
        // dispatch(setLoading(false))
        // toast.dismiss(toastId)
    }
}
