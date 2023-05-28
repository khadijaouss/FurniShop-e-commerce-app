import React, {Component} from 'react';
import axios from "axios";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import CloseButton from 'react-bootstrap/CloseButton';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      products: {}
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get("http://localhost:8000/api/commandes")
      .then((response) => {
        this.setState({ data: response.data }, () => {
          const productIds = this.state.data.map((commande) => commande.itemId);
          axios
            .get("http://localhost:5000/api/items", { params: { ids: productIds } })
            .then((response) => {
              const products = {};
              response.data.forEach((product) => {
                products[product._id] = product;
              });
              this.setState({ products });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  RemoveItemFromCart = (commandeId) => {
    axios
      .delete(`http://localhost:8000/api/commandes/${commandeId}`)
      .then((response) => {
        this.fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <>
        <div><br></br>
              <h3 className="text-center">Shopping cart</h3>
              <br></br>
              <div >
                {this.state.data.map((commande) => {
                  const product = this.state.products[commande.itemId];
                  return (
                <div>
                 <Card
                orientation="horizontal"
                variant="outlined"
                sx={{ width: 560, bgcolor: 'background.body',marginBottom:2 }}
                >
                <CardOverflow>
                    <AspectRatio ratio="1" sx={{ width: 90 }}>
                    <img
                        src={product && product.image}
                        srcSet={product && product.image}
                        alt=""
                    />
                    </AspectRatio>
                </CardOverflow>
                <CardContent sx={{ px: 2 }}>
                    <Typography fontWeight="md" textColor="success.plainColor" mb={0.5}>
                    {product && product.name}
                    </Typography>
                    <Typography level="body2">Quantity : {commande.quantity}</Typography>
                </CardContent>
                
                <h6>Total Price :<br></br> {commande.quantity * (product && product.price)} MAD </h6>
                <CloseButton onClick={() => this.RemoveItemFromCart(commande._id)} style={{top: "10px", right: "10px" }} />
                </Card>
                </div>

                  );
                })}
                <button style={{marginLeft:370,marginTop:30,marginBottom:30,background:'#E3B189',border:"1px solid black"}}className="btn btn-secondary ">Proceed to checkout</button>
              </div>
            </div>
      </>
    );
  }
}

export default ShoppingCart;

