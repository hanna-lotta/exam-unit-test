import { isCartItem, isProduct } from "../validation.js"

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


describe('Validation isCartItem', () => {
	it ('returns true for a valid cart object', () => {
		// Arrange
		const input = exampleCartObject
		const expected = true
		// Act
		const actual = isCartItem(input)
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
			const input = exampleProduct
			const expected = true
			//Act
			const actual = isProduct(input)
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

	

