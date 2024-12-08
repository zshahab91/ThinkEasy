"use client";
import Header from '@/components/header';
import { IPost } from '@/interfaces/post';
import { getPost } from '@/services/post.service';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState<IPost>();
    useEffect(() => {
        async function fetchData(id: string) {
            const res = await getPost(id);
            setPost(res);
        }
        id && fetchData(id.toString());
    }, [id])
    return (
        post &&
        <>
            <Header />
            <div className="flex flex-row justify-center items-center p-4">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                        <div className="bg-slate-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                <p className="text-gray-600 mb-4">{post.content}</p>
                                <p className="text-gray-600 mb-4">{post.authorId}</p>
                                <p className="text-gray-600 mb-4">{post.published ? 'Published' : 'Unpublished'}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
};
export default PostPage;
