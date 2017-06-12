const fs = require('fs');
const mongoose = require('mongoose')
const Product = require('./productSchema.js')
const makeSlug = require('./makeSlug.js')
const async = require('async-kit')

// Read Json file
const json = JSON.parse(fs.readFileSync('output.json', 'utf8'));

var images

fs.readdir('fotoarchery', (err, files) => {
    if (err) console.log(err)
    images = files
})


setTimeout(() => console.log(images), 1000)


// Connect to db
const db = 'mongodb://localhost/nextcommerce'
mongoose.connect(db, (err) => {
    iteration(json)
    if (err) throw err
});

// Loop thgrough Json
function iteration(json) {
    console.log('Begining iteration. Length: ' + json.length)
    json.forEach(function (product, i) {
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
        // return console.log("New Product Created. Iteration: " + i)
    })
}

function getProductsImages(product) {
    var prodImages = []
    images.forEach((image) => {
        let fileName = product.fileName
        let imageName = image.slice(0, 6)
        if (fileName === imageName && product.father) prodImages.push(image)
        // if (product.sku.includes(image.slice(0, 8))) console.log(product.sku)
    })
    return prodImages
}

function makeProduct(product) {
    return productForDb = {
        father: product.father,
        name: product.name,
        images: getProductsImages(product),
        slug: makeSlug(product.name),
        featuredImage: product.fileName + ".jpg",
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