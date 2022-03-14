import React from 'react';
import {  useEffect,useState } from "react";
import Typography from "@mui/material/Typography";
import './sidebar.css';  
import {LineStyle ,Timeline,TrendingUp} from "@material-ui/icons";
import {useNavigate , Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {Stack} from '@mui/material';
import Axios from "axios";

export default function Sidebar(props) {
  const { onSidebarButtonClick, sidebar } = { ...props };
    const navigate = useNavigate()
    const [originalrows, setoriginalrows] = useState([]);
  
    const product = () => {
        navigate('/productpage')
      }
      const menu = () => {
        navigate('/menutable')
      }

      useEffect(() => {
        Axios.get(`http://localhost:4000/post/getmenus`).then((response) => {
          console.log(response);
    
         
          var product_list = response.data.map((item, index) => ({
            id: item.ID,
            ...item,
          }));
          setoriginalrows(product_list);
         
        });
      }, []);

     
    return (
        <div className={sidebar ? "sidebar sidebar--open":"sidebar"}>
           < div className='sidebarWrapper'>
               <div className='sidebarmenu'>
                   {/* <h3 className='sidebartitle' >Dashboard</h3> */}
                   <div className='sidebarList'>
                   <Stack spacing={1} sx={{pt: 2}} direction={'row'} justifyContent={"center"} alignItems={"center"}>
               
                   <Typography variant="h4"  className="main-heading">
                     <ul className='textstyle'
                     
                     
                     
                     > {originalrows.map((val) =><li key={val.menuname}><Button onClick={onSidebarButtonClick} name={val.menuname}  >{val.menuname}</Button></li> )}</ul>
         
        </Typography>
    

       
       
             </Stack>

                
                        
                     </div> 
                 
               </div>
           </div>
          
        </div>
    )
}
