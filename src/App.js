import React, { useState, useEffect } from 'react';
import BotAiWindow from './components/BotAiWindow';
import InputSection from './components/InputSection';
import { data } from './assets/data.js';
import SideBar from './components/SideBar';
import PastConversations from './components/PastConversations';

import './index.css';

function App() {
  const [ques, setQues] = useState('');
  const [history, setHistory] = useState([]);
  const [pastConversations, setPastConversations] = useState(() => {
    const storedPastConversations = localStorage.getItem('pastConversations');
    return storedPastConversations ? JSON.parse(storedPastConversations) : [];
  });
  const [displayPastConversations, setDisplayPastConversations] = useState(false);

  useEffect(() => {
    localStorage.setItem('pastConversations', JSON.stringify(pastConversations));
  }, [pastConversations]);

  const handleChange = (e) => {
    setQues(e.target.value);
  };

  const handleClick = () => {
    if (ques.trim() !== '') {
      const Qa = data.find((qa) => qa.question.toLowerCase() === ques.toLowerCase());
      if (Qa) {
        setHistory([...history, { question: Qa.question, response: Qa.response }]);
      } else {
        setHistory([...history, { question: ques, response: 'Question not found' }]);
      }
      setQues('');
    }
  };

  const handleSave = () => {
    setPastConversations([...pastConversations, ...history]);
    setHistory([]);
  };

  const toggleDisplayPastConversations = () => {
    setDisplayPastConversations(!displayPastConversations);
  };

  return (
    <div className='Main-container h-100vh'>
      <div className="flex h-full">
        <div className="w-64 p-4">
          <SideBar
            pastConversations={pastConversations}
            displayPastConversations={toggleDisplayPastConversations}
          />
        </div>
        <div className="flex-grow p-4 flex flex-col justify-between">
          {displayPastConversations ? (
            <PastConversations pastConversations={pastConversations} />
          ) : (
            <BotAiWindow history={history} setHistory={setHistory} />
          )}
          {!displayPastConversations && (
            <div className="flex justify-center items-center mt-4">
              <InputSection
                ques={ques}
                handleClick={handleClick}
                handleChange={handleChange}
                handleSave={handleSave}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
