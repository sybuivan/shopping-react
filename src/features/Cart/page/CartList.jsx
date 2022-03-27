import React from 'react'
import PropTypes from 'prop-types'
import CartItem from '../components/CartItem'

function CartList({cartList}) {

   console.log('cartList', cartList)

   if(cartList.length > 0) {
      return (
         <div>
            {cartList.map(cart => (
               <CartItem cart={cart} key={cart.id}/>
            ))}
         </div>
      )
   } else {
      return (
        <div>
            Khong co san pham trong gio hang
        </div>
      )
   }
}

CartList.propTypes = {}

export default CartList
