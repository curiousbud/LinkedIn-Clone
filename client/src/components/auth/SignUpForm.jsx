import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

const SignUpForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const queryClient = useQueryClient();

    const { mutate: signUpMutation, isLoading } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post("/auth/signup", data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Account created successfully");
        },
        onError: (err) => {
            const backendErrors = err.response?.data?.errors || {};
            setErrors(backendErrors); // Set errors for inline display

            const errorMessage = err.response?.data?.message || "Failed to create account";

            // Display specific error messages for email and username
            if (backendErrors.email) {
                toast.error(backendErrors.email);
            }
            if (backendErrors.username) {
                toast.error(backendErrors.username);
            }

            // Display a generic error message if no specific errors are found
            if (!backendErrors.email && !backendErrors.username) {
                toast.error(errorMessage);
            }
        },
    });

    const handleSignUp = (e) => {
        e.preventDefault();
        signUpMutation({ name, username, email, password });
    };

    return (
        <form onSubmit={handleSignUp} className='flex flex-col gap-4'>
            <div>
                <input
                    type='text'
                    placeholder='Full name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='input input-primary input-bordered w-full'
                    required
                />
                {errors.name && <p className='text-error text-sm'>{errors.name}</p>}
            </div>

            <div>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='input input-primary input-bordered w-full'
                    required
                />
                {errors.username && <p className='text-error text-sm'>{errors.username}</p>}
            </div>

            <div>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='input input-primary input-bordered w-full'
                    required
                />
                {errors.email && <p className='text-error text-sm'>{errors.email}</p>}
            </div>

            <div>
                <input
                    type='password'
                    placeholder='Password (6+ characters)'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='input input-primary input-bordered w-full'
                    required
                />
                {errors.password && <p className='text-error text-sm'>{errors.password}</p>}
            </div>

            <button type='submit' disabled={isLoading} className='btn btn-primary w-full text-white'>
                {isLoading ? <Loader className='size-5 animate-spin' /> : "Agree & Join"}
            </button>
        </form>
    );
};
export default SignUpForm;