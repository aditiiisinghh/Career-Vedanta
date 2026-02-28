import React from "react";
import { Button } from "./ui/button";
import { Bookmark, MapPin, Clock, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSavedJobs } from "@/redux/authSlice";

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

const daysAgo = (mongodbTime) => {
    if (!mongodbTime) return "Today";
    const diff = Math.floor((new Date() - new Date(mongodbTime)) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Today" : `${diff}d ago`;
};

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth);

    const isSaved = user?.savedJobs?.includes(job._id);
    const companyName = job?.company?.name || "Company";
    const companyInitial = companyName.charAt(0).toUpperCase();
    const companyLogo = job?.company?.logo;
    const colorClass = getCompanyColor(companyName);

    const handleSave = async (e) => {
        e.stopPropagation();
        if (!user) { alert("Please login first"); return; }
        try {
            const res = await axios.post(
                `http://localhost:4000/api/v1/user/save-job/${job._id}`,
                {}, { withCredentials: true }
            );
            dispatch(setSavedJobs(res.data.savedJobs));
        } catch (error) { console.log(error); }
    };

    return (
        <div className='group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden'>
            {/* Top accent bar on hover */}
            <div className='absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

            {/* Header row */}
            <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-3'>
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
                        <p className='font-bold text-gray-900 text-sm'>{companyName}</p>
                        <div className='flex items-center gap-1 text-gray-400 text-xs'>
                            <MapPin size={11} />
                            <span>{job?.location || "India"}</span>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='text-xs text-gray-400 flex items-center gap-1'>
                        <Clock size={11} /> {daysAgo(job?.createdAt)}
                    </span>
                    <button
                        onClick={handleSave}
                        className={`p-2 rounded-xl transition-all hover:scale-110 ${isSaved ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:bg-purple-50 hover:text-purple-500'}`}
                    >
                        <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                </div>
            </div>

            {/* Job Info */}
            <h2 className='font-black text-gray-900 text-lg mb-2 group-hover:text-purple-700 transition-colors leading-tight'>
                {job?.title}
            </h2>
            <p className='text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed'>{job?.description}</p>

            {/* Badges */}
            <div className='flex flex-wrap gap-2 mb-5'>
                <span className='px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold'>{job?.position || 0} Positions</span>
                <span className='px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold'>{job?.jobType || "Full-Time"}</span>
                <span className='px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-semibold'>₹ {job?.salary} LPA</span>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3'>
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className='flex-1 border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-700 rounded-xl font-semibold transition-all'
                >
                    View Details
                </Button>
                <Button
                    onClick={handleSave}
                    className={`flex-1 rounded-xl font-semibold transition-all ${
                        isSaved
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white'
                    }`}
                >
                    {isSaved ? "Unsave" : "Save Job"}
                </Button>
            </div>
        </div>
    );
};

export default Job;
