var mysql = require("mysql");
var inquirer = require("inquirer");

//---------MYSQL CONNECTION---------//
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",
	password: "",

	database: "bamazon"
});

connection.connect(function(err){
	if(err) throw err;
	console.log("--------------Welcome to Bamazon!--------------");

	inquirer.prompt([
	{
		name: "menu",
		type: "confirm",
		message: "Would you like to see our inventory first?"

	}
	]).then(function(user){
		if(user.menu === true){
			showInventory();
			startShop();
		}else {
			startShop();
		}
	});
});



function showInventory(){
	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;
		for(var i =0; i<res.length; i++){
			console.log("Product ID: " + res[i].item_id + "\n" + "Product Name: " + res[i].product_name + "\n" + "Department: " + res[i].department_name + "\n" + "Price: " + res[i].price + "\n" + "Stock Quantity: " + res[i].stock_quantity + "\n");
			console.log("----------------------------");	
		}
	});

}

function startShop(){
	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;

		inquirer.prompt([
	{
		name: "item_id",
		type: "input",
		message: "Please input the item's ID"
	},
	{
		name: "quantity",
		type: "input",
		message: "How much would you like to buy?"
	}
	]).then(function(input){
		var item = input.item_id;
		var quantity = input.quantity;
		var queryString = "SELECT * FROM products WHERE ?";

		connection.query(queryString, {item_id: item}, function(err, data){
			if (err) throw err;
			var productData = data[0];

			if(quantity <= productData.stock_quantity){
			console.log("Item In Stock!");
			var updateQuery ="UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + "WHERE item_id = " + item;

			connection.query(updateQuery, function(err, data){
				if(err) throw err;
				console.log("Your order has been placed! Your total is $" + productData.price * quantity);
				console.log("Thank you for shopping at Bamazon!");

				connection.end();
			})
		} else {
			console.log("Whoops! We don't have enough of that product in stock :( ");
			console.log("Please select another item or change your order");
		}
		});
	});
	});
}
