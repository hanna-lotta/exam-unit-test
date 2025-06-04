
import { addToCart, getCartItemCount, clearCart, removeFromCart, cart, getItem, getTotalCartValue, editCart } from "../cart"


describe('Cart', () => {
	beforeEach(() => {
		
		clearCart()
	})
	
	describe('clearCart', () => {
		test('clearCart ska tömma kundvagnen och returnera true', () => {
    	const input = { id: 1001, name: 'Snorkel', price: 55 }
   	 	addToCart(input)
    	expect(cart.length).toBe(1)
		const expected = true

    	const actual = clearCart()

    	expect(cart.length).toBe(0)
    	expect(actual).toBe(expected)
	})
	  test('clearCart ska returnera false om kundvagnen redan är tom', () => {
		cart.length = 0 
		const expected = false

        const actual = clearCart()

        expect(actual).toBe(expected)
    })
	})

	describe('editCart', () => {
		test('editCart ska uppdatera de värden på amount som skickas in i newValues', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			const itemId = cart[0].id 
			const newValues = { amount: 2 } 
			const expected = true
			
			const actual = editCart(itemId, newValues)
			expect(actual).toBe(expected) 
			expect(getItem(0).amount).toBe(2) 
		
			
		})
		test('editCart ska returnera false om amount saknas i newValues', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			const itemId = cart[0].id
        	const newValues = { price: 99 }
        	const expected = false
			
			const actual = editCart(itemId, newValues)
			expect(actual).toBe(expected)
			expect(getItem(0).amount).toBe(1)
			
		}
		)
		test('Om itemId inte finns i kundvagnen ska editCart returnera false', () => {
			const newValues = { amount: 2 }
			const itemId = 88 
			const expected = false
			
			const actual = editCart(itemId, newValues)
			expect(actual).toBe(expected)
		})
		test('Om newValues är tomt ska editCart returnera false', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			const itemId = cart[0].id 
			const newValues = {}
			const expected = false

			const actual = editCart(itemId, newValues)
			expect(actual).toBe(expected)
			expect(getItem(0).amount).toBe(1) 
		})
		test('Om newValues inte är ett objekt ska editCart returnera false', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			const itemId = cart[0].id 
			const newValues = 'hej'
			const expected = false

			const actual = editCart(itemId, newValues)
			expect(actual).toBe(expected)
			expect(getItem(0).amount).toBe(1)
		})
		test('Om newValues innehåller en amount som inte är ett heltal ska editCart returnera false', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			const itemId = cart[0].id 
			const newValues = {amount: 1.4}
			const expected = false

			const actual = editCart( itemId, newValues)
			expect(actual).toBe(expected)
			expect(getItem(0).amount).toBe(1)
		})
		test('Om newValues innehåller en amount som är mindre än 1 ska editCart returnera false', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			const itemId = cart[0].id 
			const newValues = {amount: -1}
			const expected = false

			const actual = editCart( itemId, newValues)
			expect(actual).toBe(expected)
			expect(getItem(0).amount).toBe(1)
		})

	})


	describe('getItem', () => {
		test('getItem ska returnera ett objekt som finns i kundvagnen', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			
			const actual = getItem(0) 
			expect(actual.item).toEqual(input)
		})  
		
		test('getItem ska returnera false om index är mindre än 0 eller större än antalet objekt i kundvagnen', () => {
			
			const expected = false
			const actual = getItem(-1) 
			expect(actual).toBe(expected)

			const expected2 = false
			const actual2 = getItem(1) // index plats 1 finns inte i kundvagnen
			expect(actual2).toBe(expected2)
		})
		
		test('getItem ska returnera false om index inte är ett nummer', () => {
			const input = 'hej'
			const expected = false
			const actual = getItem(input)
			expect(actual).toBe(expected)
			
		})
		
		test('getItem ska returnera false om objektet inte är ett giltigt cartItem', () => {
			const input = { id: 1001, name: 'Snorkel', price: 'femtio' } 
			addToCart(input)
			const expected = false
			
			const actual = getItem(0)
			expect(actual).toBe(expected)
			
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

		test('getTotalCartValue ska kasta fel om ett objekt i kundvagnen inte är ett giltigt cartItem', () => {
    		cart.push({ id: 'leksak', name: 'Snorkel', price: 55 }) 
    		
			expect(() => getTotalCartValue()).toThrow('Ogiltigt objekt i kundvagnen')
		})
	})

	describe('getCartItemCount', () => {
    	test('getCartItemCount ska returnera 0 om kundvagnen är tom', () => {
			clearCart()
			const expected = 0
			const actual = getCartItemCount()
			expect(actual).toBe(expected)
    	})

    	test('getCartItemCount ska returnera antalet objekt i kundvagnen', () => {
        addToCart({ id: 1001, name: 'Snorkel', price: 55 })
        addToCart({ id: 1002, name: 'Simfötter', price: 100 })
		const expected = 2
		const actual = getCartItemCount()
		expect(actual).toBe(expected)
    	})

    	test('getCartItemCount ska kasta fel om kundvagnen innehåller ogiltiga objekt', () => {
        addToCart({ id: 1001, name: 'Snorkel', price: 55 })
        cart.push({ test: 'toy' })
        expect(() => getCartItemCount()).toThrow('Kundvagnen innehåller ogiltiga objekt')
        cart.pop()
    	})
	})
	
	describe ('removeFromCart', () => {
		test('removeFromCart ska ta bort en produkt från kundvagnen', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)
			
			
			const itemCountBefore = getCartItemCount()
			removeFromCart(cart[0].id) 
			const itemCountAfter = getCartItemCount()
			
			expect(itemCountAfter).toBe(itemCountBefore - 1)
		})
		
		
		test("removeFromCart ska kasta felmeddelande 'Varan hittades inte' om itemId inte finns i kundvagnen", () => {
			
			const input = 56
			
			expect(() => removeFromCart(input)).toThrow('Varan hittades inte')
			
			
		})
		test("removeFromCart ska kasta felmeddelande 'Varan hittades inte' om itemId inte är ett nummer", () => {
			
			const input = 'hej'
			
			expect(() => removeFromCart(input)).toThrow('Varan hittades inte')
			
		})
	})
	
	describe('addToCart', () => {
		test('addToCart ska lägga till en ny produkt i kundvagnen', () => {
			const itemCountBefore = getCartItemCount()
			const input = { id: 1002, name: 'Vattenpistol', price: 40 }
			
			// addToCart returnerar inget - den påverkar kundvagnen
			// vi behöver använda getCartItemCount för att se om det har lagts till en ny produkt i kundvagnen
			addToCart(input)
			const itemCountAfter = getCartItemCount()
			
			expect(itemCountAfter).toBe(itemCountBefore + 1)
		})
		test('addToCart ska returnera false om produkten inte är giltig', () => {
    		const input = { test: 'toy' } 
			const expected = false

   			const actual = addToCart(input)

    		expect(actual).toBe(expected)
    		expect(getCartItemCount()).toBe(0)
		})
		test('addToCart ska öka amount om samma produkt läggs till igen', () => {
        	const input = { id: 1002, name: 'Vattenpistol', price: 40 }
        	addToCart(input)
        	addToCart(input)
        	expect(cart.length).toBe(1)
        	expect(cart[0].amount).toBe(2)
    	})
		test('addToCart ska öka amount på rätt produkt om flera olika produkter finns i kundvagnen', () => {
        	const input1 = { id: 1002, name: 'Vattenpistol', price: 40 }
        	const input2 = { id: 1001, name: 'Snorkel', price: 55 }
        	addToCart(input1)
        	addToCart(input2)
        	addToCart(input1)
        	expect(cart.length).toBe(2)
        	expect(cart[0].amount).toBe(2) // Vattenpistol
        	expect(cart[1].amount).toBe(1) // Snorkel
    })
	})
})
