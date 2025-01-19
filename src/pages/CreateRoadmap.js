import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoadmap = () => {
  const navigate = useNavigate();

  // Prebuilt roadmap templates
  const templates = {
    "Frontend Developer": [
      { id: "1", title: "Learn HTML", completed: false },
      { id: "2", title: "Learn CSS", completed: false },
      { id: "3", title: "Learn JavaScript", completed: false },
      { id: "4", title: "Learn React", completed: false },
    ],
    "Data Scientist": [
      { id: "5", title: "Learn Python", completed: false },
      { id: "6", title: "Learn NumPy and Pandas", completed: false },
      { id: "7", title: "Learn Data Visualization", completed: false },
      { id: "8", title: "Learn Machine Learning", completed: false },
    ],
  };

  const [title, setTitle] = useState("");
  const [milestones, setMilestones] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [errors, setErrors] = useState({});

  // Handle template selection
  const handleTemplateSelect = (templateName) => {
    setSelectedTemplate(templateName);
    setMilestones(templates[templateName] || []);
    setErrors({}); // Clear errors when a template is selected
  };

  // Handle milestone changes
  const handleMilestoneChange = (index, value) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index].title = value;
    setMilestones(updatedMilestones);

    // Clear errors for this milestone
    if (errors[`milestone-${index}`]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[`milestone-${index}`];
      setErrors(updatedErrors);
    }
  };

  // Add a new milestone
  const handleAddMilestone = () => {
    setMilestones([
      ...milestones,
      { id: new Date().getTime().toString(), title: "", completed: false },
    ]);
  };

  // Remove a milestone
  const handleRemoveMilestone = (index) => {
    const updatedMilestones = milestones.filter((_, i) => i !== index);
    setMilestones(updatedMilestones);

    // Clear errors for this milestone
    if (errors[`milestone-${index}`]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[`milestone-${index}`];
      setErrors(updatedErrors);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate title
    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }

    // Validate milestones
    milestones.forEach((milestone, index) => {
      if (!milestone.title.trim()) {
        newErrors[`milestone-${index}`] = "Milestone cannot be empty.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle saving the roadmap
  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const newRoadmap = {
      id: new Date().getTime().toString(), // Unique ID for the roadmap
      title,
      milestones: milestones.filter((m) => m.title.trim() !== ""), // Exclude empty milestones
    };

    const savedRoadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
    localStorage.setItem(
      "roadmaps",
      JSON.stringify([...savedRoadmaps, newRoadmap])
    );

    alert("Roadmap created successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="bg-darkBackground min-h-screen p-6 text-textLight">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Create a New Roadmap
      </h1>
      <div className="bg-darkCard shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        {/* Title Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Roadmap Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your roadmap title"
            className={`w-full p-3 bg-gray-700 text-textLight rounded focus:outline-none focus:ring-2 ${
              errors.title ? "focus:ring-red-500" : "focus:ring-accent"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Template Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Choose a Prebuilt Template (Optional)
          </label>
          <select
            value={selectedTemplate}
            onChange={(e) => handleTemplateSelect(e.target.value)}
            className="w-full p-3 bg-gray-700 text-textLight rounded focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">-- Select a Template --</option>
            {Object.keys(templates).map((templateName) => (
              <option key={templateName} value={templateName}>
                {templateName}
              </option>
            ))}
          </select>
        </div>

        {/* Milestones */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Milestones</label>
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={milestone.title}
                onChange={(e) => handleMilestoneChange(index, e.target.value)}
                placeholder={`Milestone ${index + 1}`}
                className={`w-full p-3 bg-gray-700 text-textLight rounded focus:outline-none focus:ring-2 ${
                  errors[`milestone-${index}`]
                    ? "focus:ring-red-500"
                    : "focus:ring-accent"
                }`}
              />
              <button
                onClick={() => handleRemoveMilestone(index)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Remove
              </button>
              {errors[`milestone-${index}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`milestone-${index}`]}
                </p>
              )}
            </div>
          ))}
          <button
            onClick={handleAddMilestone}
            className="px-4 py-2 bg-accent text-darkBackground rounded hover:bg-green-600 transition"
          >
            Add Milestone
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full px-4 py-3 bg-accent text-darkBackground font-bold rounded hover:bg-green-600 transition mt-6"
        >
          Save Roadmap
        </button>
      </div>
    </div>
  );
};

export default CreateRoadmap;
