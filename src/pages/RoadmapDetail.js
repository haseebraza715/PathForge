import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const RoadmapDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);

  // Fetch the roadmap from local storage
  useEffect(() => {
    const fetchRoadmap = () => {
      try {
        const savedRoadmaps =
          JSON.parse(localStorage.getItem("roadmaps")) || [];
        const roadmap = savedRoadmaps.find((r) => r.id === id);

        if (roadmap) {
          setRoadmap(roadmap);
        } else {
          alert("Roadmap not found!");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
        alert("An error occurred while fetching the roadmap.");
      }
    };
    fetchRoadmap();
  }, [id, navigate]);

  if (!roadmap) {
    return (
      <div className="bg-darkBackground min-h-screen p-6 text-textLight">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  // Calculate progress percentage
  const completedMilestones = roadmap.milestones.filter(
    (m) => m.completed
  ).length;
  const totalMilestones = roadmap.milestones.length;
  const progressPercentage = (
    (completedMilestones / totalMilestones) *
    100
  ).toFixed(0);

  return (
    <div className="bg-darkBackground min-h-screen p-6 text-textLight">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-gray-700 text-textLight rounded hover:bg-gray-600 transition duration-300"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Roadmap Title */}
      <h1 className="text-3xl font-bold mb-6">{roadmap.title}</h1>

      {/* Progress Bar */}
      <div className="mb-8">
        <p className="text-textLight mb-2">Progress: {progressPercentage}%</p>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-accent to-green-400 h-3 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Milestones List */}
      <ul className="space-y-4">
        {roadmap.milestones.map((milestone) => (
          <li
            key={milestone.id}
            className={`p-4 rounded ${
              milestone.completed ? "bg-green-600" : "bg-gray-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-textLight">{milestone.title}</span>
              {milestone.completed && (
                <span className="text-green-300">✓ Completed</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoadmapDetail;
