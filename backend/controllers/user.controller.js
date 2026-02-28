import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "Something is missing", success: false });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exist with this email.', success: false });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ fullname, email, phoneNumber, password: hashedPassword, role });

        return res.status(201).json({ message: "Account created successfully.", success: true });
    } catch (error) {
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "Something is missing", success: false });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password.", success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        if (role !== user.role) {
            return res.status(400).json({ message: "Account doesn't exist with current role.", success: false });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            savedJobs: user.savedJobs
        };

        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000,
            })
            .json({ message: `Welcome back ${user.fullname}`, user, success: true });

    } catch (error) {
        console.log(error);
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.", success: true
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const userId = req.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User not found.", success: false });
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",").map((skill) => skill.trim());
        }

        if (req.file) {
            // Check file size before uploading to Cloudinary (10MB limit)
            if (req.file.size > 10 * 1024 * 1024) {
                return res.status(400).json({
                    message: "Resume file is too large. Maximum allowed size is 10MB.",
                    success: false
                });
            }

            const fileUri = getDataUri(req.file);
            const ext = req.file.originalname.split('.').pop().toLowerCase();

            try {
                const result = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: "raw",
                    folder: "resumes",
                    use_filename: true,
                    unique_filename: true,
                });

                user.profile.resume = {
                    public_id: result.public_id,
                    url: result.secure_url,
                    original_filename: req.file.originalname,
                    file_ext: ext,
                };
            } catch (uploadError) {
                console.log("Cloudinary upload error:", uploadError);

                // Handle Cloudinary file size error specifically
                if (uploadError?.http_code === 400 && uploadError?.message?.includes("File size too large")) {
                    return res.status(400).json({
                        message: "Resume file is too large. Please upload a PDF under 10MB.",
                        success: false
                    });
                }

                return res.status(500).json({
                    message: "Failed to upload resume. Please try again.",
                    success: false
                });
            }
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        await user.save();

        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            savedJobs: user.savedJobs
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: updatedUser,
            success: true,
        });
    } catch (error) {
        console.log("PROFILE UPDATE ERROR:", error);
        return res.status(500).json({ message: "Profile update failed", success: false });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId)
            .select("-password")
            .populate("savedJobs");

        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        return res.status(200).json({ user, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Failed to get profile" });
    }
};

export const toggleSaveJob = async (req, res) => {
    try {
        const userId = req.id;
        const { jobId } = req.params;

        const user = await User.findById(userId);

        const alreadySaved = user.savedJobs.includes(jobId);
        if (alreadySaved) {
            user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
        } else {
            user.savedJobs.push(jobId);
        }

        await user.save();
        res.status(200).json({ success: true, savedJobs: user.savedJobs });
    } catch (error) {
        console.log(error);
    }
};
