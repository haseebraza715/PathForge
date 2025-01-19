import React, { useState } from "react";

const RoadmapCard = ({ title, milestones }) => {
  const [completed, setCompleted] = useState(
    milestones.filter((m) => m.completed).length
  );

  const handleToggle = (index) => {
    milestones[index].completed = !milestones[index].completed;
    setCompleted(milestones.filter((m) => m.completed).length);
  };

  return (
    <div className="bg-darkCard shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold text-accent">{title}</h2>
      <p className="text-textLight mt-2">
        Progress: {((completed / milestones.length) * 100).toFixed(0)}%
      </p>
      <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
        <div
          className="bg-accent h-2 rounded-full"
          style={{ width: `${(completed / milestones.length) * 100}%` }}
        ></div>
      </div>
      <ul className="mt-4 space-y-2">
        {milestones.map((milestone, index) => (
          <li
            key={index}
            className="flex items-center justify-between text-textLight"
          >
            <span>{milestone.title}</span>
            <input
              type="checkbox"
              checked={milestone.completed}
              onChange={() => handleToggle(index)}
              className="form-checkbox accent-accent"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoadmapCard;
