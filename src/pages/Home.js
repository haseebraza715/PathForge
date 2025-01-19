import React from "react";
import { Link } from "react-router-dom";
import { FaRoad, FaChartLine, FaGlobe } from "react-icons/fa"; // Icons for features

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-darkBackground via-gray-900 to-darkBackground animate-gradient text-textLight flex flex-col justify-center items-center p-6">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mt-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to{" "}
          <span className="text-accent bg-clip-text text-transparent bg-gradient-to-r from-accent to-green-400">
            PathForge
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Build your personalized tech learning roadmap and achieve your goals
          with ease. Whether you're a beginner or an expert, PathForge guides
          you every step of the way.
        </p>

        {/* Call-to-Action Button */}
        <Link
          to="/create"
          className="inline-flex items-center px-8 py-4 bg-accent text-darkBackground font-semibold rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-accent/30"
        >
          Get Started
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        {/* Feature 1 */}
        <div className="bg-darkCard p-8 rounded-lg shadow-lg text-center hover:transform hover:-translate-y-2 transition duration-300">
          <div className="flex justify-center mb-4">
            <FaRoad className="w-12 h-12 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-accent mb-4">
            Personalized Roadmaps
          </h3>
          <p className="text-gray-300">
            Create custom learning paths tailored to your goals and skill level.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-darkCard p-8 rounded-lg shadow-lg text-center hover:transform hover:-translate-y-2 transition duration-300">
          <div className="flex justify-center mb-4">
            <FaChartLine className="w-12 h-12 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-accent mb-4">
            Track Progress
          </h3>
          <p className="text-gray-300">
            Monitor your progress and stay motivated with clear milestones.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-darkCard p-8 rounded-lg shadow-lg text-center hover:transform hover:-translate-y-2 transition duration-300">
          <div className="flex justify-center mb-4">
            <FaGlobe className="w-12 h-12 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-accent mb-4">
            Learn Anytime, Anywhere
          </h3>
          <p className="text-gray-300">
            Access your roadmaps on any device and learn at your own pace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
