"use client";
import React, { useEffect, useState } from 'react';
import { Box, Paper, TextField, IconButton, Typography, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PhotoIcon from '@mui/icons-material/Photo';
import { BASE_URL } from '@/utils';

const ChatBox = ({ onCloseChat }) => {
    const [messages, setMessages] = useState([]); // store all messages
    const [inputValue, setInputValue] = useState(''); // store current message text

    // function to send message
    const handleSendMessage = async () => {
        if (inputValue.trim() !== '') {
            try {
                // create message data
                const collectionData = {
                    sender_id: localStorage.getItem("customer_id"),
                    receiver_id: "1", // receiver id (support)
                    sender_type: "customer", // sender type (customer)
                    message: inputValue,
                };

                // send message to server
                const response = await fetch(`${BASE_URL}chat`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(collectionData),
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to send message');
                }

                // add message to UI
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { message: inputValue, sender_type: "customer" },
                ]);

                // clear input field after sending
                setInputValue('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    // fetch messages from server
    const fetchMessages = async () => {
        const customerId = localStorage.getItem("customer_id");
        if (!customerId) {
            console.error("Customer ID not found in sessionStorage");
            return;
        }

        try {
            const url = `${BASE_URL}chat?customer_id=${customerId}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Network error: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                // merge customer and support messages in one array
                const allMessages = [
                    ...data.customer.map((msg) => ({ ...msg, sender_type: "customer" })),
                    ...data.support.map((msg) => ({ ...msg, sender_type: "support" })),
                ];
                // sort messages by date
                allMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                setMessages(allMessages);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // fetch messages when component is loaded 
    useEffect(() => {
        fetchMessages();

        const pollingInterval = setInterval(fetchMessages, 5000);
        return () => clearInterval(pollingInterval);
    }, []);

    return (
        <Paper
            elevation={3}
            style={{
                position: 'fixed',
                bottom: 80,
                right: 20,
                width: 300,
                height: 400,
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 1000,
                // boxShadow: '10px 10px 10px rgba(0,0,0,0.5)',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)',

            }}
        >
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ marginRight: 1 }}>
                        <AccountCircleIcon sx={{ fontSize: 45, color: "#AAAAAA", marginRight: "0px" }} />
                    </Box>
                    <Typography variant="body1" sx={{ fontSize: "15px", color: "#575756" }}>QTap</Typography>
                </Box>

                <IconButton onClick={onCloseChat}>
                    <CloseIcon sx={{ fontSize: "18px", color: "#575756" }} />
                </IconButton>
            </Box>
            <Divider sx={{ backgroundColor: "#E57C00", marginBottom: "20px" }} />

            {/* display messages */}


            <Box style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        style={{
                            display: "flex",
                            justifyContent: msg.sender_type === "customer" ? "flex-end" : "flex-start", // Align customer messages to the right
                            width: "100%", // Ensure the container takes full width
                        }}
                    >
                        <Box
                            style={{
                                backgroundColor: msg.sender_type === "customer" ? '#E57C00' : '#F1F1F1',
                                padding: '6px 15px',
                                borderRadius: msg.sender_type === "customer" ? '20px 20px 0px 20px' : '20px 20px 20px 0px',
                                textAlign: msg.sender_type === "customer" ? 'right' : 'left',
                                color: msg.sender_type === "customer" ? 'white' : '#575756',
                                margin: '10px 0',
                                width: '60%', // Limit message width
                                whiteSpace: 'pre-wrap',
                                wordWrap: 'break-word',
                            }}
                        >
                            <Typography sx={{ fontSize: "12px" }}>{msg.message}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
            {/* input field */}
            <Box style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton>
                    <AddCircleIcon style={{ color: '#E57C00' }} />
                </IconButton>
                <IconButton>
                    <PhotoIcon style={{ color: '#E57C00' }} />
                </IconButton>
                <TextField
                    variant="outlined"
                    placeholder="Aa"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    multiline
                    maxRows={4}
                    InputProps={{
                        style: {
                            height: 'auto',
                            borderRadius: '20px',
                            backgroundColor: '#F1F1F1',
                            padding: '8px 10px',
                            border: 'none',
                        },
                        notchedOutline: { border: 'none' },
                    }}
                    inputProps={{
                        style: {
                            fontSize: '12px',
                            lineHeight: '1.5',
                        },
                    }}
                    sx={{
                        '& fieldset': {
                            border: 'none',
                        },
                    }}
                    style={{ flex: 1 }}
                />
                <IconButton onClick={handleSendMessage}>
                    <SendIcon style={{ color: '#E57C00' }} />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default ChatBox;