const fs = require('fs');
const mongoose = require('mongoose')
const Product = require('./productSchema.js')
const makeSlug = require('./makeSlug.js')

// Read Json file
const json = JSON.parse(fs.readFileSync('output.json', 'utf8'));

// Connect to db
const db = 'mongodb://localhost/nextcommerce'
mongoose.connect(db, (err) => {
    iteration(json)
    if (err) throw err
});

function iteration(json) {
    console.log('Begining iteration. Length: ' + json.length)
    json.forEach(function(product, i) {
        if (product.father === "2") {
            const productToSave = makeProduct(product)
            addChildProduct(productToSave, i)
        }
    }, this);
}

function addChildProduct(newProduct, i) {
    const skuPart = newProduct.sku.substring(0, 7)
    const regex = new RegExp(skuPart, 'i')
    Product.findOneAndUpdate({ sku: regex }, { $push: { children: newProduct } },
        (err) => {
            if (err) return console.log(err)
            return console.log("New Product child Created. Iteration: " + i)
        })
}

function makeProduct(product) {
    return productForDb = {
        name: product.name,
        slug: makeSlug(product.name),
        featuredImage: product.fileName,
        color: product.color,
        height: String(parseFloat(product.height)),
        width: String(parseFloat(product.width)),
        weight: String(parseFloat(product.weight)),
        length: String(parseFloat(product.length)),
        drawWeight: product.drawWeight,
        drlMin: product.drlMin,
        drlMax: product.drlMax,
        hand: product.hand,
        lengthInInches: product.lengthInInches,
        stock: product.stock,
        sku: product.sku,
    }
}