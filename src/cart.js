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

/* AK 
A1. getItem ska returnera ett objekt som finns i kundvagnen
A2. getItem ska returnera false om index är mindre än 0 eller större än antalet objekt i kundvagnen
A3. getItem ska returnera false om index inte är ett nummer
A4. getItem ska returnera false om objektet inte är ett giltigt cartItem
*/

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
/* AK 
A1. getTotalCartValue ska returnera 0 om kundvagnen är tom
A2. getTotalCartValue ska returnera summan av alla produkter i kundvagnen
A3. getTotalCartValue ska kasta ett felmeddelande om ett eller flera objekt i kundvagnen inte är giltiga cartItems

*/



/* Kollar om itemId är ett nummer
Om inte, kastas ett fel.

Sparar längden på kundvagnen före borttagning
const originalLength = cart.length

Tar bort item ur kundvagnen
cart = cart.filter(item => item.id !== itemId)
Denna rad skapar en ny array där alla objekt med item.id !== itemId finns kvar.
Det är här själva borttagningen sker!
Om ett objekt hade det id:t, tas det bort.

Kollar om något togs bort
Om längden på kundvagnen är oförändrad (cart.length === originalLength), betyder det att inget objekt hade det id:t – då kastas ett fel.

Returnerar true
Om ett objekt togs bort, returneras true för att signalera att borttagningen lyckades. */
function removeFromCart(itemId) {
	if ( typeof itemId !== 'number') {
		throw new Error ('Varan hittades inte')
	}
	const originalLength = cart.length
    cart = cart.filter(item => item.id !== itemId)
    if (cart.length === originalLength) {
        throw new Error ('Varan hittades inte') 
		/* Om någon försöker ta bort en produkt som inte finns, är det ofta ett tecken på att något gått fel i flödet.
		Det gör det tydligt för den som använder funktionen att detta är ett allvarligt fel som måste hanteras. */
    }
    return true
}

/* 
AK
A1. removeFromCart ska ta bort en produkt från kundvagnen
A2. ska kasta felmeddelande "Varan hittades inte" om itemId inte finns i kundvagnen
A3. ska  kasta 'Varan hittades inte' om itemId inte är ett nummer
*/


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


/*
AK
A1. editCart ska uppdatera de värden som skickas in i newValues
A2. editcart ska inte uppdatera värden som inte finns i newValues
A3. Om itemId inte finns i kundvagnen ska editCart returnera false
A4. Om newValues är tomt ska editCart returnera false
A5. Om newValues inte är ett objekt ska editCart returnera false
A6. Om newValues innehåller en amount som inte är ett heltal ska editCart returnera false
A7. Om newValues innehåller en amount som är mindre än 1 ska editCart returnera false

*/


function clearCart() {
	if (cart.length === 0) {
		return false
	}
	// Om kundvagnen är tom, returnera false
	if (!Array.isArray(cart)) {
		throw new Error('Kundvagnen är inte en array')
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
	if (cart.length < 0) {
		throw new Error('Kundvagnen innehåller ett negativt antal objekt')
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
