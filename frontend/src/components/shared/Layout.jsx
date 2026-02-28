import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ MISSING THA

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${USER_API_END_POINT}/profile`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setUser(res.data.user));

          // 🔐 PROFILE COMPLETION CHECK (ONLY FOR STUDENT)
          if (
            res.data.user.role === "student" &&
            (
              !res.data.user.profile ||
              !res.data.user.profile.bio ||
              !res.data.user.profile.profilePhoto
            )
          ) {
            navigate("/profile");
          }
        }
      } catch (error) {
        // ✅ IGNORE 401 (User not logged in)
        if (error.response?.status !== 401) {
          console.log("PROFILE ERROR:", error);
        }
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
