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
import { Link } from "@/i18n/navigation"
import { useTranslations } from 'next-intl';
import { getCartItems } from '../ProductDetails/cartUtils';
import axios from 'axios';
import { BASE_URL, calculateOrderPriceDetailed, egyptCities, fetchShopsData } from '@/utils';
import MapView from './map';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';


const options = [
    { label: 'Takeaway', icon: <span className='icon-takeaway' style={{ fontSize: '45px' }}></span>, value: 'take_away' },
    { label: 'Dine In', icon: <span className='icon-table' style={{ fontSize: '45px' }}></span>, value: 'dine_in' },
    { label: 'Delivery', icon: <span className="icon-scooter" style={{ fontSize: '45px' }}></span>, value: 'delivery' },
];
const page = () => {
    const t = useTranslations()
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [table, setTable] = useState([]);
    const [showMap, setShowMap] = useState(false);
    const [userPosition, setUserPosition] = useState(null)
    const router = useRouter()

    const { data: shops, isError, error, refetch } = useQuery({
        queryKey: ['shops'],
        queryFn: fetchShopsData,
        staleTime: 1000 * 60 * 15, // 15 minutes
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });

    const [selectedOption, setSelectedOption] = useState('dine_in');
    const [branchServigWay, setBranchServingWary] = useState([])

    const searchParams = useSearchParams();
    const shopId = searchParams.get('shopId')
    const branchId = searchParams.get('branchId')
    const tableId = searchParams.get('tableId')

    useEffect(() => {
        const storedCartItems = getCartItems();
        console.log("cartItems>>>>>>>>>>>>>>>>>>>>", storedCartItems)// debug log 

        const branchId = storedCartItems?.[0]?.branchId
        const shopId = storedCartItems?.[0]?.shopId
        console.log("cartItems>>>>>>>>>>>>>>>>>>>>", branchId, ">>>", shopId)// debug log 

        const shop = shops?.find(item => Number(item.id) === Number(shopId))
        console.log("shop>>>>>>>>>>>>>>>>>>>>", shopId, ">>>", shop)// debug log 
        const branch = shop?.brunchs?.find(item => Number(item.id) === Number(branchId))
        console.log("branch>>>>>>>>>>>>>>>>>>>>", branchId, ">>>", branch)// debug log 
        if (!tableId) {

            setBranchServingWary(branch?.serving_ways)
            setSelectedOption(branch?.serving_ways?.[0]?.name)
        } else {
            const dineIn = branch?.serving_ways?.find(item => item.name === "dine_in")
            console.log("dinein>>>>>>>>>>>>", dineIn) // debug log 
            if (dineIn) {
                setBranchServingWary([dineIn])
                setSelectedOption(dineIn?.name)
            }

        }
        // serving_ways
        /* 0
        : 
        {id: 885, name: 'delivery', brunch_id: 187, tables_number: null, deleted_at: null, …}
        1
        : 
        {id: 886, name: 'take_away', brunch_id: 187, tables_number: null, deleted_at: null, …}
        2
        : 
        {id: 887, name: 'dine_in', brunch_id: 187, tables_number: 12, deleted_at: null, …} */
    }, [shops])

    const getTable = async () => { // TODO: handle this user suppose to select table based of QR code on the table he set on
        try {

            const response = await axios.get(`${BASE_URL}tables`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            console.log("Table data response ", response);// debug log 
            if (response.data) {
                setTable(response.data.tables);
            }

        } catch (error) {
            console.log("error Table data ", error);
        }
    }

    useEffect(() => {
        const storedCartItems = getCartItems();
        setCartItems(storedCartItems);
        getTable()
    }, []);
    const [validDiscountCode, setValidDiscountCode] = useState(null);

    useEffect(() => {
        calculateOrderPriceDetailed(cartItems, setSubTotal, setTax, setDiscount, setTotalPrice, validDiscountCode)
    }, [cartItems, validDiscountCode]);


    // =========================================================================

    // دالة لتحديث العنصر النشط عند الضغط
    const handleClick = (optionValue) => {
        setSelectedOption(optionValue);
    };
    const getTransformStyle = (optionValue) => {
        const translateMap = {
            delivery: 'translate(100px, -20px)',
            dine_in: 'translate(-10px, 40px)',  // العنصر النشط دائما في هذا المكان
            take_away: 'translate(-120px, -20px)',
        };
        if (optionValue === selectedOption) {
            return translateMap.dine_in; // العنصر النشط دائما هنا
        }

        // بالنسبة لبقية العناصر
        if (optionValue === 'dine_in') {
            return selectedOption === 'take_away' ? translateMap.take_away : translateMap.delivery;
        }

        return translateMap[optionValue] || 'translate(0, 0)';
    };


    const renderIcon = () => {

        switch (selectedOption) {
            case 'dine_in':
                return <span className='icon-table' style={{ fontSize: '70px', color: "#aaaaaa2c" }}></span>;

            case 'take_away':
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
            paymentWay: selectedValue,
            servingWay: selectedOption,
            userPosition
        };
        localStorage.setItem('formData', JSON.stringify(data));
    }, [phone, selectedTable, selectedCity, selectedName, comment, address, code, selectedValue, selectedOption, userPosition]);

    const handlePlaceOrderClick = () => {
        setIsLoading(true)
        if (!phone || !selectedName) {
            toast.error(t("pleaseFillAllFields"))
            setIsLoading(false)
            return;
        }
        if (selectedOption === 'delivery' && (!userPosition || !address)) {
            toast.error(t("pleaseFillAllFields"))
            setIsLoading(false)
            return;
        }

        router.push('/payment' + (shopId || branchId ? `?shopId=${shopId}&branchId=${branchId}` + (tableId ? `&tableId=${tableId}` : '') : (tableId ? `?tableId=${tableId}` : '')))

    }
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
                            <Link href={'cart' + (shopId || branchId || tableId ? `?shopId=${shopId}&branchId=${branchId}` + (tableId ? `&tableId=${tableId}` : "") : '')}>
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
                            {options.map((option) => (branchServigWay?.some(item => item.name === option.value) &&
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

                        {selectedOption === 'dine_in' && (
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
                                        {table?.map(item => <MenuItem value={2} sx={{ fontSize: "11px", color: "#797993", }}>{t("table")} {item}</MenuItem>)}
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
                                        {egyptCities.map(city => <MenuItem value={city.name} sx={{ fontSize: "11px", color: "#797993", }}>{city.name}</MenuItem>)}
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
                                    <Button
                                        onClick={() => setShowMap(prev => !prev)}
                                        sx={{
                                            backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                            color: "white", height: "35px",
                                            width: "100%", borderRadius: "20px", fontSize: "12px",
                                            textTransform: "capitalize",
                                            "&:hover": {
                                                backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                                            }
                                        }}>
                                        <span className="icon-map-1" style={{ fontSize: "19px", marginRight: "7px" }}><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span><span className="path7"></span><span className="path8"></span><span className="path9"></span><span className="path10"></span><span className="path11"></span><span className="path12"></span><span className="path13"></span><span className="path14"></span><span className="path15"></span></span>
                                        {showMap ? 'Hide Map' : t("pinYourLocation")}
                                    </Button>
                                </Box>
                                {showMap && <MapView setUserPosition={setUserPosition} />}
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
                    borderRadius: "30px 30px 0px 0px", display: "flex", justifyContent: "space-between", zIndex: '30'
                }}>
                <Box sx={{ width: "90%" }}>
                    <Typography variant="h6" sx={{ fontSize: '12px', color: '#AAAAAA' }}>
                        {t("subTotal")}: <span style={{ color: 'white' }}>{subTotal} EGP</span>
                    </Typography>

                    <Typography variant="h6" sx={{ fontSize: '12px', color: '#AAAAAA' }}>
                        {t("tax")}: <span style={{ color: 'white' }}>{tax} EGP</span>
                    </Typography>

                    <Typography variant="h6" sx={{ fontSize: '12px', color: '#AAAAAA' }}>
                        {t("disCount")}: <span style={{ color: 'white' }}>{discount} EGP</span>
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
                                    <span className="icon-price-tag" style={{ fontSize: '16px', color: "green" }}></span>
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
                                        <span className="icon-wallet" style={{ fontSize: '16px', marginRight: "4px" }}><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span><span className="path7"></span><span className="path8"></span><span className="path9"></span><span className="path10"></span><span className="path11"></span><span className="path12"></span></span>
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
                                        <span className="icon-wallet" style={{ fontSize: '16px', marginRight: "4px" }}><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span><span className="path7"></span><span className="path8"></span><span className="path9"></span><span className="path10"></span><span className="path11"></span><span className="path12"></span></span>
                                        <Typography sx={{ fontSize: '12px', color: "#AAAAAA" }}>{t("digitalWallet")}</Typography>
                                    </Box>}
                            />
                        </Box>
                    </RadioGroup>

                    {/* <Link href='/payment'> */}
                    <Button
                        onClick={handlePlaceOrderClick}
                        sx={{
                            width: "85%", marginTop: "10px",
                            backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                            color: "white", textTransform: "capitalize", fontSize: "12px",
                            borderRadius: "20px", height: "30px",
                            "&:hover": {
                                backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                            }
                        }}
                        disabled={isLoading}
                    >
                        {t("placeOrder")}<DoneOutlinedIcon sx={{ fontSize: "20px", ml: 1 }} />
                    </Button>
                    {/* </Link> */}

                </Box>
            </Box> {/* footer */}

        </Box >
    )
}
export default page; 