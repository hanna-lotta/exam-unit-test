import { isCartItem, isProduct } from "../validation.js"
// Examples of a valid product and a valid cart item. You may use these when testing below.
const exampleProduct = {
	id: 1001,
	name: 'Badanka',
	price: 500
}

const exampleCartObject = {
	id: 2001,
	amount: 1,
	item: exampleProduct
}

// Group tests using "describe"
describe('Validation isCartItem', () => {
	it ('returns true for a valid cart object', () => {
		// Arrange
		const exampleCartObject = {
			id: 2001,
			amount: 1,
			item: exampleProduct
		}
		const expected = true
		// Act
		const actual = isCartItem(exampleCartObject)
		// Assert
		expect(actual).toBe(expected)
	}
	)
	it ('returns false for invalid cart objects', () => {
		// Arrange
		const exampleCartObject = {
			id: 2001,
			amount: 'hej', 
			item: exampleProduct
		}
		const expected = false
		// Act
		const actual = isCartItem(exampleCartObject)
		// Assert
		expect(actual).toBe(expected)
	}
	)
})

	describe( 'Validation isProduct', () => {
		it ( 'returns true for a valid product', () => {
			//Arrange
			const exampleProduct = {
				id: 1001,
				name: 'Badanka',
				price: 500
			}
			const expected = true
			//Act
			const actual = isProduct(exampleProduct)
			// Assert
			expect(actual).toBe(expected)
		}
		)
		it ( 'returns false for invalid cart objects', () => {
			//Arrange
			const exampleProduct = {
				id: 1001,
				name: 'Badanka',
				price: 'femtio'
			}
			const expected = false
			//Act
			const actual = isProduct(exampleProduct)
			// Assert
			expect(actual).toBe(expected)
		}
		)
	})

	


	// ---------------------------------------------
	// Följande testfall ska du implementera. Det är tillåtet att använda Joi. Gör i så fall ett schema för varje sorts objekt du vill kunna validera. Du får även ändra texten och du t.ex. vill skriva på svenska i stället för engelska.
	// (Ta bort dessa kommentarer när du är klar)

	// 1. it returns true for a valid cart object
	// 2. it returns false for invalid cart objects

	// 3. it returns true for a valid product
	// 4. it returns false for invalid cart objects

