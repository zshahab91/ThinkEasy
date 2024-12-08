"use client";
import { useAppSelector } from "@/store/store";
import { IPostState } from "@/interfaces/post";
import ProducList from "../posts";
import Loading from "../loading";
import Header from "../header";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';


const MainPage = () => {
    const loading = useAppSelector((state: { post: IPostState }) => state.post.loading);
    const router = useRouter();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            router.push('/login');
        } else {
            router.push('/')
        }
    }, [router, token])

    return (
        token && <>
            <Header />
            {!loading ? <ProducList /> : <Loading />}
        </>
    )
};

export default MainPage;
