import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  
  useEffect(() => {
    const fetchRoadmaps = () => {
      try {
        const savedRoadmaps =
          JSON.parse(localStorage.getItem("roadmaps")) || [];
        setRoadmaps(savedRoadmaps);
      } catch (error) {
        console.error("Error fetching roadmaps:", error);
      }
    };
    fetchRoadmaps();
  }, []);

 
  const handleDelete = (id) => {
    try {
      const updatedRoadmaps = roadmaps.filter((roadmap) => roadmap.id !== id);
      setRoadmaps(updatedRoadmaps);
      localStorage.setItem("roadmaps", JSON.stringify(updatedRoadmaps));
    } catch (error) {
      console.error("Error deleting roadmap:", error);
    }
  };

  
  const filteredRoadmaps = roadmaps.filter((roadmap) =>
    roadmap.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-darkBackground min-h-screen p-8 text-textLight">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Your Dashboard</h1>
        <Link
          to="/create"
          className="px-6 py-3 bg-accent text-darkBackground font-semibold rounded-full hover:bg-green-600 transition duration-300"
        >
          Create New Roadmap
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search roadmaps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 bg-gray-700 text-textLight rounded focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Roadmap Cards */}
      {filteredRoadmaps.length === 0 ? (
        <div className="text-center text-gray-400">
          <p className="text-lg mb-4">
            No roadmaps found. Create one{" "}
            <Link to="/create" className="text-accent underline">
              here
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredRoadmaps.map((roadmap) => (
            <div
              key={roadmap.id}
              className="bg-darkCard shadow-lg rounded-lg p-6 flex flex-col justify-between hover:transform hover:-translate-y-2 transition duration-300"
            >
              {/* Title and Progress */}
              <div>
                <h2 className="text-xl font-bold text-accent mb-2">
                  {roadmap.title}
                </h2>
                <p className="text-textLight mb-4">
                  Progress:{" "}
                  {(
                    (roadmap.milestones.filter((m) => m.completed).length /
                      roadmap.milestones.length) *
                    100
                  ).toFixed(0)}
                  %
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div
                    className="bg-gradient-to-r from-accent to-green-400 h-2 rounded-full"
                    style={{
                      width: `${
                        (roadmap.milestones.filter((m) => m.completed).length /
                          roadmap.milestones.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <ul className="space-y-2">
                  {roadmap.milestones.slice(0, 3).map((milestone) => (
                    <li
                      key={milestone.id}
                      className={`flex items-center ${
                        milestone.completed
                          ? "text-green-400"
                          : "text-textLight"
                      }`}
                    >
                      <span className="mr-2">•</span>
                      {milestone.title}
                    </li>
                  ))}
                  {roadmap.milestones.length > 3 && (
                    <li className="text-gray-400">+ More milestones...</li>
                  )}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-6">
                <Link
                  to={`/edit/${roadmap.id}`}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition duration-300"
                >
                  Edit
                </Link>
                <Link
                  to={`/roadmap/${roadmap.id}`}
                  className="px-4 py-2 bg-accent text-darkBackground text-sm rounded hover:bg-green-600 transition duration-300"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(roadmap.id)}
                  className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
