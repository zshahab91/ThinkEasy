"use client";
import { ILogin } from "@/interfaces/auth";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { setUserDataState } from "@/store/authSlice";
import { useAppDispatch } from "@/store/store";
import Link from "next/link";
import { login } from "@/services/userService";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';

const Login = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const schema = yup.object({
        email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    }).required();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: ILogin) => {
        try {
            const res = await login(data);
            if(res){
                dispatch(setUserDataState(res.user));
                router.push('/');
            }
        } catch (err: any) {
            toast.error(`Error: ${err.response?.data?.message}`, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    };
    return (
        <div className="flex flex-row justify-center items-center p-4">
            <div className="flex gap border border-1 border-black p-20 place-items-center">
                <form className="w-full max-w-sm " onSubmit={handleSubmit(onSubmit)}>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
                                Email
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => <input {...field}
                                    className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ${errors.email?.message ? "border-red-500 focus:border-red-500" : ""}`}
                                    id="inline-email" type="text" />
                                }
                            />
                            <p className="text-red-500 text-xs italic">{errors.email?.message}</p>

                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                                Password
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => <input {...field}
                                    className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ${errors.password?.message ? "border-red-500 focus:border-red-500" : ""}`}
                                    id="inline-password"
                                    type="password"
                                    placeholder="******" />

                                }
                            />
                            <p className="text-red-500 text-xs italic">{errors.password?.message}</p>

                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <label className="md:w-2/3 block text-gray-500 font-bold hover:text-blue-200">
                            <a href="" className="text-sm">
                                Forget Password
                            </a>
                        </label>
                        <label className="md:w-2/3 block text-gray-500 font-bold hover:text-blue-200">
                            <Link className="text-sm" href="/signUp" >Create account</Link>
                        </label>

                    </div>
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                Sign in
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};
export default Login;
