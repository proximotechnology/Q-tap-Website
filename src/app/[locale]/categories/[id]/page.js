"use client";
import React from 'react'
import { Box, IconButton, Typography } from '@mui/material';
import { categoryProducts, menuItems } from '../data';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from 'next/link';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { useTranslations } from 'next-intl';


const page = ({ params }) => {
  const t = useTranslations()
  const { id } = params;

  if (!id || !categoryProducts[id]) {
    return <p>{t("noProductAvailableForThisCategory")}</p>;
  }
  const catProduct = menuItems.find((item) => item.id === parseInt(id));
  // console.log(catProduct) 

  const products = categoryProducts[id];
  // console.log(products)



  return (
    <Box
      sx={{
        position: 'relative',
        color: 'white',
        backgroundColor: '#1E1E2A',
        overflow: 'hidden',
        height: "100vh",
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '200px',
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0)), 
    url(${catProduct.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '0px 0px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: '95%',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 12px 0px 12px',
          }}
        >
          <Link href='/categories'>
            <IconButton sx={{ color: "white" }}>
              <ArrowBackIosIcon sx={{ fontSize: "22px" }} />
            </IconButton>
          </Link>
          <IconButton color="inherit">
            <span className='icon-menu' style={{ fontSize: "22px" }}></span>
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            height: '100%',
          }}
        >
          <Typography variant="h6"
            sx={{
              textAlign: 'center',
              fontSize: '23px',
              color: 'white',
              textShadow: '2px 0px #E57C00'
            }}>
            {t(catProduct.title)}
          </Typography>
        </Box>
      </Box>


      <Box sx={{ margin: "10px 0px " }}>
        {products.map((product) => (
          <>
            <Box sx={{ padding: '5px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom="2px solid gray">
                <Box sx={{ marginBottom: "6px" }}>
                  <Typography variant="h6" sx={{ color: '#797993', fontSize: "17px", fontWeight: "900" }}>
                    {product.name} {product.id}</Typography>

                  <Typography variant="body1" sx={{ color: '#AAAAAA', fontSize: "11px" }}>
                    {product.brief}</Typography>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "900" }}>{product.price}
                      <span style={{ color: "#575756", fontSize: "9px", }}> EGP</span>
                    </Typography>

                    {/* availability */}
                    <Typography variant="body2" sx={{
                      display: "flex", alignItems: "center", color: "#575756",
                      marginLeft: "15px", fontSize: "9px"
                    }}>
                      {product.availability === "Available" ? (
                        <>
                          <CheckIcon sx={{ color: "green", fontWeight: "900", fontSize: "14px", marginLeft: "5px" }} />
                          {product.availability}
                        </>
                      ) : (
                        <>
                          <span className='icon-close1' style={{ fontSize: "8px", marginRight: "5px" }} />
                          {product.availability}
                        </>
                      )}
                    </Typography>
                  </Box>

                </Box>

                <Box>
                  <Box display="flex" alignItems="center" marginBottom={"10px"} >
                    <span className='icon-star' style={{ fontSize: "14px" }} />
                    <Typography variant="body2" sx={{ marginLeft: '4px', color: "#AAAAAA" }}>
                      {product.rating.toFixed(1)}
                    </Typography>
                  </Box>

                  <Link key={product.id} href={`/ProductDetails/${product.id}`}>
                    <Box
                      sx={{
                        backgroundImage: 'linear-gradient(to right, #48485B, #797993)',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <AddIcon className="icon" sx={{ color: 'white', fontSize: '18px' }} />
                    </Box>
                  </Link>
                </Box>
              </Box>


            </Box>
          </>
        ))}
      </Box>
    </Box>
  )
}



export default page;
