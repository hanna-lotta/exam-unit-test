/*
Din uppgift:
- skriv testfall för alla funktionerna nedan i cart.test.js (RED)
- skriv kod här för att implementera funktionerna (GREEN)

Tips:
- börja med att identifiera VAD som ska testas.
- om du testar t.ex. removeFromCart får du använda addToCart i början av testet. Den kommer nämligen ha sina egna tester

*/
// function getCartItemCount()
// function getItem(index)
// function getTotalCartValue()
// function addToCart(newItem)
// function removeFromCart(itemId)
// function editCart(itemId, newValues)
// function clearCart()
// -------------------------------------------------- //

import { isCartItem, isProduct } from "./validation.js"

let cart = []
let idCounter = 2002

function getItem(index) {
    if (typeof index !== 'number') {
        return false
    } else if (index < 0 || index >= cart.length) {
        return false
    } else if (!isCartItem(cart[index])) {
        return false
    }
    return cart[index]
}


function getTotalCartValue() {
	if (cart.length === 0) {
		return 0
	}
	return cart.reduce((total, item) => {
		if (!isCartItem(item)) {
			throw new Error('Ogiltigt objekt i kundvagnen')
		}
		return total + (item.item.price * item.amount)
	}, 0)
}


function removeFromCart(itemId) {
	if ( typeof itemId !== 'number') {
		throw new Error ('Varan hittades inte')
	}
	const originalLength = cart.length
    cart = cart.filter(item => item.id !== itemId)
    if (cart.length === originalLength) {
        throw new Error ('Varan hittades inte') 
    }
    return true
}


function editCart(itemId, newValues) {
    if (!newValues || typeof newValues !== "object" || Array.isArray(newValues) || !("amount" in newValues) || Object.keys(newValues).length === 0) {
        return false
    }
    const cartItem = cart.find(item => item.id === itemId)
    if (!cartItem) {
        return false
    }
    if ("amount" in newValues) {
        if (
            typeof newValues.amount !== "number" ||
            !Number.isInteger(newValues.amount) ||
            newValues.amount < 1
        ) {
            return false
        }
        cartItem.amount = newValues.amount
    }
	
    return true
}


function clearCart() {
	if (cart.length === 0) {
		return false
	}
	cart = []
	return true
} 

function getCartItemCount() {
	if (cart.length === 0) {
		return 0
	}
	if (!cart.every(isCartItem)) {
		throw new Error('Kundvagnen innehåller ogiltiga objekt')
	}
	return cart.length
}

function addToCart(newItem) {
	if( !isProduct(newItem) ) {
		return false
	}

	const newId = idCounter
	const index = cart.findIndex(ci => ci.item.id === newItem.id)
	if( index === -1 ) {
		const cartItem = { id: idCounter, amount: 1, item: newItem }
		idCounter++
		cart.push(cartItem)
	} else {
		cart[index].amount++
	}
}



export { getCartItemCount, addToCart, clearCart, removeFromCart, editCart, getTotalCartValue, getItem, cart, idCounter }
