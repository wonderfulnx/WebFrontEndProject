/*

Please feel free to modify the existing codes.

All functions (or classes) to be be submitted should be in global scope.

If you have any question, feel free to ask in the course's wechat group.

*/

'use strict';

function ip_sort(ip_addresses) {
	// TODO:

	//sort
	ip_addresses.sort(function(ipa, ipb){
		let a = ipa.split('.')
		let b = ipb.split('.')
		if (a[0] != b[0]) return parseInt(a[0]) > parseInt(b[0])
		if (a[1] != b[1]) return parseInt(a[1]) > parseInt(b[1])
		if (a[2] != b[2]) return parseInt(a[2]) > parseInt(b[2])
		return parseInt(a[3]) > parseInt(b[3])
	})

	return ip_addresses;
}

// function* generator(root) {
// 	let list = []
// 	function traverse(rt){
// 		if (rt === null) return
// 		traverse(rt.left)
// 		list.push(rt.val)
// 		traverse(rt.right)
// 	}
// 	traverse(root)
// 	for (let t of list){
// 		yield t
// 	}
// }

class TreeIterator {
	constructor(root) {
		// TODO:
		// this.Tree = generator(root)
		this.Tree = function* generator(rt){
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

function equal(o1, o2) {
	function ToPrimitive(input){
		let type = typeof input
		if (type === 'undefined' || type === 'null' || type === 'boolean'|| 
			type === 'number' || type === 'string' || 	type === 'symbol')
			return input
		
	}

	// TODO:
	if (typeof o1 === typeof o2){
		return o1 === o2
	}
	if (o1 === null && o2 === undefined) return true
	if (o1 === undefined && o2 === null) return true

	if (typeof o1 === 'number' && typeof o2 === 'string') return x === ToNumber(y)
	return true;
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
};
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
equal(2,3)