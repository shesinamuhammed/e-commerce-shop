import Axios from 'axios';
import React, {useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import './detailpage.css';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Stripe(props) {
    const {data = []}  = {...props}
toast.configure()
    async function handleToken(token, addresses) {
        const response = await Axios.post('http://localhost:4000/checkout', {token: token, data: data[0]})
        console.log(response.status)

        if (response.status === 200) {
           toast("Success payment is completed",{type:'success'}) 
        }else{
            toast("Failure payment is not completed",{type:'error'}) 
        }
 
    }

    return (
        <div className='stripe'>
            <StripeCheckout 
                stripeKey='pk_test_51KYmCzSIF1bhHQASL2qJjw9PYa2jmmAIOP82CNipKfzFzq9MSqDtDRStC7ROIXPUHyO0tnSuhGqM9AkkQ0iUStmV00RrkjZV1O'
                token={handleToken}
                amount={data[0]?.price * 100}
                name={data[0]?.productname}
                billingAddress
                shippingAddress
            />
        </div>
    )
}