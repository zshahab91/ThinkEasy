import React, {useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IAddPost, IPostState } from "@/interfaces/post";
import { setShowModalPostState } from "@/store/postSlice";
import { addPost } from "@/services/post.service";
import { toast } from "react-toastify";

const initialPost: IAddPost = {
    content:"",
    title:''
}
const ModalPost = () => {
    const dispatch = useAppDispatch();
    const showModal = useAppSelector((state: { post: IPostState }) => state.post.showModal);
    const [currentPost, setCurrentPost] = useState<IAddPost>(initialPost);

    const resetState = () => {
        dispatch(setShowModalPostState());
    }
    const savePost = async () => {
        try {
           await addPost(currentPost);
           resetState();
        } catch (err: any) {
            toast.error(`Error: ${err.response?.data?.message}`, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            resetState();
        }
    };

    return (
        showModal &&
        <div className="overflow-x-auto my-8 mx-2 shadow-inner">
            <div className={`fixed top-0 left-0 right-0 z-50 items-center justify-center my-auto w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full `}>
                <div className="relative w-full max-w-2xl max-h-full border m-auto rounded  shadow-2xl">
                    <form className="relative bg-white rounded-lg shadow ">
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Add new post
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " onClick={resetState}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-12 space-y-12">
                            <div className="grid grid-cols-12 gap-12">
                                <div className="col-span-12 sm:col-span-12">
                                    <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 "> Title</label>
                                    <input
                                        value={currentPost?.title}
                                        onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                                        className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`}
                                        id="full_name" type="text" />

                                </div>
                                <div className="col-span-12 sm:col-span-12">
                                    <label htmlFor="spouse" className="block mb-2 text-sm font-medium text-gray-900 "> Content</label>
                                    <textarea
                                        value={currentPost?.content}
                                        rows={6}
                                        onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                                        className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`}
                                        id="spouse" />

                                </div>
                            </div>
                        </div>
                        <div className="flex items-center p-6 space-x-3  border-t border-gray-200 rounded-b">
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={savePost}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};
export default ModalPost;