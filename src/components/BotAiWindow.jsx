import React, { useState } from "react";
import Header from "./Header";
import logo from "../assets/logo.png";
import you from "../assets/you.png";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import Rating from "react-rating";

function FeedbackModal({ isOpen, onClose, onSubmit }) {
  const [feedback, setFeedback] = useState("");

  const handleChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#FAF7FF] p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Provide Additional Feedback</h2>
        <textarea
          className="w-full p-2 border rounded mb-4"
          value={feedback}
          onChange={handleChange}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-[#D7C7F4] rounded ">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#D7C7F4]  rounded "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BotAiWindow({ history, setHistory }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);
  const [rating, setRating] = useState(0); // State for rating

  let date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let formattedTime = hours + ":" + minutes + " " + ampm;

  const handleThumbsUpClick = () => {
    setFeedbackType("thumbs-up");
    setIsModalOpen(false);
    setRating(5); // Setting rating to 5
  };

  const handleThumbsDownClick = () => {
    setFeedbackType("thumbs-down");
    setIsModalOpen(true);
  };

  const handleSubmitFeedback = (feedback) => {
    const updatedHistory = [...history];

    updatedHistory[updatedHistory.length - 1].feedback = feedback;
    setHistory(updatedHistory);
  };

  return (
    <div className="">
      <div className=" ">
        <Header />
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center space-y-2 rounded">
            <h1 className="font-bold text-4xl mt-10">
              How Can I Help You Today ?
            </h1>
            <img className="h-10 w-10 ml-20" src={logo} alt="" />
          </div>
          <div className="flex space-x-4">
            <div className="p-4 rounded bg-white shadow-lg">
              <h1 className="font-bold text-xl">Hi, What is the Weather</h1>
              <p className="text-xs"> Get immediate AI generated Response</p>
            </div>
            <div className="p-4 rounded bg-white shadow-lg">
              <h1 className="font-bold text-xl">Hi, What is my location</h1>
              <p className="text-xs"> Get immediate AI generated Response</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="p-4 rounded bg-white shadow-lg">
              <h1 className="font-bold text-xl">Hi, What is the temperature</h1>
              <p className="text-xs"> Get immediate AI generated Response</p>
            </div>
            <div className="p-4 rounded bg-white shadow-lg">
              <h1 className="font-bold text-xl">Hi, How are you</h1>
              <p className="text-xs"> Get immediate AI generated Response</p>
            </div>
          </div>
        </div>
      ) : (
        history.map((qa, index) => (
          <div key={index} className="space-y-2 p-4 rounded">
            <div className="p-2 rounded shadow-lg flex">
              <img className="h-10 w-10 mr-10 " src={you} alt="" />
              <div>
                <p className="font-bold">You</p>
                <p>{qa.question}</p>
                <p>{formattedTime}</p>
              </div>
            </div>
            <div className="p-2 rounded shadow-lg flex">
              <img className="h-10 w-10 mr-10 " src={logo} alt="" />
              <div>
                <p className="font-bold">Soul AI</p>
                <p>{qa.response}</p>
                <p>{formattedTime}</p>
                <div className="flex space-x-2">
                  <FaRegThumbsUp
                    className="h-5 w-5"
                    onClick={handleThumbsUpClick}
                  />
                  <FaRegThumbsDown
                    className="h-5 w-5"
                    onClick={handleThumbsDownClick}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitFeedback}
      />
    </div>
  );
}
