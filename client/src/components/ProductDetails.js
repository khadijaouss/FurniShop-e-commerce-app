import React , {useState}from 'react';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import CloseButton from 'react-bootstrap/CloseButton';
import Box from '@mui/joy/Box';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import ShoppingCart from './ShoppingCart'

function ProductDetails(props) {
    const { item } = props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const handleCommande = () => {
      // Get the selected quantity from the select element
      const selectedQuantity = parseInt(document.querySelector('select').value);
    
      // Send a POST request to the server with the selected product's itemId and quantity
      axios.post('http://localhost:8000/api/commandes', {
        itemId: item._id,
        quantity: selectedQuantity
      })
      .then((response) => {
        console.log(response);
        setIsPopupOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
      setIsDialogOpen(false);
    };

    const handleShowCart = () => {
      setShowCart(true);
      setIsPopupOpen(false)}
    return (
      
      <div>
        <Box style={{marginLeft:1350,marginTop:20}}sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
         <Button onClick={handleShowCart} style={{background:"white",color:"black",border: "2px solid #E3B189"}}><FontAwesomeIcon style={{marginRight:10}} icon={faShoppingCart} />Shopping Cart</Button>
         <Button style={{background:"white",color:"black",border: "2px solid #E3B189"}}><FontAwesomeIcon style={{marginRight:10}} icon={faUser} />Account</Button>
       </Box>
        <div className="row" style={{marginRight:100,marginTop:20}}>
            <div className="col-md-6">
                <div className="card p-4 m-4" style={{border: '3px solid #E3B189',height: 700}}>
                    <h1>{item.name}</h1>
                    <img src={item.image} alt="..." style={{maxWidth: '100%', maxHeight: '90%'}}/> 
                </div>
            </div>
            <div className="col-md-6" >
               <div className="m-2">
                <br></br>
                <h5>{item.description}</h5>
                <hr/><br></br>
                <h2>Price : <strong>{item.price}</strong> MAD</h2>
                <hr/><br></br>
               <h3>Select quantity</h3> <br></br>
               <select style={{width:240,height:40}}>{[...Array(item.quantity).keys()].map((x,i)=>{
                return <option value={i+1}>{i+1}</option>})}
               </select>
               
                </div>
               <div style={{marginTop:50}}>
                <Button onClick={() => setIsDialogOpen(true)} style={{width:250,height:50,background:"#E3B189",color:"black"}}startDecorator={<Add />}>Add to cart</Button>
                </div> 
            </div>
        </div>
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <CloseButton onClick={() => setIsDialogOpen(false)} style={{ position: "absolute", top: "10px", right: "10px" }} />
      <div style={{padding: '20px'}}>
      <CssVarsProvider>
      <main>
        <Sheet
          sx={{
            width: 400,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </FormControl>
          <Button onClick={handleCommande} style={{background:"#E3B189",color:"black"}} sx={{ mt: 1 /* margin top */ }}>Log in</Button>
          <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
    </div>
    </Dialog>
    <Dialog  open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
    <CloseButton onClick={() => setIsPopupOpen(false)} style={{ position: "absolute", top: "10px", right: "10px" }} />
    <h4 style={{margin:20,marginTop:30}}>A new item has been added to your Shopping Cart.</h4>
    <Box  style={{marginBottom:20,marginLeft:80}}sx={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
      
      <Button onClick={handleShowCart} style={{background:"#E3B189"}}>View Shopping Cart</Button>
      <Button onClick={() => setIsPopupOpen(false)} style={{background:"white",color:"#E3B189",border: "4px solid #E3B189"}}>Continue Shopping</Button>
    </Box>
    
    </Dialog >
    <Dialog open={showCart} onClose={() => setShowCart(false)}>
    <CloseButton onClick={() => setShowCart(false)} style={{ position: "absolute", top: "10px", right: "10px" }} />
    {showCart && (
    <ShoppingCart items={props.items} />
)}</Dialog>
      </div>
    );
  }
export default ProductDetails;