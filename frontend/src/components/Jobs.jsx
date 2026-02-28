import React, { useEffect, useState } from 'react'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const query = searchedQuery.toLowerCase().trim();
            const filtered = allJobs.filter((job) => {
                if (query === "0-5 lpa") return job.salary >= 0 && job.salary <= 5;
                if (query === "5-10 lpa") return job.salary > 5 && job.salary <= 10;
                if (query === "10+ lpa") return job.salary > 10;
                if (["delhi ncr", "bangalore", "hyderabad", "pune", "mumbai"].includes(query))
                    return job.location?.toLowerCase().includes(query);
                if (["frontend developer", "backend developer", "fullstack developer"].includes(query))
                    return job.title?.toLowerCase().includes(query);
                const words = query.split(/\s+/).filter(Boolean);
                return words.some(word =>
                    job.title?.toLowerCase().includes(word) ||
                    job.description?.toLowerCase().includes(word) ||
                    job.location?.toLowerCase().includes(word) ||
                    job.company?.name?.toLowerCase().includes(word)
                );
            });
            setFilterJobs(filtered);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='min-h-screen bg-gray-50/50'>
            {/* Page Header */}
            <div className='bg-white border-b border-gray-100'>
                <div className='max-w-7xl mx-auto px-6 py-8'>
                    <h1 className='text-3xl font-black text-gray-900'>Browse Jobs</h1>
                    <p className='text-gray-500 mt-1'>
                        {filterJobs.length} {filterJobs.length === 1 ? 'job' : 'jobs'} available
                        {searchedQuery && <span className='text-purple-600'> for "{searchedQuery}"</span>}
                    </p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-6 py-8'>
                <div className='flex gap-6'>
                    {/* Sidebar Filter */}
                    <div className='w-64 flex-shrink-0'>
                        <FilterCard />
                    </div>

                    {/* Job Grid */}
                    <div className='flex-1'>
                        {filterJobs.length <= 0 ? (
                            <div className='flex flex-col items-center justify-center h-80 bg-white rounded-2xl border border-gray-100'>
                                <div className='p-4 bg-gray-50 rounded-2xl mb-4'>
                                    <Search size={32} className='text-gray-300' />
                                </div>
                                <p className='text-gray-900 font-bold text-lg'>No jobs found</p>
                                <p className='text-gray-400 text-sm mt-1'>Try adjusting your filters</p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        key={job?._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs
