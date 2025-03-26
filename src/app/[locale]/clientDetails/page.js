"use client";
import React, { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TextField, MenuItem, InputAdornment, OutlinedInput, Divider, FormControl, Select, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CheckIcon from '@mui/icons-material/Check';
import 'react-phone-input-2/lib/style.css';
import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';
import Link from 'next/link';
import { useTranslations } from 'next-intl';


const options = [
    { label: 'Takeaway', icon: <span className='icon-takeaway' style={{ fontSize: '45px' }}></span>, value: 'takeaway' },
    { label: 'Dine In', icon: <span className='icon-table' style={{ fontSize: '45px' }}></span>, value: 'dinein' },
    { label: 'Delivery', icon: <span className="icon-scooter" style={{ fontSize: '45px' }}></span>, value: 'delivery' },
];
const page = () => {
    const t = useTranslations()
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const getTotalPriceFromLocalStorage = () => {
            const storedPrice = localStorage.getItem('totalPrice');
            return storedPrice ? parseFloat(storedPrice) : 0;
        };

        setTotalPrice(getTotalPriceFromLocalStorage());
    }, []);

    // =========================================================================
    const [selectedOption, setSelectedOption] = useState('dinein');

    // دالة لتحديث العنصر النشط عند الضغط
    const handleClick = (optionValue) => {
        setSelectedOption(optionValue);
    };
    const getTransformStyle = (optionValue) => {
        const translateMap = {
            delivery: 'translate(100px, -20px)',
            dinein: 'translate(-10px, 40px)',  // العنصر النشط دائما في هذا المكان
            takeaway: 'translate(-120px, -20px)',
        };
        if (optionValue === selectedOption) {
            return translateMap.dinein; // العنصر النشط دائما هنا
        }

        // بالنسبة لبقية العناصر
        if (optionValue === 'dinein') {
            return selectedOption === 'takeaway' ? translateMap.takeaway : translateMap.delivery;
        }

        return translateMap[optionValue] || 'translate(0, 0)';
    };


    const renderIcon = () => {

        switch (selectedOption) {
            case 'dinein':
                return <span className='icon-table' style={{ fontSize: '70px', color: "#aaaaaa2c" }}></span>;

            case 'takeaway':
                return <span className='icon-takeaway' style={{ fontSize: '70px', color: "#aaaaaa2c" }}></span>;

            case 'delivery':
                return <span className="icon-scooter" style={{ fontSize: '70px', color: "#aaaaaa2c" }}></span>;

            default:
                return <p>No icon available</p>;
        }
    };

    // =========================================================================


    const [phone, setPhone] = useState('');
    const [selectedTable, setSelectedTable] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const [comment, setComment] = useState("");
    const [address, setAddress] = useState("");
    const [code, setCode] = useState("");

    const [selectedValue, setSelectedValue] = useState('cash');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        const data = {
            phone,
            selectedTable,
            selectedCity,
            selectedName,
            comment,
            address,
            code,
            selectedValue,
            selectedOption,
        };
        localStorage.setItem('formData', JSON.stringify(data));
    }, [phone, selectedTable, selectedCity, selectedName, comment, address, code, selectedValue, selectedOption]);

    // =========================================================================



    return (
        <Box
            sx={{
                color: 'white',
                backgroundColor: '#1E1E2A',
                height: "auto",
                width: '100%',
            }}>

            <Box sx={{ backgroundColor: "#1E1E2A", height: "43vh", zIndex: 1322 }}>
                <Box
                    sx={{
                        position: 'fixed',
                        top: '-30vh',
                        width: '100%',
                        height: '60vh',
                        borderRadius: '50%',
                        backgroundColor: '#302E3B',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        overflow: 'hidden',
                        zIndex: 1,

                    }}>

                    <Box
                        sx={{
                            position: "fixed",
                            top: "0",
                            width: '100%',
                        }}
                    >
                        {/* header */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '10px',
                            }}
                        >
                            <Link href='cart'>
                                <IconButton sx={{ color: "white" }}>
                                    <ArrowBackIosIcon sx={{ fontSize: "22px" }} />
                                </IconButton>
                            </Link>

                            <IconButton color="inherit">
                                <span className='icon-menu' style={{ fontSize: "22px" }}></span>
                            </IconButton>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                            {renderIcon()}
                        </Box>

                        <Box sx={{ display: "flex", position: 'relative', width: '100%', height: '100%' }}>
                            {options.map((option) => (
                                <Box
                                    onClick={() => handleClick(option.value)}
                                    key={option.value}
                                    sx={{
                                        position: 'absolute',
                                        top: '70%',
                                        left: '45%',
                                        transformOrigin: 'center',
                                        transform: getTransformStyle(option.value),
                                        transition: 'transform 0.3s ease',
                                        color: selectedOption === option.value ? '#fff' : '#aaa',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',

                                    }}
                                >
                                    <IconButton
                                        sx={{
                                            background: selectedOption === option.value
                                                ? 'linear-gradient(135deg, #1E1E2A, #797993)'
                                                : "#44404D",
                                            color: selectedOption === option.value ? '#fff' : '#aaa',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            padding: '20px 15px',
                                            borderRadius: '15px',
                                            '&:hover': {
                                                backgroundColor: selectedOption === option.value ?
                                                    'linear-gradient(135deg, #1E1E2A, #797993)' : "#44404D",
                                            },
                                        }}
                                    >
                                        {option.icon}
                                    </IconButton>
                                    <Typography variant="caption">{t(option.label)}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    overflowY: 'auto',
                    height: 'calc(100vh - 43vh)',
                }}
            >
                {/* الحقول*/}
                {selectedOption && (
                    <Box width="90%" sx={{ padding: "0px 20px" }} >

                        <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "white" }}>{t("name")}</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={selectedName}
                            onChange={(e) => setSelectedName(e.target.value)}
                            placeholder={t("customerName")}
                            sx={{ marginBottom: "15px" }}
                            InputProps={{
                                sx: {
                                    borderRadius: "5px", border: "1px solid #44404D",
                                    height: "35px", fontSize: "11px", color: "#797993", width: "100%"
                                }
                            }}
                        />
                        <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "white" }}>{t("mobileNumber")}</Typography>
                        <PhoneInput
                            country={'eg'}
                            value={phone}
                            onChange={(phone) => setPhone(phone)}
                            inputStyle={{
                                width: '100%',
                                height: '35px',
                                fontSize: "11px", backgroundColor: "#1E1E2A", border: "1px solid #44404D", color: "#797993"
                            }}
                            buttonStyle={{
                                borderRadius: '5px 0 0 5px', backgroundColor: "#1E1E2A", border: "1px solid #44404D"
                            }}
                        />
                        <Divider sx={{ width: "100%", height: "1px", backgroundColor: "#44404D", margin: "15px 0px" }} />


                        {selectedOption === 'dinein' && (
                            <>
                                <Box display={"flex"} justifyContent={"space-between"}>
                                    <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "white" }}>{t("table")}</Typography>
                                    <Typography variant='body2' sx={{ fontSize: "10px", marginBottom: "3px", color: "white" }}>4 {t("seats")}</Typography>
                                </Box>

                                <FormControl fullWidth variant="outlined">
                                    <Select
                                        value={selectedTable}
                                        onChange={(e) => setSelectedTable(e.target.value)}
                                        displayEmpty
                                        sx={{
                                            marginBottom: "15px", borderRadius: "5px", border: "1px solid #44404D",
                                            height: "35px", fontSize: "11px", color: "#797993", width: "100%"
                                        }}
                                        input={
                                            <OutlinedInput
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <TableBarOutlinedIcon sx={{ fontSize: "20px", color: "#797993" }} />
                                                    </InputAdornment>
                                                }
                                            />
                                        }
                                    >
                                        <MenuItem value="" disabled sx={{ fontSize: "11px", color: "white", }}>
                                            {t("selectTable")}
                                        </MenuItem>
                                        <MenuItem value={2} sx={{ fontSize: "11px", color: "#797993", }}>{t("table")} 2</MenuItem>
                                        <MenuItem value={3} sx={{ fontSize: "11px", color: "#797993", }}>{t("table")} 3</MenuItem>
                                        <MenuItem value={4} sx={{ fontSize: "11px", color: "#797993", }}>{t("table")} 4</MenuItem>
                                        <MenuItem value={1} sx={{ fontSize: "11px", color: "#797993", }}>{t("table")} 1</MenuItem>
                                    </Select>
                                </FormControl>
                            </>
                        )}

                        {selectedOption === 'delivery' && (
                            <>
                                <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "white" }}>{t("city")}</Typography>
                                <FormControl fullWidth variant="outlined">
                                    <Select
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        displayEmpty
                                        sx={{
                                            marginBottom: "15px", borderRadius: "5px", height: "35px", fontSize: "11px",
                                            color: "#797993", width: "100%", border: "1px solid #797993"
                                        }}
                                    >
                                        <MenuItem value="" disabled sx={{ fontSize: "11px", color: "#797993", }}>
                                            {t("selectCity")}
                                        </MenuItem>
                                        <MenuItem value={1} sx={{ fontSize: "11px", color: "#797993", }}>City 1</MenuItem>
                                        <MenuItem value={2} sx={{ fontSize: "11px", color: "#797993", }}>City 2</MenuItem>
                                        <MenuItem value={3} sx={{ fontSize: "11px", color: "#797993", }}>City 3</MenuItem>
                                        <MenuItem value={4} sx={{ fontSize: "11px", color: "#797993", }}>City 4</MenuItem>
                                    </Select>
                                </FormControl>
                                <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "white" }}>{t("address")}</Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder={t("streetBuildingFloor")}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}

                                    sx={{ marginBottom: "15px" }}
                                    InputProps={{
                                        sx: {
                                            borderRadius: "5px",
                                            height: "35px", fontSize: "11px", color: "#797993",
                                            width: "100%", border: "1px solid #797993"
                                        }
                                    }}
                                />
                                <Box sx={{
                                    display: "flex", marginBottom: "20px", textAlign: "center", alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Button sx={{
                                        backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                        color: "white", height: "35px",
                                        width: "100%", borderRadius: "20px", fontSize: "12px",
                                        textTransform: "capitalize",
                                        "&:hover": {
                                            backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                        }
                                    }}>
                                        <span class="icon-map-1" style={{ fontSize: "19px", marginRight: "7px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span></span>
                                        {t("pinYourLocation")}</Button>
                                </Box>
                            </>
                        )}

                        {selectedOption === 'takeaway' && (
                            <> </>
                        )}

                        <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "White" }}>Comments</Typography>
                        <TextField
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            InputProps={{
                                sx: {
                                    borderRadius: "5px",
                                    height: "55px", fontSize: "11px", color: "#797993",
                                    width: "100%", border: "1px solid #797993", marginBottom: "15px",
                                }
                            }}
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={2}
                            placeholder={t("orderComment")}
                        />

                        <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "White" }}>
                            {t("discountCode")}</Typography>
                        <TextField
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <span style={{ fontSize: "20px", color: "#797993" }} >% </span>

                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <CheckIcon sx={{ fontSize: "25px", color: "#009444" }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: "5px",
                                    height: "35px",
                                    marginBottom: "200px",
                                    fontSize: "11px",
                                    color: "#797993",
                                    width: "100%",
                                    border: "1px solid #797993",
                                }
                            }}
                            fullWidth
                            variant="outlined"
                            placeholder={t("enterYourDiscountCodeHere")}
                        />


                    </Box>
                )}
            </Box>

            <Box
                sx={{
                    position: "fixed", bottom: 0, backgroundColor: "#302E3B", width: "90%", padding: "20px",
                    borderRadius: "30px 30px 0px 0px", display: "flex", justifyContent: "space-between",
                }}>
                <Box sx={{ width: "90%" }}>
                    <Typography variant="h6" sx={{ fontSize: '12px', color: '#AAAAAA' }}>
                        {t("subTotal")}: <span style={{ color: 'white' }}>0:00 EGP</span>
                    </Typography>

                    <Typography variant="h6" sx={{ fontSize: '12px', color: '#AAAAAA' }}>
                        {t("tax")}: <span style={{ color: 'white' }}>0:00 EGP</span>
                    </Typography>

                    <Typography variant="h6" sx={{ fontSize: '12px', color: '#AAAAAA' }}>
                        {t("disCount")}: <span style={{ color: 'white' }}>0:00 EGP</span>
                    </Typography>

                    <Divider sx={{ margin: "3px 30px 3px 0px", backgroundColor: "#AAAAAA" }} />

                    <Typography variant="h6" sx={{ fontSize: '11px', fontWeight: "bold", color: '#AAAAAA' }}>
                        {t("totalPrice")}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: "bold", color: 'white' }}>
                        {totalPrice}<span style={{ fontSize: "10px", fontWeight: "400", color: '#AAAAAA' }}>EGP</span>
                    </Typography>
                </Box>

                <Box sx={{ width: "100%" }}>
                    <RadioGroup defaultValue="cash" onChange={handleChange} >
                        <FormControlLabel sx={{ color: '#AAAAAA' }} value="cash"
                            control={
                                <Radio size="small"
                                    sx={{
                                        color: selectedValue === 'cash' ? '#797993' : '#AAAAAA',
                                        fontSize: "12px",
                                        '&.Mui-checked': { color: '#797993' },
                                        '& .MuiSvgIcon-root': { fontSize: 20 },
                                    }}
                                />
                            }
                            label={
                                <Box display="flex" alignItems="center">
                                    <span class="icon-price-tag" style={{ fontSize: '16px', color: "green" }}></span>
                                    <Typography sx={{ fontSize: '12px', color: "#AAAAAA" }}>{t("cashCard")}</Typography>
                                </Box>}
                        />

                        <Box sx={{ marginTop: "-15px", }}>
                            <FormControlLabel sx={{ color: '#AAAAAA' }} value="cart"
                                control={
                                    <Radio size="small"
                                        sx={{

                                            color: selectedValue === 'cart' ? '#797993' : '#AAAAAA',
                                            fontSize: "8px",
                                            '&.Mui-checked': { color: '#797993' },
                                            '& .MuiSvgIcon-root': { fontSize: 20 },
                                        }}
                                    />
                                }
                                label={
                                    <Box display="flex" alignItems="center">
                                        <span class="icon-wallet" style={{ fontSize: '16px', marginRight: "4px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>
                                        <Typography sx={{ fontSize: '12px', color: "#AAAAAA" }}>{t("cart")}</Typography>
                                    </Box>}
                            />
                        </Box>

                        <Box sx={{ marginTop: "-15px", }}>
                            <FormControlLabel sx={{ color: '#AAAAAA' }} value="wallet"
                                control={
                                    <Radio size="small"
                                        sx={{

                                            color: selectedValue === 'wallet' ? '#797993' : '#AAAAAA',
                                            fontSize: "8px",
                                            '&.Mui-checked': { color: '#797993' },
                                            '& .MuiSvgIcon-root': { fontSize: 20 },
                                        }}
                                    />
                                }
                                label={
                                    <Box display="flex" alignItems="center">
                                        <span class="icon-wallet" style={{ fontSize: '16px', marginRight: "4px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>
                                        <Typography sx={{ fontSize: '12px', color: "#AAAAAA" }}>{t("digitalWallet")}</Typography>
                                    </Box>}
                            />
                        </Box>
                    </RadioGroup>

                    <Link href='/payment'>
                        <Button
                            sx={{
                                width: "85%", marginTop: "10px",
                                backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                color: "white", textTransform: "capitalize", fontSize: "12px",
                                borderRadius: "20px", height: "30px",
                                "&:hover": {
                                    backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                }
                            }}>
                            {t("placeOrder")}<DoneOutlinedIcon sx={{ fontSize: "20px", ml: 1 }} />
                        </Button>
                    </Link>

                </Box>
            </Box> {/* footer */}

        </Box >
    )
}
export default page; 