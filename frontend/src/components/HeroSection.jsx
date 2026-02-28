import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Sparkles, TrendingUp, Users, Briefcase } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const stats = [
        { icon: Briefcase, value: "10K+", label: "Jobs Posted" },
        { icon: Users, value: "50K+", label: "Job Seekers" },
        { icon: TrendingUp, value: "95%", label: "Success Rate" },
    ];

    return (
        <div className='relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white'>
            {/* Animated background orbs */}
            <div className='absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl animate-pulse'></div>
            <div className='absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse' style={{animationDelay:'1s'}}></div>
            <div className='absolute top-1/2 left-0 w-64 h-64 bg-pink-500 rounded-full opacity-5 blur-3xl'></div>

            {/* Grid pattern overlay */}
            <div className='absolute inset-0 opacity-5' style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>

            <div className='relative max-w-6xl mx-auto px-6 py-24 text-center'>
                {/* Badge */}
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-8 hover:bg-white/15 transition-colors'>
                    <Sparkles size={14} className='text-yellow-400' />
                    <span className='text-gray-200'>No. 1 Job Hunt Platform in India</span>
                </div>

                {/* Heading */}
                <h1 className='text-6xl md:text-7xl font-black leading-tight mb-6 tracking-tight'>
                    Find Your
                    <span className='block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent'>
                        Dream Career
                    </span>
                    Today
                </h1>

                <p className='text-gray-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed'>
                    Connect with top companies and discover opportunities that match your skills, passion, and ambitions.
                </p>

                {/* Search Bar */}
                <div className='flex items-center max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 gap-2 shadow-2xl mb-16 hover:border-purple-400/50 transition-all'>
                    <Search size={20} className='ml-3 text-gray-400 flex-shrink-0' />
                    <input
                        type="text"
                        placeholder='Search jobs, companies, or skills...'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                        className='flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2 py-2 text-base'
                    />
                    <Button
                        onClick={searchJobHandler}
                        className='bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-xl px-6 py-2 font-semibold transition-all hover:scale-105'
                    >
                        Search Jobs
                    </Button>
                </div>

                {/* Stats */}
                <div className='flex items-center justify-center gap-12 flex-wrap'>
                    {stats.map(({ icon: Icon, value, label }) => (
                        <div key={label} className='text-center'>
                            <div className='flex items-center justify-center gap-2 mb-1'>
                                <Icon size={18} className='text-purple-400' />
                                <span className='text-3xl font-black text-white'>{value}</span>
                            </div>
                            <p className='text-gray-400 text-sm'>{label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HeroSection
