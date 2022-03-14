import React from 'react';
import Slider from "react-slick";
import {  useEffect,useState } from "react";
import Axios from "axios";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './testimonial.css'
import { Avatar, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
export default function Testimonial(){
  const [reviews, setreviews] = useState([]);
 
  useEffect(() => {
   
    Axios.get(`http://localhost:4000/post/gettestimonial`).then(
      (response) => {
        // console.log(response);
      
     
        setreviews(response.data);
      // console.log(review_list);
      }
    );
  },[] );


  return(
  <div className='testimonial' style={{display : "flex",
  justifyContent : "center", marginTop:100}}>
      <div style={{ width: "50%"}}>
      <h1 style={{ marginBottom: 20 }}>TESTIMONIALS</h1>

      <Slider prevArrow={<PreviousBtn />} nextArrow={<NextBtn />} dots>
          {/* <Card img="https://media.istockphoto.com/vectors/happy-young-woman-watching-into-rounded-frame-isolated-on-white-3d-vector-id1296058958?k=20&m=1296058958&s=612x612&w=0&h=AsZaq2ZGD4rIyr7vCuc7NXuAz7954D8wYW93siKAHA4="/>
          <Card img="https://slm-assets.secondlife.com/assets/21370073/lightbox/shiva_new_cvr_8-20-18.jpg?1534798850"/>
          <Card img="https://cdn.dribbble.com/users/2609563/screenshots/11654687/media/71f862f6da5293254a7d758818d48925.jpg?compress=1&resize=400x300"/> */}
          {reviews.map((e) => <Card img = {e.image} comment = {e.comment} name = {e.Name}/>)}

      </Slider>
       
    </div>
    </div>
    ) 
};
function PreviousBtn (props)  {
    // console.log(props);
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowBackIos style={{ color: "gray", fontSize: "45px" }} />
      </div>
    );
  };
  function NextBtn(props) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowForwardIos style={{ color: "gray", fontSize: "45px" }} />
      </div>
    );
  };
function Card(props){


    const {comment,img,name} = {...props} 
    console.log(img)
  const [value , setValue ] = useState(5);
    return(
        <div style={{
            display : "flex",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            fontStyle: "italic",
            color:"gray",
        }}>
            <Avatar
            imgProps={{style: {borderRadius:"50%"}}}
             src={img}
             style={{width:120,
                 height:120 ,
                  border:'1px solid lightgray',
                  padding: 7,
                  marginBottom: 20,
                  }}/>
            {/* <Typography>{reviews.map((elem) => <li key={elem.comment}>{elem.comment}</li> )} </Typography>  */}
            <p>{comment}</p>
            <p><span style={{fontWeight:500,color:"green"}}>{name}</span><span>  
               <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      </Box></span></p>
        </div>
    )
}



