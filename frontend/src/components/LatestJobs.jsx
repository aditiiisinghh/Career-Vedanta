import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const navigate = useNavigate();

    return (
        <div className='max-w-7xl mx-auto px-6 py-20'>
            {/* Header */}
            <div className='flex items-end justify-between mb-12'>
                <div>
                    <p className='text-purple-600 font-semibold text-sm uppercase tracking-widest mb-2'>Opportunities</p>
                    <h2 className='text-4xl font-black text-gray-900'>
                        Latest & Top{' '}
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'>
                            Job Openings
                        </span>
                    </h2>
                </div>
                <button
                    onClick={() => navigate('/jobs')}
                    className='hidden md:flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all group'
                >
                    View all jobs
                    <ArrowRight size={18} className='group-hover:translate-x-1 transition-transform' />
                </button>
            </div>

            {/* Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {allJobs.length <= 0
                    ? (
                        <div className='col-span-3 text-center py-20 text-gray-400'>
                            <p className='text-lg'>No jobs available right now.</p>
                        </div>
                    )
                    : allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                }
            </div>
        </div>
    )
}

export default LatestJobs
