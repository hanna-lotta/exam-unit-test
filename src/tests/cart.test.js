// importera här
import { addToCart, getCartItemCount, clearCart } from "../cart"


describe('Cart', () => {
	beforeEach(() => {
		// Denna kod körs före varje test. Det är för att rensa kundvagnen, så inte saker ligger kvar från föregående test.
		clearCart()
	})

	describe ( 'removeFromCart', () => {
		test('removeFromCart ska ta bort en produkt från kundvagnen', () => {
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			addToCart(input)

			const itemCountBefore = getCartItemCount()
			removeFromCart(input.id)
			const itemCountAfter = getCartItemCount()

			expect(itemCountAfter).toBe(itemCountBefore - 1)
		})

		test('removeFromCart returnerar true om produkten togs bort', () => {
			// Arrange
			const input = { id: 1001, name: 'Snorkel', price: 55 }
			const expected = true
			addToCart(input)
			// Act
			const actual = removeFromCart(input.id)
			// Assert
			expect(actual).toBe(expected)
		})
		test("removeFromCart returnerar felmeddelande 'Varan hittades inte' om itemId inte finns i kundvagnen", () => {
			//Arrange
			const input = '56'
			const expected = 'Varan hittades inte'

			//Act
			const actual = removeFromCart(input.id)
	
			// Assert
			expect(actual).toBe(expected)
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
