/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../services/operations/postApi";
import { useNavigate } from "react-router-dom";

const NewPostModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("caption", data.caption);
        if (data.media[0]) {
            formData.append("image", data.media[0]);
        }
        console.log([...formData.entries()]);
        dispatch(createPost(formData, token, navigate));
        reset();
    };


    return (
        isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">Create Post</h2>
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-black"
                            onClick={onClose}
                        >
                            &times;
                        </button>
                    </div>
                    <form
                        className="p-4"
                        onSubmit={handleSubmit(onSubmit)}
                        encType="multipart/form-data"
                    >
                        <textarea
                            className="w-full p-2 border rounded resize-none"
                            rows="4"
                            placeholder="What's on your mind?"
                            {...register("caption", { required: true })}
                        ></textarea>
                        <div className="mt-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*, video/*"
                                    className="hidden"
                                    {...register("media")}
                                />
                                <span className="p-2 bg-blue-500 text-white rounded">
                                    Upload Media
                                </span>
                            </label>
                        </div>
                        <div className="p-4 border-t flex justify-end space-x-2">
                            <button
                                type="button"
                                className="px-4 py-2 text-gray-600 border rounded"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-blue-500 rounded"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default NewPostModal;
