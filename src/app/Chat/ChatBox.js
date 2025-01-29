"use client";
import React, { useState } from 'react';
import { Box, Paper, TextField, IconButton, Typography, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PhotoIcon from '@mui/icons-material/Photo';

const ChatBox = ({ onCloseChat }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            setMessages([...messages, inputValue]);
            setInputValue('');
        }
    };

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
                zIndex: 1000
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


            <Box style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        style={{
                            backgroundColor: '#E57C00',
                            padding: '6px 15px',
                            borderRadius: '20px 20px 20px 0px',
                            textAlign: 'left',
                            color: 'white',
                            margin: '10px 0',
                            maxWidth: '60%',
                            alignSelf: "flex-end",
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                        }}
                    >
                        <Typography sx={{ fontSize: "12px" }}>{message}</Typography>
                    </Box>
                ))}
            </Box>


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
                        notchedOutline: { border: 'none' }, // إزالة الخط الخاص بالإطار الخارجي
                    }}
                    inputProps={{
                        style: {
                            fontSize: '12px',
                            lineHeight: '1.5',
                        },
                    }}
                    sx={{
                        '& fieldset': {
                            border: 'none', // إزالة الإطار العلوي من الـ fieldset
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
