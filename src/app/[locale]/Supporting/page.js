"use client";
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Header } from './Header';
import Link from 'next/link';
// import PhoneInput from 'react-phone-input-2';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


const page = () => {
    const [phone, setPhone] = useState('');

    const handlePhoneChange = (value) => {
        setPhone(value);
    };
    const [selectedName, setSelectedName] = useState("");
    const [comment, setComment] = useState("");
    const [email, setEmail] = useState("");


    return (
        <Box
            sx={{
                color: 'white',
                backgroundColor: '#1E1E2A',
                height: "100vh",
                width: '100%',
            }}>

            <Header />

            <Box width="90%" sx={{ padding: "0px 20px", position: "relative", top: "29vh", }} >

                <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "white" }}>Name</Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                    placeholder='Customer Name'
                    sx={{ marginBottom: "15px" }}
                    InputProps={{
                        sx: {
                            borderRadius: "5px", border: "1px solid #44404D",
                            height: "35px", fontSize: "11px", color: "#797993", width: "100%"
                        }
                    }}
                />
                <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "white" }}>Email</Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='examble@gmail.com'
                    sx={{ marginBottom: "15px" }}

                    InputProps={{
                        sx: {
                            borderRadius: "5px", border: "1px solid #44404D",
                            height: "35px", fontSize: "11px", color: "#797993", width: "100%"
                        }
                    }}
                />
            

                <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "white" }}>Phone</Typography>
                <ReactPhoneInput
                    country={'eg'} 
                    value={phone}
                    onChange={handlePhoneChange}
                    inputStyle={{
                        width: '100%',
                        height: '35px',
                        fontSize: "11px", backgroundColor: "#1E1E2A", border: "1px solid #44404D", color: "#797993"
                    }} 
                    buttonStyle={{
                        borderRadius: '5px 0 0 5px', backgroundColor: "#1E1E2A", border: "1px solid #44404D"
                    }} 
                />


                <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px",marginTop:"15px", color: "White" }}>Your Note</Typography>
                <TextField
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    InputProps={{
                        sx: {
                            borderRadius: "5px",
                            height: "100px", fontSize: "11px", color: "#44404D",
                            width: "100%", border: "1px solid #44404D", marginBottom: "15px",
                        }
                    }}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    placeholder="Please write your note here."
                />
            </Box>

            {/* footer */}
            <Box
                sx={{
                    position: "fixed", bottom: 0, backgroundColor: "#302E3B",
                    height: "50px", width: "90%",
                    padding: "20px",
                    boxShadow: 3, borderRadius: "30px 30px 0px 0px",
                    display: "flex", justifyContent: "space-between", textAlign: "center", alignItems: "center"
                }}>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", width: "100%", }}>

                    <Link href={'/Feeds'} >
                        <Button
                            sx={{
                                backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                color: "white", textTransform: "capitalize", fontSize: "13px",
                                borderRadius: "20px", height: "30px", width: "150px",
                                "&:hover": {
                                    backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                }
                            }}>
                            Submit <span className="icon-check1" style={{ marginLeft: "8px", color: "#AAAAAA", fontSize: "18px" }} />
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}
export default page; 
