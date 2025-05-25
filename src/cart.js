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
// -------------------------------------------------- //

// Din kod börjar här
// Du får en funktion att börja med
function getCartValue() {}


// TODO: gör en throw error för felmeddelanden
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

/* 
AK
A1. removeFromCart ska ta bort en produkt från kundvagnen, då returneras true
A2. ska returnera felmeddelande "Varan hittades inte" om itemId inte finns i kundvagnen
A3. ska returnera false om itemId inte är ett nummer
*/

function editCart(itemId, newValues) {}

/*
AK
A1. editCart ska uppdatera de värden som skickas in i newValues
A2. editcart ska inte uppdatera värden som inte finns i newValues
A3. Om itemId inte finns i kundvagnen ska editCart returnera false
A4. Om itemId finns i kundvagnen ska editCart returnera true
A5. Om newValues är tomt ska editCart returnera false
A6. Om newValues inte är ett objekt ska editCart returnera false
A7. Om newValues innehåller en amount som inte är ett heltal ska editCart returnera false
// A8. Om newValues innehåller en amount som är mindre än 1 ska editCart returnera false

*/


function clearCart() {
	cart = []
}

function getCartItemCount() {
	return cart.length
}

function addToCart(newItem) {
	if( !isProduct(newItem) ) {
		return false
	}

	const cartItem = { id: idCounter, amount: 1, item: newItem }
	idCounter++
	cart.push(cartItem)
}



export { getCartItemCount, addToCart, clearCart, removeFromCart, editCart, getCartValue, cart, idCounter }
