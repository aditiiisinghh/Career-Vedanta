import { User } from "../models/user.model.js";
import axios from "axios";

// ✅ View resume - fetches from Cloudinary and serves with correct Content-Type
// This way the browser opens PDF as PDF, doc as doc
export const viewResume = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.profile?.resume?.url) {
      return res.status(404).send("Resume not found");
    }

    const resumeUrl = user.profile.resume.url;
    const filename = user.profile.resume.original_filename || "resume";
    const ext = filename.split('.').pop().toLowerCase();

    // Content-Type mapping
    const contentTypes = {
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
    const contentType = contentTypes[ext] || "application/octet-stream";

    // Fetch the file from Cloudinary
    const response = await axios.get(resumeUrl, { responseType: "arraybuffer" });

    // ✅ Set correct headers so browser opens in correct format
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    res.send(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error viewing resume");
  }
};

// ✅ Download resume - forces download with correct filename and extension
export const downloadResume = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.profile?.resume?.url) {
      return res.status(404).send("Resume not found");
    }

    const resumeUrl = user.profile.resume.url;
    const filename = user.profile.resume.original_filename || "resume.pdf";
    const ext = filename.split('.').pop().toLowerCase();

    const contentTypes = {
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
    const contentType = contentTypes[ext] || "application/octet-stream";

    // Fetch the file from Cloudinary
    const response = await axios.get(resumeUrl, { responseType: "arraybuffer" });

    // ✅ attachment forces download, inline would show in browser
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error downloading resume");
  }
};
