import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IPost, IPostState } from "@/interfaces/post";
import SearchBox from "../search";
import { getPostList } from "@/services/post.service";
import { setListPostsState, setShowModalPostState } from "@/store/postSlice";
import ModalPost from "./add";
import Link from "next/link";


const PostList = () => {
    const dispatch = useAppDispatch();
    const list = useAppSelector((state: { post: IPostState }) => state.post.postsState);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentList, setCurrentList] = useState<IPost[]>([]);


    const getData = async () => {
        const data = await getPostList();
        try {
            dispatch(setListPostsState(data));
            setCurrentList(list);
            getCurrentPageData(1);
        } catch (exceptionVar) {
            toast.error('Error!', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    };
    useEffect(() => {
        getData();
    }, []);


    // Calculate the total number of pages
    const totalPages = Math.ceil(list.length / 10);

    // Function to get the items for the current page
    const getCurrentPageData = useCallback((currentPage: number) => {
        const start = (currentPage - 1) * 10;
        const end = start + 10;
        const newData = list.slice(start, end);
        setCurrentList(newData);
    }, [list]);
    useEffect(() => {
        getCurrentPageData(1);
    }, [getCurrentPageData, list]);
    // Filter data based on the search term
    const filteredData = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        const newData = list.filter(item => {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.title.toString().includes(searchTerm) || item.content.toLowerCase().includes(searchTerm.toLowerCase())
        }
        );
        setCurrentList(newData);
    }

    // Handlers for changing pages
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            getCurrentPageData(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            getCurrentPageData(currentPage - 1);
        }
    };


    const handleDeletePost = (post: IPost) => {
        // dispatch(deletePoststate(post));
    }
    const openModalPost = () => {
        dispatch(setShowModalPostState());
    }

    return (

        (list) ? <>
            <SearchBox searchTerm={searchTerm} onSearch={(val) => filteredData(val)} />

            <div className="overflow-x-auto my-8 mx-2">
                <button className="shadow my-8 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={() => openModalPost()}>
                    Add Post
                </button>
                <ModalPost />
                <table className="table-auto border-collapse border  w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase text-center bg-gray-200  ">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th className="px-6 py-3">Content</th>
                            <th className="px-6 py-3"> Published </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentList.map((post, inx) => {
                            return (

                                <tr className="bg-white border-b  hover:bg-gray-50 " key={inx}>
                                    <td className="w-4 p-4 border">
                                        <div className="flex items-center">
                                            <input id={`checkbox-table-${post.id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " />
                                            <label htmlFor={`checkbox-table-${post.id}`} className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 border text-center">
                                        {post.id}
                                    </td>
                                    <td className="px-6 py-4 border text-center">
                                        {post.title}
                                    </td>
                                    <td className="px-6 py-4 border text-center">
                                        {post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}
                                    </td>
                                    <td className="px-6 py-4 border text-center">
                                        {post.published ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                        </svg>
                                            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                                            </svg>
                                        }
                                    </td>
                                    <td className="px-6 py-4 border text-center">
                                        <Link href={`/post/${post.id}`}>View</Link>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 text-white bg-blue-500 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 text-white bg-blue-500 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Next
                    </button>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="dark"
            /></>
            : null

    );
};

export default PostList;
