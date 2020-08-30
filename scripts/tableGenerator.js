// Todo : Complete this object to get all the items
const inventory = [
	{
		id : '0',
		name : "Elaichi",
		prices : {
			q1 : 340,
			q2 : 680,
			q3 : 1700
		}
	},
	{
		id : '1',
		name : "Dal Chini",
		prices : {
			q1 : 38,
			q2 : 76,
			q3 : 190
		}
	}
];

const quantities = {
	q1: "100g",
	q2: "200g",
	q3: "500g"
};


$(document).ready(function() {
	// initialization code goes here
	console.log(inventory);
	const tbody = $("tbody")[0];
	inventory.map(item => {
		const row = document.createElement('tr');
		const name = createBlock('td', 'table-data-item', item.name);
		row.appendChild(name);
		Object.keys(item.prices).map(price => {
			const td = createBlock('td','table-data-item');
			const div = createBlock('div', 'form-check');
			const checkbox = createCheckbox(`${item.id}_${price}`, item.prices[price]);
			div.appendChild(checkbox);
			td.appendChild(div);
			row.appendChild(td);
		});
		
		tbody.appendChild(row);
		
	});
	
	function createBlock(type, className, data) {
		const element = document.createElement(type);
		if (className)
			element.className = className;
		if (data)
			element.innerText = data;
		
		return element;
	}
	
	function createCheckbox(id, quantity) {
		const label = createBlock('label', 'form-check-label');
		const input = createBlock('input', 'form-check-input');
		input.type = 'checkbox';
		input.id = id;
		input.value = quantity;
		label.appendChild(input);
		const q = document.createTextNode(quantity);
		label.appendChild(q);
		
		return label;
	}
});


function generateCart() {
	const selectedItems = $("input:checked");
	const cartData = [];
	Object.values(selectedItems).forEach(item => {
		if (!item.id)
			return;
		
		const id = item.id.split("_")[0];
		const qID = item.id.split("_")[1];
		const name = inventory.find(product => product.id === id).name;
		const quantity = quantities[qID];
		cartData.push({
			name: name,
			quantity: quantity
		});
		
	});
	
	let message = `Hello, here is the list of items I would like to purchase: \n`;
	cartData.forEach(item => message += `${item.name} : ${item.quantity} \n`);
	
	const textarea = $("textarea")[0];
	textarea.innerHTML = message;
	copyToClipboard();
}

function copyToClipboard() {
	const copyText = $("textarea")[0];
	copyText.value = copyText.innerHTML.toString();
	copyText.select();
	copyText.setSelectionRange(0, 99999);
	document.execCommand("copy");
}


