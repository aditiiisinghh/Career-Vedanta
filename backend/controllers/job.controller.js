import { Job } from "../models/job.model.js";


// ===============================
// ADMIN - Post New Job
// ===============================
export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId
        } = req.body;

        const userId = req.id; // coming from isAuthenticated middleware

        // validation
        if (
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !location ||
            !jobType ||
            !experience ||
            !position ||
            !companyId
        ) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","), // convert string to array
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,  // must match ref in model
            created_by: userId
        });
console.log("REQ ID:", req.id);

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};



// ===============================
// STUDENT - Get All Jobs
// ===============================
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } },
                { jobType: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query)
            .populate("company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};




// ===============================
// STUDENT - Get Single Job By ID
// ===============================
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId)
            .populate("company")
            .populate({
                path: "applications",
                populate: {
                    path: "applicant"
                }
            });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};



// ===============================
// ADMIN - Get Jobs Created By Admin
// ===============================
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({ created_by: adminId })
            .populate("company")
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};
