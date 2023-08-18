import React, { Component } from 'react';
import axios from 'axios';
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
      products: [],
      totalAmount: 0
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get('http://localhost:8000/api/commandes')
      .then((response) => {
        this.setState({ data: response.data }, () => {
          const productIds = this.state.data.map((commande) => commande.itemId);
          axios
            .get('http://localhost:5000/api/items', { params: { ids: productIds } })
            .then((response) => {
              this.setState({ products: response.data }, () => {
                const totalAmount = this.calculateTotalAmount();
                this.setState({ totalAmount });
              });
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
  
  calculateTotalAmount = () => {
    const { data, products } = this.state;
    let total = 0;
    const unpaidCommands = data.filter((commande) => !commande.commandePayee);
    unpaidCommands.forEach((commande) => {
      const product = products.find((p) => p._id === commande.itemId);
      if (product) {
        total += commande.quantity * product.price;
      }
    });
    return total;
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

  handleCheckout = () => {
    const { data, totalAmount } = this.state;
    // Make the payment and update commandePayee

    const unpaidCommands = data.filter((commande) => !commande.commandePayee);
    axios
      .post('http://localhost:8080/api/paiements', {
        commandes: unpaidCommands.map((commande) => commande._id),
        montant: totalAmount,
        numeroCarte: 2113448900709
      })
      .then((response) => {
        // Show the success popup
        alert('your payment was successful');
         // Update the commandePayee status for each paid command
      const updatePromises = this.state.data.map((commande) => {
        if (!commande.commandePayee) {
          return axios.put(`http://localhost:8000/api/commandes/${commande._id}`, {
            commandePayee: true
          });
        } else {
          return Promise.resolve(); // Resolve immediately if command already paid
        }
      });

      // Wait for all update promises to complete
      Promise.all(updatePromises)
        .then(() => {
          // Fetch the updated data
          this.fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
  };

  render() {
    const unpaidCommands = this.state.data.filter((commande) => !commande.commandePayee);
    const { totalAmount } = this.state;
    return (
      <>
        <div>
          <br />
          <h3 className="text-center">Shopping cart</h3>
          <br />
          <div>
            {unpaidCommands.map((commande) => {
              const product = this.state.products.find((p) => p._id === commande.itemId);
              return (
                <div key={commande._id}>
                  <Card
                    orientation="horizontal"
                    variant="outlined"
                    sx={{ width: 560, bgcolor: 'background.body', marginBottom: 2 }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio="1" sx={{ width: 90 }}>
                        <img src={product && product.image} srcSet={product && product.image} alt="" />
                      </AspectRatio>
                    </CardOverflow>
                    <CardContent sx={{ px: 2 }}>
                      <Typography fontWeight="md" textColor="success.plainColor" mb={0.5}>
                        {product && product.name}
                      </Typography>
                      <Typography level="body2">Quantity: {commande.quantity}</Typography>
                    </CardContent>

                    <h6>Price: <br /> {commande.quantity * (product && product.price)} MAD</h6>
                    <CloseButton onClick={() => this.RemoveItemFromCart(commande._id)} style={{ top: '10px', right: '10px' }} />
                  </Card>
                </div>
              );
            })}
            <div>
            <h5 style={{ marginLeft: 150, marginTop: 30, marginBottom: 30,}}>Total Amount: {totalAmount} MAD</h5>
            <button
              style={{ marginLeft: 370, marginTop: 30, marginBottom: 30, background: '#E3B189', border: '1px solid black' }}
              className="btn btn-secondary "
              onClick={this.handleCheckout}
            >
              Proceed to checkout
            </button></div>
          </div>
        </div>
      </>
    );
  }
}

export default ShoppingCart;
