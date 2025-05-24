// Remember to use RED, GREEN, REFACTOR
// 1. pick one test case in validation.test.js
// 2. write the code, verify that the test is RED
// 3. write code in this file so that the test case becomes GREEN
// 4. refactor as neccessary before you move on to the next
// 5. repeat

function isCartItem(maybeCartItem) {
	if (typeof maybeCartItem.id !== 'number' || 
		typeof maybeCartItem.amount !== 'number' || 
		typeof maybeCartItem.item !== 'object') {
		return false
	}
	return true
}

function isProduct(maybeProduct) {}


export { isCartItem, isProduct }
