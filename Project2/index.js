/*

Please feel free to modify the existing codes.

All functions (or classes) to be be submitted should be in global scope.

If you have any question, feel free to ask in the course's wechat group.

*/

'use strict';

function ip_sort(ip_addresses) {
	// TODO:

	//sort
	ip_addresses.sort(function (ipa, ipb) {
		let a = ipa.split('.')
		let b = ipb.split('.')
		if (a[0] != b[0]) return parseInt(a[0]) > parseInt(b[0])
		if (a[1] != b[1]) return parseInt(a[1]) > parseInt(b[1])
		if (a[2] != b[2]) return parseInt(a[2]) > parseInt(b[2])
		return parseInt(a[3]) > parseInt(b[3])
	})

	return ip_addresses;
}

class TreeIterator {
	constructor(root) {
		// TODO:
		// this.Tree = generator(root)
		this.Tree = function* generator(rt) {
			if (rt === null) return
			yield* generator(rt.left)
			yield rt.val
			yield* generator(rt.right)
		}(root)
		this.currentNode = this.Tree.next()
	}
	has_next() {
		// TODO:
		if (this.currentNode === null) return false;
		if (this.currentNode.done === false) return true;
		return false;
	}
	next_value() {
		// TODO:
		if (this.currentNode === null) return null;
		let result = this.currentNode.value
		this.currentNode = this.Tree.next()
		return result
	}
}

//my ToPrimitive function
function ToPrimitive(input) {
	function isPrimitive(value) {
		if (value === null) return true
		if (typeof value !== 'function' && typeof value !== 'object') return true
		return false
	}
	function isClassFunc(value) {
		let constructorReg = /^\s*class\b/
		try {
			let fnString = Function.prototype.toString.call(value)
			return constructorReg.test(fnString)
		}
		catch (e) {
			return false //not a function
		}
	}
	function isCallable(value) {
		if (!value) return false
		if (typeof value !== 'function' && typeof value !== 'object') return false
		if (typeof value === 'function' && !value.prototype) return true

		//try function
		try {
			if (isClassFunc(value)) return false
			Function.prototype.toString.call(value)
			return true
		}
		catch (e) {
			return false
		}
	}

	function GetMethod(O, P) {
		let fun = O[P]
		if (fun !== null && typeof fun !== 'undefined') {
			if (!isCallable(fun)) {
				throw new TypeError(fun + ' is not a functino.')
			}
			return fun;
		}
		return undefined
	}

	function OrdinaryToPrimitive(O, hint) {
		if (typeof O !== 'object') throw new TypeError('typeof O is not object')
		if (typeof hint !== 'string' && typeof hint !== 'number') throw new TypeError('typeof hint is not string or number')

		let methodNames = (hint === 'string') ? ['toString', 'valueOf'] : ['valueOf', 'toString']

		let t = 0
		for (t in methodNames) {
			let method = O[methodNames[t]]
			if (isCallable(method)) {
				let result = method.call(O)
				if (isPrimitive(result)) {
					return result
				}

			}
		}
		throw new TypeError('no default value')
	}

	if (isPrimitive(input)) return input
	// console.log('origin: ')
	let hint = 'default'
	if (arguments.length > 1) {
		if (arguments[1] === String) hint = 'string'
		else if (arguments[1] === Number) hint = 'number'
	}

	let exoticToPrim = GetMethod(input, Symbol.toPrimitive)

	if (typeof exoticToPrim !== 'undefined') {
		let result = exoticToPrim.call(input, hint)
		if (isPrimitive(result))
			return result
		throw new TypeError('can\'t convert to primitive')
	}
	if (hint === 'default') hint = 'number'

	return OrdinaryToPrimitive(input, hint)
}

function equal(o1, o2) {


	// TODO:
	let typ1 = typeof o1
	let typ2 = typeof o2
	if (typ1 === typ2) {
		return o1 === o2
	}
	if (o1 === null && o2 === undefined) return true
	if (o1 === undefined && o2 === null) return true

	if (typ1 === 'number' && typ2 === 'string') return equal(o1, Number(o2))
	if (typ1 === 'string' && typ2 === 'number') return equal(Number(o1), o2)

	if (typ1 === 'boolean') return equal(Number(o1), o2)
	if (typ2 === 'boolean') return equal(o1, Number(o2))

	if (typ1 === 'string' || typ1 === 'number' || typ1 === 'symbol') {
		if (typ2 === 'object' && o2 !== null) return equal(o1, ToPrimitive(o2))
	}

	if (typ2 === 'string' || typ2 === 'number' || typ2 === 'symbol') {
		if (typ1 === 'object' && o1 !== null) return equal(ToPrimitive(o1), o2)
	}

	return false
}

// console.log(ip_sort(['255.255.255.0', '123.124.123.2', '59.66.137.30', '59.67.0.0', '59.1.1.1', '59.66.123.256', '59.66.137.4', '59.66.137.234']))
const tree = {
	val: 1,
	right: {
		val: 2,
		right: null,
		left: {
			val: 3,
			right: null,
			left: null
		}
	},
	left: {
		val: 1,
		right: {
			val: 2,
			right: null,
			left: {
				val: 3,
				right: null,
				left: null
			}
		},
		left: {
			val: 4,
			left: null,
			right: null
		}
	}
}
// const tree = null
// const iterator = new TreeIterator(tree);
// console.log(iterator.has_next())
// while(iterator.has_next()){
// 	console.log(iterator.has_next())
// 	console.log(iterator.has_next())
// 	console.log(iterator.has_next())
// 	console.log(iterator.has_next())
// 	console.log(iterator.has_next())
//     console.log(iterator.next_value());
// }
// equal(2,3)
let ls = [true, false, 1, 0, -1, "true", "false", "1", "0", "-1", "", null, undefined, Infinity, -Infinity, [], {}, [[]], [0], [1], NaN]

let errors = []
let k = 0

// console.log(equal(3, 1))


for (let i = 0; i < ls.length; i++) {
	for (let j = 0; j < ls.length; j++) {

		let a = ls[i]
		let b = ls[j]
		try {
            if (equal(a, b) === (a == b)) {
                console.log('right')
            }
            else {
                errors.push('error with ' + ls[i] + ' and ' + ls[j])
				console.log('error with ' + ls[i] + ' and ' + ls[j])
            }
        }
		catch (e) {
			console.log(i)
			console.log(j)
			console.log(typeof a + ': ' + a)
			console.log(typeof b + ': ' + b)
		}
		console.log('count: ' + k)
		k++
	}
}
if (errors.length === 0)
	console.log('no error!')
else {
	console.log('errors:')
	console.log(errors)
}