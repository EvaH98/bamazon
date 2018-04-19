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
	console.log("Connected!");
});

function startShop(){
	inquirer.prompt([
	{
		name: "product",
		type: "input",
		message: "Please input the item's ID"
	},
	{
		name: "quantity",
		type: "input",
		message: "How much would you like to buy?"
	}
	]).then(function(answer){
		
	})
}
