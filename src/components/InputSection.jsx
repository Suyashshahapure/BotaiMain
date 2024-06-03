import React from "react";

export default function InputSection({
  ques,
  handleClick,
  handleChange,
  handleSave,
}) {
  return (
    <div className="flex items-center space-x-10">
      <input
        className="w-96 p-2 border border-gray-300 rounded"
        type="text"
        value={ques}
        onChange={handleChange}
      />
      <button className="p-2 bg-[#D7C7F4] rounded" onClick={handleClick}>
        Ask
      </button>
      <button className="p-2 bg-[#D7C7F4] rounded" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
