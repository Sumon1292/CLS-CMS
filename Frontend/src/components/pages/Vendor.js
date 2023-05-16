import React, { useState, useContext} from "react";
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import './Vendor.css'
import { UserContext } from "../../App";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


// design
import {
	TextField,
	Button,
} from "@mui/material";



const Vendor = () => {
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();
	const { useremail, setUseremail } = useContext(UserContext);

	// form states
    const [Address_f, setAddress_f] = useState("");
	const [Street_f, setStreet_f] = useState("");
    const [Apt_f, setApt_f] = useState("");
    const [City_f, setCity_f] = useState("");
    const [State_f, setState_f] = useState("");
    const [Zip_f, setZip_f] = useState("");
    const [Address_t, setAddress_t] = useState("");
    const [Street_t, setStreet_t] = useState("");
    const [Apt_t, setApt_t] = useState("");
    const [City_t, setCity_t] = useState("");
    const [State_t, setState_t] = useState("");
    const [Zip_t, setZip_t] = useState("");
    const [Size, setSize] = useState("");
    const [Weight, setWeight] = useState("");
    const [Fedex, setFedex] = useState("");
    const [Ups, setUps] = useState("");
    const [Usps, setUsps] = useState("");
    const [Carrier, setCarrier] = useState("");
	const [CarrierSug, setCarrierSug] = useState("");
    const [Cost, setCost] = useState("");
    const [Userselection, setUserselection] = useState("You haven't selected any carrier yet");
	const [TrackingID, setTrackingID] = useState("");
	const [Paynow, setPaynow] = useState("");
	// Paypal
	const [show, setShow] = useState(false);
	const [success, setSuccess] = useState(false);
	const [ErrorMessage, setErrorMessage] = useState("");
	const [orderID, setOrderID] = useState(false);
	

    
	// 'You have slected '&{Carrier}&', which costs '&{Cost}
    //Functions
    function make_visible(div)
        {
            var divbox = document.getElementById(div);
            divbox.style.visibility = 'visible';

        }

	const handleQuotations = async (e) => {
    // make_visible('Quotations');
	var distance = Math.abs(Zip_f-Zip_t)/1000;
	var Fed_cost = parseInt(distance*(distance%9));
	var Ups_cost = parseInt(distance*(distance%11));
	var Usps_cost = parseInt(distance*(distance%13));
	if(Fed_cost == Math.min(Fed_cost,Ups_cost,Usps_cost)){
		var carrie_coice = 'FedEx';
		var Fed_cost1 = Fed_cost;
		var Ups_cost1 = parseInt(Math.min(Fed_cost*1.27,Ups_cost));
		var Usps_cost1 = parseInt(Math.min(Fed_cost*1.5,Usps_cost));
	} else if(Ups_cost == Math.min(Fed_cost,Ups_cost,Usps_cost)){
		var carrie_coice = 'INDIA POST';
		var Fed_cost1 = parseInt(Math.min(Ups_cost*1.5,Fed_cost));
		var Ups_cost1 = Ups_cost;
		var Usps_cost1 = parseInt(Math.min(Ups_cost*1.27,Usps_cost));
	} else{
		var carrie_coice = 'DHL';
		var Fed_cost1 = parseInt(Math.min(Usps_cost*1.27,Fed_cost));
		var Ups_cost1 = parseInt(Math.min(Usps_cost*1.5,Ups_cost));
		var Usps_cost1 = Usps_cost;
	}
	setUserselection("You haven't selected any carrier yet");
	setPaynow("");
	setCarrierSug(carrie_coice);
    setFedex(Fed_cost1);
    setUps(Ups_cost1);
    setUsps(Usps_cost1);
    setAddress_f(Street_f.concat(", ",Apt_f,", ",City_f,", ",State_f,", ",Zip_f));
    setAddress_t(Street_t.concat(", ",Apt_t,", ",City_t,", ",State_t,", ",Zip_t));
	};
  
    
    const handleFedex = async (e) => {
		make_visible('Paynow');
        setCarrier("FedEx");
        setCost(Fedex);
		setPaynow(1);
        setUserselection("You have selected".concat(" ",'FedEx'," "," which costs INR ",Fedex));
        };

    const handleUps = async (e) => {
		make_visible('Paynow');
        setCarrier("DHL");
        setCost(Ups);
		setPaynow(1);
        setUserselection("You have selected".concat(" ",'INDIA POST'," "," which costs INR ",Ups));
        };
    const handleUsps = async (e) => {
		make_visible('Paynow');
        setCarrier("INDIA POST");
        setCost(Usps);
		setPaynow(1);
        setUserselection("You have selected".concat(" ",'DHL'," "," which costs INR ",Usps));
        
        };

    const handlePayment = async (e) => {
		make_visible('Paypal');
		setShow(true);
        var tId = Math.random();
        tId = tId * 100000000;
        tId = parseInt(tId);
		setTrackingID(tId);
		
        };

	// Paypal

		const onApprove = (data, actions) => {return actions.order.capture().then(function (details) {
		setSuccess(true);
		navigate('/PlaceOrders')
		toast.success("Payment Successful");
		});
		};

	return (
        <>
        <div className="wrapper">
        <div >
		<div>
			<div>
				<h2 className="vendor-heading">From Address</h2>
			</div>
			<div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="Street"
					value={Street_f}
					onChange={(e) => setStreet_f(e.target.value)}
				/>
			</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="Apt No."
					value={Apt_f}
					onChange={(e) => setApt_f(e.target.value)}
				/>
			</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="City"
					value={City_f}
					onChange={(e) => setCity_f(e.target.value)}
				/>
			</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="State"
					value={State_f}
					onChange={(e) => setState_f(e.target.value)}
				/>
			</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					label="Zip Code"
					value={Zip_f}
					onChange={(e) => setZip_f(e.target.value)}
				/>
				
			</div>
            </div>

            </div>

            <div className="two">
		    <div>
            <div>
				<h2 className="vendor-heading"> To Address</h2>
			</div>
			<div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="Street"
					value={Street_t}
					onChange={(e) => setStreet_t(e.target.value)}
				/>
			</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="Apt No."
					value={Apt_t}
					onChange={(e) => setApt_t(e.target.value)}
				/>
			</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="City"
					value={City_t}
					onChange={(e) => setCity_t(e.target.value)}
				/>
			</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="State"
					value={State_t}
					onChange={(e) => setState_t(e.target.value)}
				/>
			</div>
            <div className="form-group">
				<TextField
					sx={{mb:1}}
					size="small"
					variant="standard"
					className="form-control"
					label="Zip Code"
					value={Zip_t}
					onChange={(e) => setZip_t(e.target.value)}
				/>
			</div><br/>
			<div>
				<Button 
					variant="contained"
					onClick={handleQuotations}
				>
					Submit
				</Button>
			</div>

            </div>
            </div>
            <div id= 'Quotations'  className="four">
		    <div>
            <div>
				<h2 className="vendor-heading"> Select a Vendor</h2>
			</div>
            <div className="wrapper2">
            <div className="one1">
				<img src="images/fedex.png" class="vendor-icon" alt="" />
				<label htmlFor="" className="vendor-names">
                    FedEx
				</label>
            </div>
            <div className="two1">
            <div>
				<label htmlFor="" className="h8">
                    {Fedex}
				</label>
			</div>
            </div>
            <div className="three1">
            <div>
				<Button
					variant="contained"
					disabled={false}
					onClick={handleFedex}
				>
					select
				</Button>
			</div>
            </div>
            </div>


            <div className="wrapper2">
            <div className="one1">
				<img src="images/dhl.png" class="vendor-icon" alt="" />
				<label htmlFor="" className="vendor-names">
                    DHL 
				</label>
            </div>
            <div className="two1">
            <div>
				<label htmlFor="" className="h8">
                    {Usps}
				</label>
			</div>
            </div>
            <div className="three1">
            <div >
				<Button
					variant="contained"
					disabled={false}
					onClick={handleUsps}
				>
					select
				</Button>
			</div>
            </div>
            </div>
            <div className="wrapper2">
            <div className="one1">
				<img src="images/indiapost.png" class="vendor-icon" alt="" />
				<label htmlFor="" className="vendor-names">
                    INDIA POST 
				</label>
            </div>
            <div className="two1">
            <div>
				<label htmlFor="" className="h8">
                    {Ups}
				</label>
			</div>
            </div>
            <div className="three1">
            <div >
				<Button
					variant="contained"
					disabled={false}
					onClick={handleUps}
				>
					select
				</Button>
			</div>
            </div>
            </div>
            <div className="vendor-suggesstion">
				<label htmlFor="" className="h8">
                    We suggest to go with {CarrierSug}
				</label>
				<br></br>
				<label htmlFor="" className="h8">
                    {Userselection}
				</label>
			</div>

            <div id='Paynow' style={{visibility: 'hidden'}}>
				<Button
					variant="contained"
					disabled={!Paynow}
					onClick={handlePayment}
				>
					Pay now!
				</Button>
			</div>

			<div id='Paypal' style={{visibility: 'hidden'}}>
			<PayPalScriptProvider
				options={{
				"client-id":"AaI3Xz11Der8s28FmpmG5mlKhh1Lb969MGwda6aGeY7TF3NGKkcj02ke3D4UEgnbWv0xod98vIlnfSV0",
				}}
				>
				<div>
				{show ? (
				<PayPalButtons
				style={{ 
					layout: "vertical",
					tagline: "false",
				}}
				onApprove={onApprove}
				/>
				) : null}
				</div>
				</PayPalScriptProvider>
			</div>

            </div>
            </div>
        </div>
		</>
    )
};

export default Vendor;