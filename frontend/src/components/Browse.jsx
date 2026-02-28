import React from "react";
import { useSelector } from "react-redux";
import Job from "./Job";
import { Search } from "lucide-react";

const Browse = () => {
    const allJobs = useSelector((store) => store.job.allJobs);
    const searchedQuery = useSelector((store) => store.job.searchedQuery);

    const filteredJobs = allJobs?.filter((job) => {
        if (!searchedQuery) return true;
        const query = searchedQuery.toLowerCase().trim();
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

    return (
        <div className='min-h-screen bg-gray-50/50'>
            {/* Header */}
            <div className='bg-white border-b border-gray-100'>
                <div className='max-w-7xl mx-auto px-6 py-8'>
                    <h1 className='text-3xl font-black text-gray-900'>Search Results</h1>
                    <p className='text-gray-500 mt-1'>
                        <span className='text-purple-600 font-semibold'>{filteredJobs?.length || 0} jobs</span>
                        {searchedQuery && <span> found for "{searchedQuery}"</span>}
                    </p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-6 py-8'>
                {filteredJobs?.length === 0 ? (
                    <div className='flex flex-col items-center justify-center h-80 bg-white rounded-2xl border border-gray-100'>
                        <div className='p-4 bg-gray-50 rounded-2xl mb-4'>
                            <Search size={32} className='text-gray-300' />
                        </div>
                        <p className='text-gray-900 font-bold text-lg'>No results found</p>
                        <p className='text-gray-400 text-sm mt-1'>Try a different search term</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {filteredJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Browse;
