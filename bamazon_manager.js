var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
})

var makeTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Item_ID\tProduct Name\tPrice\tNumber in Stock");
        console.log("---------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + "\t" + res[i].productname + "\t" + res[i].departmentname + "\t" + res[i].price + "\t" + res[i].quantity);
        }

        console.log("---------------------------");
        promptManager(res);
    })

}

var promptManager = function (res) {
    inquirer.prompt([{
        type: "rawlist",
        name: "choice",
        message: "What would you like to do?",
        choices: ["Add new item", "Add quantity to an existing item"]
    }]).then(function (val) {
        if (val.choice == "Add new item") {
            addItem();
        }
        if (val.choice == "Add quantity to an existing item") {
            addQuantity(res);
        }
    })
}

function addItem() {
    inquirer.prompt([{
        type: "input",
        name: "productname",
        message: "What is the name of the product?"
    }, {
        type: "input",
        name: "departmentname",
        message: "What department does this product fit into?"
    }, {
        type: "input",
        name: "price",
        message: "What is the price of the item?"
    }, {
        type: "input",
        name: "quantity",
        message: "How many of the item are available for sale?"
    }]).then(function (val) {
        connection.query("INSERT INTO products (productname,departmentname,price,quantity) VALUES ('" + val.productname + "','" + val.departmentname + "'," + val.price + "," + val.quantity + ");", function (err, res) {
            if (err) throw err;
            console.log(val.productname + " ADDED TO BAMAZON!");
            makeTable();
        })
    })
}

function addQuantity(res) {
    inquirer.prompt([{
        type: "input",
        name: "productname",
        message: "What product would you like to update?"
    }, {
        type: "input",
        name: "added",
        message: "How much stock would you like to add?"
    }]).then(function (val) {
        for (i = 0; i < res.length; i++) {
            if (res[i].productname == val.productname) {
                connection.query('UPDATE products SET quantity=quantity+' + val.added + ' WHERE item_id= ' + res[i].item_id + ';', function (err, res) {
                    if (err) throw err;
                    if (res.affectedRows == 0) {
                        console.log("That item does not exist at this time. Try selecting a different item.");
                        makeTable();
                    } else {
                        console.log("Items have been added into your inventory!");
                        makeTable();
                    }
                })
            }
        }
    })
}



makeTable();