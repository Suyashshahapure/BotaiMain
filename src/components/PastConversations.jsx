import React from "react";
import Header from "./Header";
import logo from "../assets/logo.png";
import you from "../assets/you.png";

export default function PastConversations({ pastConversations }) {
  let date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let formattedTime = hours + ":" + minutes + " " + ampm;
  console.log(pastConversations);
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1 className="flex flex-col items-center text-3xl font-bold">
          Conversation history
        </h1>
        <p>Today's conversation</p>
        {pastConversations.map((qa, index) => (
          <div className="bg-[#BFACE2] shadow-lg rounded " key={index}>
            <div className="flex mt-10 items-center">
              <img className="w-20 h-20 mr-5" src={you} alt="" />
              <div>
                <p className="font-bold">You</p>
                <p>{qa.question}</p>
                <p>{formattedTime}</p>
              </div>
            </div>
            <div className="flex mt-10 items-center">
              <img className="w-20 h-20 mr-5" src={logo} alt="" />
              <div>
                <p className="font-bold">Soul AI</p>
                <p>{qa.response}</p>
                <p> {formattedTime}</p>
                {qa.feedback && qa.feedback.length > 0 && (
                  <p>
                    <b>Feedback:</b> {qa.feedback}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
