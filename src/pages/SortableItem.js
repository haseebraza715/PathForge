import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({
  id,
  milestone,
  onRemove,
  onUpdate,
  errors,
  index,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const [milestoneTitle, setMilestoneTitle] = useState(milestone.title);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setMilestoneTitle(newTitle);
    onUpdate(id, newTitle);
  };

  const handleRemove = (e) => {
    e.stopPropagation(); 
    onRemove(id); 
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-700 text-textLight p-4 rounded flex justify-between items-center shadow-md hover:shadow-lg transition duration-300"
    >
      {/* Milestone Input */}
      <div className="flex-grow">
        <input
          type="text"
          value={milestoneTitle}
          onChange={handleTitleChange}
          placeholder={`Milestone ${index + 1}`}
          className={`w-full bg-transparent focus:outline-none ${
            errors[`milestone-${index}`] ? "text-red-500" : "text-textLight"
          }`}
        />
        {errors[`milestone-${index}`] && (
          <p className="text-red-500 text-sm mt-1">
            {errors[`milestone-${index}`]}
          </p>
        )}
      </div>

      {/* Remove Button */}
      <div onClick={handleRemove} style={{ pointerEvents: "auto" }}>
        <button
          className="text-red-500 hover:text-red-700 font-semibold"
          aria-label="Remove milestone"
          style={{ pointerEvents: "none" }} // Disable pointer events on the button itself
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default SortableItem;
