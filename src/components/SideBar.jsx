import React from "react";
import logo from "../assets/logo.png";

export default function SideBar({
  pastConversations,
  displayPastConversations,
}) {
  return (
    <div className="flex flex-col items-start w-full p-4 bg-white h-screen">
      <div className="flex items-center space-x-4 mb-4">
        <img src={logo} alt="Logo" className="w-12 h-12" />
        <h1 className="text-lg">
          <a href="/">New Chat</a>
        </h1>
      </div>
      {pastConversations.length > 0 && (
        <button
          onClick={displayPastConversations}
          className="mt-2 bg-[#9785BA] p-1 rounded"
        >
          Past Conversations
        </button>
      )}
    </div>
  );
}
