// importera här
import { addToCart, getCartItemCount, clearCart, removeFromCart, cart, idCounter } from "../cart"


describe('Cart', () => {
	beforeEach(() => {
		// Denna kod körs före varje test. Det är för att rensa kundvagnen, så inte saker ligger kvar från föregående test.
		clearCart()
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
