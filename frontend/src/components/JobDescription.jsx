import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const [isApplied, setIsApplied] = useState(false);

  // =============================
  // Apply Job Handler
  // =============================
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);

        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id },
          ],
        };

        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  // =============================
  // Fetch Single Job
  // =============================
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          const applied =
            res.data.job.applications?.some(
              (application) =>
                application.applicant?._id === user?._id
            ) || false;

          setIsApplied(applied);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl text-gray-900">
              {singleJob?.title || "N/A"}
            </h1>

            <div className="flex items-center gap-3 mt-4">
              <Badge className="text-blue-700 font-semibold" variant="ghost">
                {singleJob?.position || 0} Positions
              </Badge>

              <Badge className="text-red-600 font-semibold" variant="ghost">
                {singleJob?.jobType || "N/A"}
              </Badge>

              <Badge className="text-purple-700 font-semibold" variant="ghost">
                ₹ {singleJob?.salary || "Not Disclosed"} LPA
              </Badge>
            </div>
          </div>

          <Button
            onClick={!isApplied ? applyJobHandler : null}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        {/* ================= DIVIDER ================= */}
        <hr className="my-6" />

        {/* ================= DESCRIPTION ================= */}
        <h2 className="text-lg font-semibold mb-4">Job Description</h2>

        <div className="space-y-3 text-gray-700">

          <p>
            <strong>Role:</strong> {singleJob?.title || "N/A"}
          </p>

          <p>
            <strong>Location:</strong> {singleJob?.location || "N/A"}
          </p>

          <p>
            <strong>Description:</strong> {singleJob?.description || "N/A"}
          </p>

          <p>
            <strong>Experience:</strong>{" "}
            {singleJob?.experienceLevel || 0} yrs
          </p>

          <p>
            <strong>Salary:</strong>{" "}
            ₹ {singleJob?.salary || "Not Disclosed"} LPA
          </p>

          <p>
            <strong>Total Applicants:</strong>{" "}
            {singleJob?.applications?.length || 0}
          </p>

          <p>
            <strong>Posted Date:</strong>{" "}
            {singleJob?.createdAt
              ? new Date(singleJob.createdAt).toLocaleDateString()
              : "N/A"}
          </p>

        </div>
      </div>
    </div>
  );
};

export default JobDescription;
