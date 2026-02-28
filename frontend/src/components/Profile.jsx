import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Pen, Mail, Phone, FileText, Download, User, Briefcase, CheckCircle } from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const BACKEND_URL = "http://localhost:4000/api/v1";

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const resumeObj = user?.profile?.resume;
    const hasResume = resumeObj?.url || (typeof resumeObj === "string" && resumeObj);
    const resumeName = resumeObj?.original_filename || "Resume";

    const skillCount = user?.profile?.skills?.length || 0;

    return (
        <div className='min-h-screen bg-gray-50/50'>
            {/* Hero Banner */}
            <div className='relative bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 h-32'>
                <div className='absolute inset-0 opacity-10' style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px'}}></div>
                <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50/50 to-transparent'></div>
            </div>

            <div className='max-w-4xl mx-auto px-6 pb-10'>
                {/* Profile Card */}
                <div className='bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-6 -mt-8'>
                    {/* Avatar + Name Row */}
                    <div className='flex items-center gap-5 mb-4'>
                        <div className='relative flex-shrink-0'>
                            <div className='h-24 w-24 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-black text-3xl shadow-lg border-4 border-white'>
                                {user?.profile?.profilePhoto ? (
                                    <img src={user.profile.profilePhoto} alt="" className='h-full w-full object-cover rounded-2xl' />
                                ) : (
                                    (user?.fullname?.charAt(0) || "U").toUpperCase()
                                )}
                            </div>
                            <div className='absolute -bottom-1 -right-1 h-5 w-5 bg-green-400 rounded-full border-2 border-white'></div>
                        </div>

                        <div className='flex-1'>
                            <h1 className='text-2xl font-black text-gray-900'>{user?.fullname}</h1>
                            <p className='text-gray-500 mt-0.5'>{user?.profile?.bio || "No bio added yet"}</p>
                        </div>
                    </div>

                    {/* Edit Profile Button - clearly visible below name */}
                    <Button
                        onClick={() => setOpen(true)}
                        className='flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all px-5 py-2 mb-6'
                    >
                        <Pen size={14} /> Edit Profile
                    </Button>

                    {/* Stats Row */}
                    <div className='grid grid-cols-3 gap-4 pt-6 border-t border-gray-100'>
                        <div className='text-center p-3 rounded-xl bg-purple-50'>
                            <p className='text-2xl font-black text-purple-700'>{skillCount}</p>
                            <p className='text-xs text-gray-500 mt-0.5'>Skills</p>
                        </div>
                        <div className='text-center p-3 rounded-xl bg-blue-50'>
                            <p className='text-2xl font-black text-blue-700'>{user?.savedJobs?.length || 0}</p>
                            <p className='text-xs text-gray-500 mt-0.5'>Saved Jobs</p>
                        </div>
                        <div className='text-center p-3 rounded-xl bg-emerald-50'>
                            <p className='text-2xl font-black text-emerald-700'>
                                <CheckCircle size={24} className='mx-auto' />
                            </p>
                            <p className='text-xs text-gray-500 mt-0.5'>Active</p>
                        </div>
                    </div>
                </div>

                {/* Info Cards Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-6'>
                    {/* Contact Info */}
                    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
                        <h2 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
                            <User size={16} className='text-purple-500' /> Contact Info
                        </h2>
                        <div className='space-y-3'>
                            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'>
                                <Mail size={15} className='text-purple-500 flex-shrink-0' />
                                <span className='text-gray-700 text-sm font-medium truncate'>{user?.email}</span>
                            </div>
                            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'>
                                <Phone size={15} className='text-purple-500 flex-shrink-0' />
                                <span className='text-gray-700 text-sm font-medium'>{user?.phoneNumber}</span>
                            </div>
                        </div>
                    </div>

                    {/* Resume */}
                    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
                        <h2 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
                            <FileText size={16} className='text-purple-500' /> Resume
                        </h2>
                        {hasResume ? (
                            <div className='space-y-2'>
                                <div className='p-3 bg-purple-50 rounded-xl border border-purple-100'>
                                    <p className='text-xs text-purple-500 font-medium mb-0.5'>Uploaded</p>
                                    <p className='text-sm font-bold text-purple-800 truncate'>{resumeName}</p>
                                </div>
                                <div className='flex gap-2'>
                                    <a
                                        href={`${BACKEND_URL}/resume/view/${user._id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors'
                                    >
                                        <FileText size={14} /> View
                                    </a>
                                    <a
                                        href={`${BACKEND_URL}/resume/download/${user._id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors'
                                    >
                                        <Download size={14} /> Download
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col items-center justify-center h-24 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200'>
                                <FileText size={20} className='text-gray-300 mb-1' />
                                <p className='text-sm text-gray-400'>No resume uploaded</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills */}
                <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6'>
                    <h2 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
                        <Briefcase size={16} className='text-purple-500' /> Skills
                    </h2>
                    {user?.profile?.skills?.length > 0 ? (
                        <div className='flex flex-wrap gap-2'>
                            {user.profile.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className='px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 text-sm font-semibold rounded-xl border border-purple-100'
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className='text-gray-400 text-sm'>No skills added yet. Click Edit Profile to add skills.</p>
                    )}
                </div>

                {/* Applied Jobs Table */}
                <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
                    <h2 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
                        <Briefcase size={16} className='text-purple-500' /> Applied Jobs
                    </h2>
                    <AppliedJobTable />
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;