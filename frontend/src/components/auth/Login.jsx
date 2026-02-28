import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, Briefcase, GraduationCap } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({ email: "", password: "", role: "" });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.email || !input.password || !input.role) {
            toast.error("All fields are required");
            return;
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate("/");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => { if (user) navigate("/"); }, [user]);

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center p-4'>
            {/* Background effects */}
            <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full opacity-10 blur-3xl'></div>
            <div className='absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl'></div>

            <div className='relative w-full max-w-md'>
                {/* Logo */}
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-black text-white'>
                        Career<span className='text-purple-400'>Vedanta</span>
                    </h1>
                    <p className='text-gray-400 mt-2 text-sm'>Welcome back! Sign in to continue.</p>
                </div>

                {/* Card */}
                <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl'>
                    <h2 className='text-2xl font-black text-white mb-6'>Sign In</h2>

                    <form onSubmit={submitHandler} className='space-y-5'>
                        {/* Email */}
                        <div>
                            <Label className='text-gray-300 text-sm font-medium mb-2 block'>Email Address</Label>
                            <div className='relative'>
                                <Mail size={16} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                <Input
                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    placeholder="you@example.com"
                                    className='pl-10 bg-white/10 border-white/10 text-white placeholder-gray-500 rounded-xl focus:border-purple-400 focus:ring-purple-400/20 h-11'
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <Label className='text-gray-300 text-sm font-medium mb-2 block'>Password</Label>
                            <div className='relative'>
                                <Lock size={16} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                <Input
                                    type="password"
                                    name="password"
                                    value={input.password}
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className='pl-10 bg-white/10 border-white/10 text-white placeholder-gray-500 rounded-xl focus:border-purple-400 h-11'
                                />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div>
                            <Label className='text-gray-300 text-sm font-medium mb-3 block'>I am a</Label>
                            <div className='grid grid-cols-2 gap-3'>
                                {[
                                    { value: "student", label: "Job Seeker", icon: GraduationCap },
                                    { value: "recruiter", label: "Recruiter", icon: Briefcase }
                                ].map(({ value, label, icon: Icon }) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setInput({ ...input, role: value })}
                                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all font-medium text-sm ${
                                            input.role === value
                                                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/50'
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >
                                        <Icon size={16} />
                                        {label}
                                    </button>
                                ))}
                            </div>
                            {/* Hidden radio inputs for form compatibility */}
                            <input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className='hidden' />
                            <input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} className='hidden' />
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className='w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] mt-2'
                        >
                            {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Signing in...</> : "Sign In"}
                        </Button>
                    </form>

                    <p className='text-center text-gray-400 text-sm mt-6'>
                        Don't have an account?{' '}
                        <Link to="/signup" className='text-purple-400 font-semibold hover:text-purple-300 transition-colors'>
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;
