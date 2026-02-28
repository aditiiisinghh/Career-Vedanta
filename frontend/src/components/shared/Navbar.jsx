import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    return (
        <div className='bg-white shadow-sm sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-20 px-6'>
                
                {/* Logo */}
                <h1 className='text-2xl font-bold text-gray-800'>
                    Career<span className='text-blue-600'>Vedanta</span>
                </h1>

                {/* Links */}
                <div className='flex items-center gap-10'>
                    <ul className='flex font-medium items-center gap-6 text-gray-700'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="hover:text-blue-600 transition">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="hover:text-blue-600 transition">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="hover:text-blue-600 transition">Home</Link></li>
                                    <li><Link to="/jobs" className="hover:text-blue-600 transition">Jobs</Link></li>
                                    <li><Link to="/browse" className="hover:text-blue-600 transition">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {/* Auth Section */}
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button variant="outline" className="rounded-full px-6">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger>
<Avatar className="cursor-pointer bg-cyan-500 text-white flex items-center justify-center">
  <AvatarImage src={user?.profile?.profilePhoto || ""} />
  {!user?.profile?.profilePhoto && (
    <span className="text-lg font-semibold leading-none">
      {user?.fullname?.charAt(0)?.toUpperCase()}
    </span>
  )}
</Avatar>


                                </PopoverTrigger>

                                <PopoverContent className="w-72 rounded-xl">
                                    <div className='flex gap-3'>
  <Avatar className="cursor-pointer bg-cyan-500 text-white flex items-center justify-center">
  <AvatarImage src={user?.profile?.profilePhoto || ""} />
  {!user?.profile?.profilePhoto && (
    <span className="text-lg font-semibold leading-none">
      {user?.fullname?.charAt(0)?.toUpperCase()}
    </span>
  )}
</Avatar>



                                        <div>
                                            <h4 className='font-semibold'>{user?.fullname}</h4>
                                            <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>

                                    <div className='mt-4 flex flex-col gap-3 text-gray-600'>
                                        {
                                            user.role === 'student' && (
                                                <Link to="/profile" className="flex items-center gap-2 hover:text-blue-600">
                                                    <User2 size={18} />
                                                    View Profile
                                                </Link>
                                            )
                                        }

                                        <div onClick={logoutHandler} className="flex items-center gap-2 cursor-pointer hover:text-red-500">
                                            <LogOut size={18} />
                                            Logout
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
