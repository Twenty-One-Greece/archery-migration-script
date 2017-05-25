const fs = require('fs');
const mongoose = require('mongoose')
const Product = require('./productSchema.js')
const makeSlug = require('./makeSlug.js')
const async = require('async-kit')
    // Read Json file
console.log('Loading products file..')
const json = JSON.parse(fs.readFileSync('output.json', 'utf8'));

async.series([
    function(callback) {
            connectToDb(callback);
    },
    function(callback) {
            iteration(json, callback);
    },
])
    .exec(function(error, results) {
        if (error) console.log(error)
        else {
            console.log("Fathers iteration finished.")
            process.exit() // Exit when array comes to a finish
        }
    });


// Connect to db
function connectToDb(callback) {
    const db = 'mongodb://localhost/nextcommerce'
    mongoose.connect(db, (err) => {
        return callback(console.log('Connected to database: ' + db))
        if (err) throw err
    });
}

// Loop thgrough Json
function iteration(json, callback) {
    console.log('Begining Fathers\' iteration. Length: ' + json.length)
    async.forEach(json, (function(product, i) {
        const productToSave = makeProduct(product) // Make product info
        if (product.father === "1") { // Save it if its is a "father product"
            var newProduct = new Product(productToSave) // Make new product model
            return saveNewProduct(newProduct) // Save
        }
    }, this))
}

function saveNewProduct(product) {
    product.save((err) => {
        if (err) return console.log(err)
        return console.log("New Product Created. SKU: " + product.sku)
    })
}

function makeProduct(product) {
    return productForDb = {
        name: product.name,
        slug: makeSlug(product.name),
        featuredImage: product.fileName,
        seoKeywords: product.name,
        seoDescription: product.name,
        seoTitle: product.name,
        color: product.color,
        height: String(parseFloat(product.height)),
        width: String(parseFloat(product.width)),
        weight: String(parseFloat(product.weight)),
        length: String(parseFloat(product.length)),
        tax: "24",
        stockStatus: "",
        drawWeight: product.drawWeight,
        drlMin: product.drlMin,
        drlMax: product.drlMax,
        hand: product.hand,
        lengthInInches: product.lengthInInches,
        stock: product.stock,
        price: product.price,
        salesPrice: product.salesPrice,
        barcode: "",
        sku: product.sku,
        country: product.country,
        brand: product.brand,
        category: product.category.split('>'),
        shortDescription: "",
        video: "",
        description: product.description,
        featured: "No",
        active: "Yes",
        related: [],
        children: [],
    }
}


// process.exit()