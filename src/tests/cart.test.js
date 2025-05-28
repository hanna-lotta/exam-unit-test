// importera här
import { addToCart, getCartItemCount, clearCart, removeFromCart, cart, getItem, getTotalCartValue, idCounter } from "../cart"


describe('Cart', () => {
	beforeEach(() => {
		// Denna kod körs före varje test. Det är för att rensa kundvagnen, så inte saker ligger kvar från föregående test.
		clearCart()
	})
	
	describe('editCart', () => {
		test('editCart ska uppdatera de värden som skickas in i newValues', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			const expected = true
			
			const newValues = { name: 'Dykutrustning', price: 60 }
			const itemId = cart[0].id // hämtar id:t från index plats 0 i cart
			
			const actual = editCart(itemId, newValues)
			expect(actual).toBe(expected) // testar om editCart returnerar true
			
			const updatedItem = getItem(0).item // hämtar det uppdaterade objektet
			expect(updatedItem.name).toBe(newValues.name)
			expect(updatedItem.price).toBe(newValues.price) //hämtar det uppdaterade objektet och kollar dess värden.

		})
		test('editcart ska inte uppdatera värden som inte finns i newValues', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			const expected = true
			
			const newValues = { name: 'Dykutrustning' } // priset saknas
			const itemId = cart[0].id // hämtar id:t från index plats 0 i cart
			
			const actual = editCart(itemId, newValues)
			expect(actual).toBe(expected)
			
			const updatedItem = getItem(0).item // hämtar det uppdaterade objektet
			expect(updatedItem.name).toBe(newValues.name)
			expect(updatedItem.price).toBe(input.price) // priset ska vara oförändrat
		}
		)
		test('Om itemId inte finns i kundvagnen ska editCart returnera false', () => {
			const newValues = { name: 'Dykutrustning', price: 60 }
			const itemId = 9999 
			const expected = false
			
			const actual = editCart(itemId, newValues)
			expect(actual).toBe(expected)
		})
		test('Om newValues är tomt ska editCart returnera false', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			const itemId = cart[0].id // hämtar id:t från index plats 0 i cart
			
			const expected = false
			const actual = editCart(itemId, {})
			expect(actual).toBe(expected)
		})
		test('Om newValues inte är ett objekt ska editCart returnera false', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			const itemId = cart[0].id // hämtar id:t från index plats 0 i cart
			
			const expected = false
			const actual = editCart(itemId, 'hej')
			expect(actual).toBe(expected)
		})
		test('Om newValues innehåller en amount som inte är ett heltal ska editCart returnera false', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			const itemId = cart[0].id // hämtar id:t från index plats 0 i cart
			const expected = false

			const actual = editCart( itemId, {amount: 1.4})
			expect(actual).toBe(expected)

		})
		test('Om newValues innehåller en amount som är mindre än 1 ska editCart returnera false', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			const itemId = cart[0].id // hämtar id:t från index plats 0 i cart
			const expected = false

			const actual = editCart( itemId, {amount: -1})
			expect(actual).toBe(expected)
		})

	})




	/*toBe jämför om det är exakt samma objekt i minnet (referensjämförelse).
	toEqual jämför om objekten har samma innehåll (värdejämförelse).
	När du använder addToCart(input) skapas ett nytt objekt i kundvagnen, så även om innehållet är samma är det inte samma objekt i minnet. Därför kommer toBe(input) oftast att misslyckas, medan toEqual(input) fungerar som du vill. */

	describe('getItem', () => {
		test('getItem ska returnera ett objekt som finns i kundvagnen', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			
			const actual = getItem(0) 
			expect(actual.item).toEqual(input)
		})  /* addToCart-funktionen lägger till ett nytt objekt i kundvagnen med en annan struktur än det du skickar in som input. Du ska jämföra med actual.item istället för hela objektet*/
		
		test('getItem ska returnera false om index är mindre än 0 eller större än antalet objekt i kundvagnen', () => {
			/*
			const expected = false
			const actual = getItem(-1) 
			expect(actual).toBe(expected)

			const expected2 = false
			const actual2 = getItem(1) // finns bara ett objekt i kundvagnen
			expect(actual2).toBe(expected2)
			*/

			expect(getItem(-1)).toBe(false)
			expect(getItem(1)).toBe(false) // finns bara ett objekt i kundvagnen
		})
		
		test('getItem ska returnera false om index inte är ett nummer', () => {
			const input = 'hej'
			const expected = false
			const actual = getItem(input)
			expect(actual).toBe(expected)
			// eller
			//expect(getItem('hej')).toBe(false)
		})
		
		test('getItem ska returnera false om objektet inte är ett giltigt cartItem', () => {
			const input = { id: 1001, name: 'Snorkel', price: 'femtio' } 
			addToCart(input)
			const expected = false
			const actual = getItem(0)
			expect(actual).toBe(expected)
			
			//expect(getItem(0)).toBe(false)
		})
	})
	
	describe('getTotalCartValue', () => {
		test('getTotalCartValue ska returnera 0 om kundvagnen är tom', () => {
			const expected = 0
			const actual = getTotalCartValue()
			expect(actual).toBe(expected)
		})
		
		test('getTotalCartValue ska returnera summan av alla produkter i kundvagnen', () => {
			const input1 = { id: 1001, name: 'Snorkel', price: 55 }
			const input2 = { id: 1002, name: 'Vattenpistol', price: 40 }
			addToCart(input1)
			addToCart(input2)
			addToCart(input2) // testar amount

			const expected = input1.price + (input2.price * 2)

			const actual = getTotalCartValue()

			expect(actual).toBe(expected)
		})

		test('getTotalCartValue kastar fel om ett objekt i kundvagnen inte är ett giltigt cartItem', () => {
    		cart.push({ id: 'leksak', name: 'Snorkel', price: 55 }) 
    		
			expect(() => getTotalCartValue()).toThrow('Ogiltigt objekt i kundvagnen')
		})
	})


	/*
	addToCart-funktion returnerar inget värde alls (den har ingen return-sats), utan den lägger bara till ett nytt objekt i kundvagnen (cart). Det objektet som läggs till i kundvagnen får dessutom ett nytt id (från idCounter), inte det id du skickar in i input.
	*/
	
	describe ( 'removeFromCart', () => {
		test('removeFromCart ska ta bort en produkt från kundvagnen', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			
			
			const itemCountBefore = getCartItemCount()
			removeFromCart(cart[0].id) // hämtar id:t från index plats 0 i cart
			const itemCountAfter = getCartItemCount()
			
			expect(itemCountAfter).toBe(itemCountBefore - 1)
		})
		
		
		test("removeFromCart kastar felmeddelande 'Varan hittades inte' om itemId inte finns i kundvagnen", () => {
			//Arrange
			const input = '56'
			
			expect(() => removeFromCart(input)).toThrow('Varan hittades inte')
			
			
		})
		test("removeFromCart kastar felmeddelande 'Varan hittades inte' om itemId inte är ett nummer", () => {
			//Arrange
			const input = 'hej'
			
			expect(() => removeFromCart(input)).toThrow('Varan hittades inte')
			
		})
	})
	
	// -------------------------------------------------- //
	// Skriv dina testfall här
	
	// Du får ett test att börja med
	describe('addToCArt', () => {
		test('addToCart lägger till en ny produkt i kundvagnen', () => {
			const itemCountBefore = getCartItemCount()
			const input = { id: 1002, name: 'Vattenpistol', price: 40 }
			
			// addToCart returnerar inget - den påverkar kundvagnen
			// vi behöver använda getCartItemCount för att se om det har lagts till en ny produkt i kundvagnen
			addToCart(input)
			const itemCountAfter = getCartItemCount()
			
			expect(itemCountAfter).toBe(itemCountBefore + 1)
		})
	})
	
	// -------------------------------------------------- //
})
