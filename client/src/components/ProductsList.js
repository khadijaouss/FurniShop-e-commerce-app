import React , {Component} from 'react';
import axios from "axios";
class ProductsList extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
          data: []
        };
      }
    
      componentDidMount() {
        this.fetchData();
      }
    
      fetchData = () => {
        axios
          .get("http://localhost:5000/api/items")
          .then((response) => {
            this.setState({ data: response.data });
          })
          .catch((error) => {
            console.log(error);
          });
      };
  
      render(props) {
        return (
          <>
            <div>
            <div className="row list">
             <div className="col-md-12">
              <br></br><br></br>
              <h1 className="text-center">All Products List</h1>
              <div className="d-flex flex-wrap">
              {this.state.data.map((item) => (
              <div className="card m-3" style={{width:'18rem'}} key={item._id}>
               <img src={item.image} alt={item.name} className="card-img-top"/>
               <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description.substring(0,80)}...</p>
                <p className="card-text">{item.price} DH</p>
                <button onClick={()=>this.props.handleItemSelect(item)} className="btn btn-secondary ">More details</button>
               </div>  
              </div>
                
              ))}</div>
             </div>
            </div></div>
            
          </>
        );
      }
}

export default ProductsList ;