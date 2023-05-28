import React , {Component} from 'react';
import banner from '../assets/images/banner.png';


class AppBanner extends Component {

    render(){
        return( <section className="home-wrapper-l py-5">
            <div className="container-xxl">
                <div className="row">
                <div className="col-6">
                       <div className="slogan position-relative flex-wrap">
                        <h1><span className="highlight">Elevate </span>Your Space with FurniShop</h1>
                        <p>At FurniShop, we believe that your home should be a reflection of your personality and lifestyle, which is why we offer furniture pieces that are not only functional but also aesthetically pleasing.</p>
                        <button className="shop_btn">Shop now</button>
                       </div>
                    </div>
                    <div className="col-6">
                       <div className="position-relative">
                        <img className="banner" src={banner} alt="banner"/>
                       </div>
                    </div>
                    
                </div>
            </div>
        
    </section>)
}}

export default AppBanner;