// "use client";
// import React, { useState } from "react";
// import { FloatingChatButton } from "../Chat/FloatingChatButton";
// import FormFields from "../Chat/FormFields";
// import ChatBox from "../Chat/ChatBox";

// export const AllChatForm = () => {
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   const openForm = () => {
//     setIsFormOpen(true);
//   };

//   const startChat = () => {
//     setIsFormOpen(false);
//     setIsChatOpen(true);
//   };

//   const closeChat = () => {
//     setIsChatOpen(false);
//   };

//   return (
//     <div style={{ overflowX: "hidden !important" }}>
//       <FloatingChatButton toggleForm={openForm} />

//       {isFormOpen && <FormFields onStartChat={startChat} />}
//       {isChatOpen && <ChatBox onCloseChat={closeChat} />}
//     </div>
//   );
// };


"use client";
import React, { useState } from "react";
import { FloatingChatButton } from "./FloatingChatButton";
import FormFields from "./FormFields";
import ChatBox from "./ChatBox";

export const AllChatForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Toggle form visibility
  const toggleForm = () => {
    setIsFormOpen((prev) => !prev); 
    if (isChatOpen) {
      setIsChatOpen(false); 
    }
  };

  // Start chat and close form
  const startChat = () => {
    setIsFormOpen(false);
    setIsChatOpen(true);
  };

  // Close chat
  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div style={{ overflowX: "hidden !important" }}>
      <FloatingChatButton toggleForm={toggleForm} />

      {isFormOpen && <FormFields onStartChat={startChat} />}
      {isChatOpen && <ChatBox onCloseChat={closeChat} />}
    </div>
  );
};