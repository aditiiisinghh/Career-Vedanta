import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-14 pb-6 mt-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-12">

          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 tracking-wide">
              CareerVedanta
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              Connecting talent with opportunity. Discover your dream job
              and grow with trusted companies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
  <h3 className="text-lg font-semibold text-white mb-4">
    Quick Links
  </h3>

  <ul className="space-y-3 text-sm">
    <li>
      <Link to="/" className="hover:text-white transition duration-200">
        Home
      </Link>
    </li>

    <li>
      <Link to="/jobs" className="hover:text-white transition duration-200">
        Jobs
      </Link>
    </li>

    <li>
      <Link to="/browse" className="hover:text-white transition duration-200">
        Browse
      </Link>
    </li>

    
   
  </ul>
</div>


          {/* Social Icons Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Follow Us
            </h3>

            {/* KEEP YOUR ORIGINAL ICONS HERE */}
            <div className="flex gap-5 items-center">

  <a
    href="https://twitter.com"
    target="_blank"
    rel="noreferrer"
    className="bg-gray-800 p-3 rounded-full hover:bg-sky-500 transition duration-300 transform hover:scale-110"
  >
    <Twitter className="text-white w-5 h-5" />
  </a>

  <a
    href="https://facebook.com"
    target="_blank"
    rel="noreferrer"
    className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-110"
  >
    <Facebook className="text-white w-5 h-5" />
  </a>

  <a
    href="https://linkedin.com"
    target="_blank"
    rel="noreferrer"
    className="bg-gray-800 p-3 rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-110"
  >
    <Linkedin className="text-white w-5 h-5" />
  </a>

</div>

          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CareerVedanta. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
