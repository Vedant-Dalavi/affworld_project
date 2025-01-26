/* eslint-disable react/prop-types */
import { useState } from "react";

const PostCard = ({ avatar, firstName, lastName, caption, image }) => {
    const [readmore, setReadmore] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const description = readmore
        ? caption
        : `${caption.substring(0, 200)}`;

    const readmoreHandler = () => {
        setReadmore(!readmore);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col rounded-lg p-2 bg-white">
            {/* Avatar + User Name Section */}
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-x-2 p-2">
                    <img src={avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                    <div>
                        <p>{firstName} {lastName}</p>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="p-2 text-justify">
                {caption && (
                    <div className="">
                        {description}
                        <span
                            className="read-more text-blue-300 cursor-pointer"
                            onClick={readmoreHandler}
                        >{
                                caption.length > 200 &&
                                <div>

                                    {readmore ? ` show less` : ` read more`}

                                </div>
                            }
                        </span>
                    </div>
                )}
            </div>

            {/* Image Section */}
            {image && (
                <div className="p-2">
                    <img
                        src={image}
                        alt="Post"
                        className="rounded-lg cursor-pointer object-cover w-full h-[200px]"
                        onClick={openModal}
                    />
                </div>
            )}

            {/* Popup Modal */}
            {isModalOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 mx-auto flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div className="relative w-[90%] lg:w-[80%] lg:h-[80%] flex mx-auto bg-opacity-100">
                        <img
                            src={image}
                            alt="Popup Post"
                            className="rounded-lg max-w-full max-h-screen cursor-pointer"
                            onClick={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;
