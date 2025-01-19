import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

const EditRoadmap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [milestones, setMilestones] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedRoadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
    const roadmap = savedRoadmaps.find((r) => r.id === id);

    if (roadmap) {
      setTitle(roadmap.title);
      setMilestones(roadmap.milestones);
    } else {
      alert("Roadmap not found!");
      navigate("/dashboard");
    }
  }, [id, navigate]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = milestones.findIndex((item) => item.id === active.id);
      const newIndex = milestones.findIndex((item) => item.id === over.id);

      setMilestones((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleRemoveMilestone = (id) => {
    const updatedMilestones = milestones.filter(
      (milestone) => milestone.id !== id
    );
    setMilestones(updatedMilestones);
  };

  const handleUpdateMilestone = (id, newTitle) => {
    const updatedMilestones = milestones.map((milestone) =>
      milestone.id === id ? { ...milestone, title: newTitle } : milestone
    );
    setMilestones(updatedMilestones);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }

    milestones.forEach((milestone, index) => {
      if (!milestone.title.trim()) {
        newErrors[`milestone-${index}`] = "Milestone cannot be empty.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const updatedRoadmap = {
      id,
      title,
      milestones,
    };

    try {
      const savedRoadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];
      const updatedRoadmaps = savedRoadmaps.map((r) =>
        r.id === id ? updatedRoadmap : r
      );

      localStorage.setItem("roadmaps", JSON.stringify(updatedRoadmaps));
      alert("Roadmap updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating roadmap:", error);
      alert("An error occurred while updating the roadmap.");
    }
  };

  return (
    <div className="bg-darkBackground min-h-screen p-6 text-textLight">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Roadmap</h1>
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

        {/* Milestones Drag-and-Drop */}
        <h2 className="text-lg font-bold text-accent mb-4">Milestones:</h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={milestones.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-3">
              {milestones.map((milestone, index) => (
                <SortableItem
                  key={milestone.id}
                  id={milestone.id}
                  milestone={milestone}
                  onRemove={handleRemoveMilestone}
                  onUpdate={handleUpdateMilestone}
                  errors={errors}
                  index={index}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full px-4 py-3 bg-accent text-darkBackground font-bold rounded hover:bg-green-600 transition duration-300 mt-6"
        >
          Save Roadmap
        </button>
      </div>
    </div>
  );
};

export default EditRoadmap;
