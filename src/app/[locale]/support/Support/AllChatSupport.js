"use client";
import React, { useState } from "react";
import { SupportChatButton } from "./SupportChatButton";
import FormFields from "../../Chat/FormFields";
import ChatBox from "../../Chat/ChatBox";

export const AllChatSupport = () => {
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
      <SupportChatButton toggleForm={toggleForm} />

      {isFormOpen && <FormFields onStartChat={startChat} />}
      {isChatOpen && <ChatBox onCloseChat={closeChat} />}
    </div>
  );
};