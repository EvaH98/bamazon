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
		inquirer.prompt([
	{
		name: "id",
		type: "input",
		message: "Please input the item's ID"
	},
	{
		name: "quantity",
		type: "input",
		message: "How much would you like to buy?"
	}
	]).then(function(input){
		var query = "SELECT * FROM products WHERE ?";

		connection.query(query, {item_id: input.id}, function(err, res){
			if(res[0].stock_quantity < input.quantity){
				console.log("Sorry we don't have enough in stock :(");
				startShop();
			}else{
				var update = res[0].stock_quantity - input.quantity;
				var query = "UPDATE products SET ? WHERE ?";

				connection.query(query, [{stock_quantity: update}, {item_id: input.id}], function(err, res){
					if(err) throw err;
				});

				var total = res[0].price * input.quantity;
				console.log("Thank you for your purchase! Your total is: $" + total);

				inquirer.prompt([
					{
						name: "continue",
						type: "confirm",
						message: "Would you like to make another purchase?"
					}
				]).then(function(response){
					if(response.continue === true){
						startShop();
					} else{
						console.log("--------------Thank you for shopping at Bamazon!--------------")
						connection.end();
					}
				});
			}
		})
	});
});
}
