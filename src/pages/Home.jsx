import { useState } from "react";
import CreatePost from "../components/core/post/CreatePost";
import ShowPosts from "../components/core/post/ShowPosts";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className=" w-full lg:w-[40%] items-center justify-between p-5 space-y-2 mt-16 overflow-hidden">

            <div
            >
                <div className="flex items-center justify-between w-full gap-x-3"
                    onClick={() => setIsModalOpen(true)}

                >
                    <input type="text" placeholder="Write something to post" className="w-full rounded-lg h-14 p-3 text-lg" />

                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded max-w-maxContent"
                    >
                        Create Post
                    </button>
                </div>

                <CreatePost
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>

            <div>
                <ShowPosts />
            </div>
        </div>
    );
};

export default Home;
