"use client";
import React, { useState } from "react";
import { FloatingChatButton } from "../Chat/FloatingChatButton";
import FormFields from "../Chat/FormFields";
import ChatBox from "../Chat/ChatBox";

export const AllChatForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const startChat = () => {
    setIsFormOpen(false);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div style={{ overflowX: "hidden !important" }}>
      <FloatingChatButton toggleForm={openForm} />

      {isFormOpen && <FormFields onStartChat={startChat} />}
      {isChatOpen && <ChatBox onCloseChat={closeChat} />}
    </div>
  );
};
