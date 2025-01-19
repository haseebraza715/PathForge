import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-darkCard to-gray-800 text-textLight mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-accent mb-4">
              About PathForge
            </h3>
            <p className="text-sm text-gray-300">
              PathForge helps you build personalized tech learning roadmaps and
              achieve your goals.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-accent mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-300 hover:text-accent transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-sm text-gray-300 hover:text-accent transition duration-300"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/create"
                  className="text-sm text-gray-300 hover:text-accent transition duration-300"
                >
                  Create Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-accent mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@pathforge.com"
                  className="text-sm text-gray-300 hover:text-accent transition duration-300"
                >
                  haseebraza715@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-sm text-gray-300 hover:text-accent transition duration-300"
                >
                  +92 343 4739789
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold text-accent mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="https://github.com/haseebraza715"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-300 hover:text-accent transition duration-300"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/haseebraza715"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-300 hover:text-accent transition duration-300"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/haseeb-raza-00a845231/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-300 hover:text-accent transition duration-300"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:haseeb.javed715@gmail.com"
                aria-label="Email"
                className="text-gray-300 hover:text-accent transition duration-300"
              >
                <FaEnvelope className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="text-center mt-8 border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} PathForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
