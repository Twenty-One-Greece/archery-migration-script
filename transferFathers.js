const fs = require('fs');
const mongoose = require('mongoose')
const Product = require('./productSchema.js')
const makeSlug = require('./makeSlug.js')
const async = require('async-kit')

// Read Json file
const json = JSON.parse(fs.readFileSync('output.json', 'utf8'));

// Connect to db
const db = 'mongodb://localhost/nextcommerce'
mongoose.connect(db, (err) => {
    iteration(json)
    if (err) throw err
});

// Loop thgrough Json
function iteration(json) {
    console.log('Begining iteration. Length: ' + json.length)
    json.forEach(function(product, i) {
        const productToSave = makeProduct(product) // Make product info
        if (product.father === "1") { // Save it if its is a "father product"
            var newProduct = new Product(productToSave) // Make new product model
            return saveNewProduct(newProduct, i) // Save
        }
    }, this)
}

function saveNewProduct(product, i) {
    product.save((err) => {
        if (err) return console.log(err)
        return console.log("New Product Created. Iteration: " + i)
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
        brand: makeSlug(product.brand),
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