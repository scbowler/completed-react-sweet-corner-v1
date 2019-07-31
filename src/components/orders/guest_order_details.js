import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGuestOrderDetails } from '../../actions';
import { queryToObject } from '../../helpers';
import Money from '../general/money';
import './orders.scss';

class GuestOrderDetails extends Component {
    componentDidMount(){
        const { getGuestOrderDetails, location, match } = this.props;
        const orderId = match.params.order_id;
        const query = queryToObject(location.search);

        getGuestOrderDetails(orderId, query.email);
    }

    renderItemRow({each, id, product, quantity, total}){
        return (
            <tr key={id}>
                <td>
                    <img src={product.thumbnail.url} alt={product.thumbnail.altText}/>
                </td>
                <td className="product-name">{product.name}</td>
                <td><Money>{each}</Money></td>
                <td>{quantity}</td>
                <td><Money>{total}</Money></td>
            </tr>
        );
    }

    renderOrderDetails(){
        const { order } = this.props;

        console.log('Order:', order);

        if(!order){
            return <h2 className="center">Loading Order Information...</h2>
        }

        return (
            <div className="details-container">
                <div className="center">
                    <h1>Status: <span className="yellow-text">{order.status}</span></h1>
                    <h2>Order #: <span className="red-text">{order.id}</span></h2>
                </div>
                
                <p><strong>Order Placed:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Order Total Items:</strong> {order.itemCount}</p>
                <p><strong>Order Total Cost:</strong> <Money>{order.total}</Money></p>

                <h2>Order Items:</h2>

                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Product</th>
                            <th>Each</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map(this.renderItemRow)}
                    </tbody>
                </table>
            </div>
        );
    }

    render(){

        return (
            <div className="order-details">
                <h1 className="center">Guest Order Details</h1>
                {this.renderOrderDetails()}
            </div>
        );
    }
}

function mapStateToProps({orders}){
    return {
        order: orders.details
    }
}

export default connect(mapStateToProps, { getGuestOrderDetails })(GuestOrderDetails);
