import * as React from "react";
import { useState, useEffect,useHistory } from "react";
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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sidebar from './sidebar';
import './home.css';
import Testimonial  from "./testimonial";
import { Card } from "@mui/material";
import Chatbot from './chatbot';
export default function Home() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [viewstatus, Viewuserstatus] = useState([]);
  const [originalrows, setoriginalrows] = useState([]);
  const [sidebar , setSidebar ] = useState(false);
  const [filter, setFilter] = useState(null);

  const toggleSidebar = () => {
    console.log("opened")
    setSidebar((prevState) => !prevState)}
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
 
  

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
  const onSidebarButtonClick = (event) => {
    console.log(event.target.name);
    setFilter(event.target.name);
  };

  const fetchData = async () => {
  
    try {
      let API_URL = "http://localhost:4000/post/getproduct";
      if (filter) {
        API_URL = API_URL.concat(`/${filter}`);
      }
      console.log(API_URL);
     const response =  await Axios.get(API_URL);
     console.log(response)
     Viewuserstatus(response.data);
     var product_list = response.data.map((item, index) => ({
       id: item.ID,
       ...item,
     }));
     setoriginalrows(product_list);
     console.log(product_list);
     
    } catch (e) {
      console.log(e);
    }
  };

 

  useEffect(() => {
    fetchData().then();
  }, [filter]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <ThemeProvider theme={darkTheme}>
      <AppBar position="static" position="sticky">
        <Toolbar onClick={toggleSidebar}>
          <div  >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          </div>
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
     

      <div className="container">
      <Sidebar onSidebarButtonClick={onSidebarButtonClick}  sidebar={sidebar} />
      <div className="cardContainer">
    
    
        {originalrows.map((e) => <CustomCard imageUrl = {e.image} title = {e.productname} subTitle = {e.model} id = {e.ID}/>)}
     
      </div>
      </div>
  <div>
      <Testimonial />
     
      </div>
      <Chatbot />
    </Box>
  
  );
 
}

function CustomCard(props) {

    const {imageUrl,title,subTitle,id} = {...props} 
    console.log(id)
    const navigate = useNavigate();
    // const history = useHistory()

   
  
    const detail = (props) => {
    //  console.log(id)
    //  const id = {props}
    console.log(id)
    localStorage.setItem('id',id)

      navigate(`/detailpage/${id}`);
      // nav(`/workspace/${id}`)
    };
  //   const navigates = (props) => {
  //     console.log(id)
  //     history.push(`/detailpage/${id}`)
  // }
  return (
    <div className="card" style={{ background: `url(http://localhost:4000/${imageUrl})` }} onClick={detail}> 
      <div className="meta-wrapper">
        <p className="title"> {title} </p>
        <p className="subtitle"> {subTitle}</p>
      </div>
    </div>
  );
}
