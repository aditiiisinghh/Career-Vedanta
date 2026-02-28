import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, Mail, Lock, User, Phone, Upload, Briefcase, GraduationCap } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({ fullname: "", email: "", phoneNumber: "", password: "", role: "", file: "" });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
    const changeFileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] });

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) formData.append("file", input.file);

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => { if (user) navigate("/"); }, [user]);

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center p-4'>
            <div className='absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full opacity-10 blur-3xl'></div>
            <div className='absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl'></div>

            <div className='relative w-full max-w-md'>
                {/* Logo */}
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-black text-white'>
                        Career<span className='text-purple-400'>Vedanta</span>
                    </h1>
                    <p className='text-gray-400 mt-2 text-sm'>Join thousands finding their dream jobs.</p>
                </div>

                {/* Card */}
                <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl'>
                    <h2 className='text-2xl font-black text-white mb-6'>Create Account</h2>

                    <form onSubmit={submitHandler} className='space-y-4'>
                        {/* Name */}
                        <div>
                            <Label className='text-gray-300 text-sm font-medium mb-1.5 block'>Full Name</Label>
                            <div className='relative'>
                                <User size={15} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                <Input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler}
                                    placeholder="John Doe"
                                    className='pl-10 bg-white/10 border-white/10 text-white placeholder-gray-500 rounded-xl focus:border-purple-400 h-11' />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <Label className='text-gray-300 text-sm font-medium mb-1.5 block'>Email</Label>
                            <div className='relative'>
                                <Mail size={15} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                <Input type="email" name="email" value={input.email} onChange={changeEventHandler}
                                    placeholder="you@example.com"
                                    className='pl-10 bg-white/10 border-white/10 text-white placeholder-gray-500 rounded-xl focus:border-purple-400 h-11' />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <Label className='text-gray-300 text-sm font-medium mb-1.5 block'>Phone Number</Label>
                            <div className='relative'>
                                <Phone size={15} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                <Input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler}
                                    placeholder="9876543210"
                                    className='pl-10 bg-white/10 border-white/10 text-white placeholder-gray-500 rounded-xl focus:border-purple-400 h-11' />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <Label className='text-gray-300 text-sm font-medium mb-1.5 block'>Password</Label>
                            <div className='relative'>
                                <Lock size={15} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                                <Input type="password" name="password" value={input.password} onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className='pl-10 bg-white/10 border-white/10 text-white placeholder-gray-500 rounded-xl focus:border-purple-400 h-11' />
                            </div>
                        </div>

                        {/* Role + Profile in same row */}
                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <Label className='text-gray-300 text-sm font-medium mb-1.5 block'>I am a</Label>
                                <div className='flex flex-col gap-2'>
                                    {[
                                        { value: "student", label: "Job Seeker", icon: GraduationCap },
                                        { value: "recruiter", label: "Recruiter", icon: Briefcase }
                                    ].map(({ value, label, icon: Icon }) => (
                                        <button key={value} type="button"
                                            onClick={() => setInput({ ...input, role: value })}
                                            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                                                input.role === value
                                                    ? 'bg-purple-600 border-purple-500 text-white'
                                                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            <Icon size={14} /> {label}
                                        </button>
                                    ))}
                                </div>
                                <input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className='hidden' />
                                <input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} className='hidden' />
                            </div>

                            <div>
                                <Label className='text-gray-300 text-sm font-medium mb-1.5 block'>Profile Photo</Label>
                                <label className='flex flex-col items-center justify-center h-24 bg-white/5 border border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/10 transition-colors'>
                                    <Upload size={18} className='text-gray-400 mb-1' />
                                    <span className='text-xs text-gray-400 text-center px-2'>
                                        {input.file ? input.file.name?.slice(0, 12) + '...' : 'Upload photo'}
                                    </span>
                                    <Input type="file" accept="image/*" onChange={changeFileHandler} className='hidden' />
                                </label>
                            </div>
                        </div>

                        {/* Submit */}
                        <Button type="submit" disabled={loading}
                            className='w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] mt-2'
                        >
                            {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Creating account...</> : "Create Account"}
                        </Button>
                    </form>

                    <p className='text-center text-gray-400 text-sm mt-6'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-purple-400 font-semibold hover:text-purple-300 transition-colors'>Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup;
