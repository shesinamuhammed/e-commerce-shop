import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Stack, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import StarRateIcon from "@mui/icons-material/StarRate";
import "./detailpage.css";
import Stripe from "./stripe";
export default function Detailpage() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [viewstatus, Viewuserstatus] = useState([]);
  const [originalrows, setoriginalrows] = useState([]);
  const [reviews, setreviews] = useState([]);

  const [comment, setComment] = useState("");
  const [value, setValue] = useState(2);
  const [message, showMessage] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    Axios.post("http://localhost:4000/post/logout", {}).then((response) => {
      console.log(response.data.isloogedin);
      const isloogedin = response.data.isloogedin;

      if (!isloogedin) {
        console.log(isloogedin);
        // localStorage.removeItem(isloogedin);
        localStorage.clear();
        console.log(isloogedin);
        navigate("/login");
      } else {
        console.log(isloogedin);
        // navigate('/')
      }
    });
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userpro = () => {
    navigate("/userprofile");
  };
  const params = useParams();
  useEffect(() => {
    // console.log(props.id)
    Axios.get(`http://localhost:4000/post/1/get/${params.id}`).then(
      (response) => {
        console.log(response);
        Viewuserstatus(response.data);
        var product_list = response.data.map((item, index) => ({
          id: item.ID,
          ...item,
        }));
        setoriginalrows(product_list);
        console.log(product_list);
      }
    );
  }, [params.id]);

  useEffect(() => {
    // console.log(props.id)
    Axios.get(`http://localhost:4000/post/1/getcomment/${params.id}`).then(
      (response) => {
        console.log(response);

        var review_list = response.data.map((item, index) => ({
          id: item.ID,
          ...item,
        }));
        setreviews(review_list);
        console.log(review_list);
      }
    );
  }, [params.id]);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });
  console.log(localStorage.getItem("userid"));

  const onButtonClickHandler = () => {
    console.log(localStorage.getItem("userid"));
    showMessage({ showMessage: !showMessage });
    console.log("submit");
    Axios.post(`http://localhost:4000/post/comment/${params.id}`, {
      comment: comment,
      rating: value,
      customerid: localStorage.getItem("userid"),
    }).then((response) => {
      console.log(response);
      console.log(response.data.data.comment);
      // setreviews(response.data.data);
      setreviews((current) => [response.data.data, ...current]);
    });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              align="left"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              BLUSH
            </Typography>

            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={userpro}>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <CustomCard imageUrl={originalrows[0]?.image} />
        </Grid>
        <Grid xs={8}>
          <div className="details-wrapper">
            <Typography variant="h4" className="main-heading">
              {originalrows[0]?.productname}
            </Typography>
            <Typography variant="h6" className="sub-heading">
              {originalrows[0]?.model}
            </Typography>
            <Typography variant="h5" className="price">
              ₹{originalrows[0]?.price}
            </Typography>
            {/* <span className={'org-price'}>₹8,000</span>
   <span className={'off-perce'}>(20% OFF)</span> */}
            <Typography className="description">
              {originalrows[0]?.description}
            </Typography>

            <Stack mt={3}>
              <TextField
                label="Enter Your Comments..."
                type="text"
                variant="outlined"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                }}
              >
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
            </Stack>
            <div>
               <span><Button
              pl={5}
              variant="contained"
              onClick={onButtonClickHandler}
              size="large"
            >
              Submit
            </Button> 
        
            <Stripe marginRight='10px' className='stipe' data={originalrows}/></span>
            </div>
         
            {/* <Typography>{comment}</Typography> */}
            {/* {message && <Typography>{comment}</Typography>} */}
          </div>
        </Grid>
       
      </Grid>

      <div>
        {/* {message && <Typography>{comment}</Typography>} */}
        <Typography>
          <Box sx={{ mb: 4 }}>
            {" "}
            {reviews.map((elem) => (
              <Box
                key={elem.comment}
                sx={{
                  borderBottom: "1px dashed grey",
                  width: 500,
                  textAlign: "left",
                  marginLeft: 70,
                  mb: 1,
                  gridGap: 8,
                  px: 1,

                  height: 50,
                }}
              >
                <div className="review">
                  <div className="review-content">
                    <p className="p-class">{elem.comment}</p>
                  </div>
                  <div className="review">
                    <span>{elem.ratingvalue}</span>
                    <span className="star-class">
                      <StarRateIcon
                        style={{ color: "#009F6B", marginLeft: "8px" }}
                      />
                    </span>
                  </div>
                </div>
              </Box>
            ))}
          </Box>
        </Typography>
      </div>
    </Box>
  );
}

function CustomCard(props) {
  const { imageUrl } = { ...props };

  return (
    <div
      className="card"
      style={{ background: `url(http://localhost:4000/${imageUrl})` }}
    ></div>
  );
}
