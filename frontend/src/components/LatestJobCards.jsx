import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { MapPin, Clock } from 'lucide-react'

const getCompanyColor = (name) => {
    const gradients = [
        "from-violet-500 to-purple-600",
        "from-blue-500 to-cyan-600",
        "from-emerald-500 to-teal-600",
        "from-orange-500 to-red-500",
        "from-pink-500 to-rose-600",
        "from-amber-500 to-orange-600",
        "from-indigo-500 to-blue-600",
        "from-teal-500 to-emerald-600",
    ];
    if (!name) return gradients[0];
    return gradients[name.charCodeAt(0) % gradients.length];
};

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const companyName = job?.company?.name || "Company";
    const companyInitial = companyName.charAt(0).toUpperCase();
    const companyLogo = job?.company?.logo;
    const colorClass = getCompanyColor(companyName);

    return (
        <div
            onClick={() => navigate(`/description/${job?._id}`)}
            className='group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden'
        >
            {/* Hover gradient top accent */}
            <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl'></div>

            {/* Company Info */}
            <div className='flex items-center gap-3 mb-4'>
                <div className='h-12 w-12 rounded-xl overflow-hidden flex-shrink-0 shadow-sm'>
                    {companyLogo ? (
                        <img src={companyLogo} alt={companyName} className='h-full w-full object-cover' />
                    ) : (
                        <div className={`h-full w-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold text-lg`}>
                            {companyInitial}
                        </div>
                    )}
                </div>
                <div>
                    <h3 className='font-bold text-gray-900 text-sm'>{companyName}</h3>
                    <div className='flex items-center gap-1 text-gray-400 text-xs'>
                        <MapPin size={11} />
                        <span>{job?.location || "India"}</span>
                    </div>
                </div>
            </div>

            {/* Job Title */}
            <h2 className='font-black text-gray-900 text-lg mb-2 group-hover:text-purple-700 transition-colors leading-tight'>
                {job?.title}
            </h2>
            <p className='text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed'>{job?.description}</p>

            {/* Badges */}
            <div className='flex flex-wrap gap-2'>
                <span className='inline-flex items-center px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold'>
                    {job?.position} Positions
                </span>
                <span className='inline-flex items-center px-3 py-1 rounded-lg bg-orange-50 text-orange-700 text-xs font-semibold'>
                    {job?.jobType}
                </span>
                <span className='inline-flex items-center px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-semibold'>
                    ₹{job?.salary} LPA
                </span>
            </div>
        </div>
    )
}

export default LatestJobCards
