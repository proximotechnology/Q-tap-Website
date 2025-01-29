
import React from 'react'
import Link from 'next/link';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Language from '@/component/Language';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { Button, Box, IconButton, Divider, Typography } from '@mui/material';
import { InputAdornment, OutlinedInput, FormControl } from '@mui/material'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';


export const NewPassword = () => {
    return (
        <Box
            sx={{
                width: "100%", height: "100vh",
                backgroundImage: "url('/images/Rectangle.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                position: "absolute", top: 0, left: 0,
                display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center"
            }}>
              <Box
                sx={{
                    position: "relative",
                    zIndex: 5,
                    width: "100%",
                    height: { xs: "46vh", sm: "40vh", md: "45vh" },
                    borderRadius: "0px 0px 30px 30px",
                    backgroundImage: "url('/images/Marketing.jpg')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    '::before': {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: "inherit",
                        background: "linear-gradient(to top right,rgba(230, 127, 0, 0.541),rgba(54, 43, 57, 0.582),rgba(54, 43, 57, 0.582), rgba(33, 33, 63, 0.5))",
                        zIndex: 6,
                    }
                }}>

                <Box sx={{
                    display: "flex", position: "relative", zIndex: 10,
                    justifyContent: "space-between", alignItems: "center",
                    textAlign: "center", padding: { xs: "10px 20px", sm: "15px 40px", md: "20px 60px" }
                }}>
                    <IconButton>
                        <Link href="/">
                            <KeyboardArrowLeftIcon sx={{ fontSize: "25px", color: "white" }} />
                        </Link>
                    </IconButton>

                    <Box>
                        <Language />
                    </Box>
                </Box>

                <Box sx={{
                    position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
                    textAlign: "center", alignItems: "center"
                }}>
                    <Typography variant='h1' sx={{ fontSize: { xs: "18px", md: "23px" }, color: "white" }}>
                        Affiliate Marketing
                    </Typography>

                    <Divider sx={{
                        backgroundColor: "#E57C00", width: "5%", height: "3px",
                        margin: "12px auto", borderRadius: "20px"
                    }} />

                    <Typography
                        variant='body2'
                        sx={{
                            width: { xs: "80%", md: "55%" },
                            fontSize: { xs: "10px", md: "12px" },
                            marginBottom: "20px",
                            lineHeight: "20px",
                            padding: "0px 10%", color: "white"
                        }}
                    >
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit                     </Typography>

                    <Link href="/Signup">
                        <Button sx={{
                            fontSize: "12px", backgroundColor: "#E57C00", textTransform: "capitalize", borderRadius: "20px",
                            color: "white", padding: "4px 20px"
                        }}>
                            <PersonAddOutlinedIcon sx={{ fontSize: "15px", marginRight: "5px" }} />
                            Register
                        </Button>
                    </Link>
                </Box>
            </Box>


            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{ width: { xs: "70%", md: "20%" }, margin: "50px 0px" }}
            >

                <Typography variant="body2"
                    sx={{
                        fontSize: "13px", color: "#222240", marginBottom: "8px",
                        letterSpacing: "11px",
                    }}>
                    Password Reset
                </Typography>

                <Box
                    sx={{
                        borderBottom: "3px solid #E57C00", borderRadius: "20px",
                        width: { lg: "100%", md: "50%", xs: "50%" },
                        marginBottom: 5
                    }}
                />


                <Typography variant="body1"
                    sx={{
                        color: "#AAAAAA", width: "70%", lineHeight: "20px",
                        marginBottom: 4, fontSize: "13px", textAlign: 'center'
                    }}>
                    Enter New Password
                </Typography>

                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <OutlinedInput
                        id="new-password"
                        type='password'
                        startAdornment={
                            <InputAdornment position="start">
                                <LockOpenOutlinedIcon sx={{ fontSize: "18px" }} />

                            </InputAdornment>
                        }
                        placeholder="New Password"
                        sx={{ fontSize: "10px", borderRadius: '50px', paddingRight: 3, height: "35px", marginBottom: "10px" }}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                    <OutlinedInput
                        id="confirm-password"
                        type='password'
                        startAdornment={
                            <InputAdornment position="start">
                                <LockOpenOutlinedIcon sx={{ fontSize: "18px" }} />
                            </InputAdornment>
                        }
                        placeholder="Confirm Password"
                        sx={{ borderRadius: '50px', paddingRight: 3, height: "35px", fontSize: "10px" }}
                    />
                </FormControl>

                <Link href="/welcome" style={{ width: "100%",marginTop:"20px" }}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            maxWidth: 400,
                            borderRadius: '50px',
                            backgroundColor: "#222240",
                            textTransform: 'none',
                            padding: "8px 0", fontSize: "12px",
                            '&:hover': {
                                backgroundColor: "#222240",
                            },
                            color: "#fff"
                        }}
                        endIcon={<ArrowRightOutlinedIcon sx={{ color: "white", fontSize: "18px" }} />}
                    >
                        Save
                    </Button>
                </Link>

            </Box>
        </Box>

    )
}
