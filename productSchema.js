const mongoose = require('mongoose')
const Schema = mongoose.Schema
    // const autoIncrement = require('mongoose-auto-increment')

// initialize autoIncrement
const db = 'mongodb://localhost/nextcommerce'
mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(db);
// autoIncrement.initialize(connection);

const relatedSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: ''
    },
    featuredImage: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: ''
    },
    hand: {
        type: String,
        default: ''
    },
    drawWeight: {
        type: String,
        default: ''
    },
    drlMin: {
        type: String,
        default: ''
    },
    drlMax: {
        type: String,
        default: ''
    },
    images: {
        type: Array,
        default: []
    }
})

// create a schema
const productSchema = new Schema({
    productID: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    active: {
        type: String,
        default: 'Yes'
    },
    featured: {
        type: String,
        default: 'No'
    },
    description: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    video: {
        type: String,
        default: ''
    },
    shortDescription: {
        type: String,
        default: ''
    },
    related: {
        type: Array,
        default: [relatedSchema]
    },
    children: {
        type: Array,
        default: [relatedSchema]
    },
    // Categorisation
    category: {
        type: Array,
        default: []
    },
    brand: {
        type: String,
        default: ''
    },
    // Inventory
    sku: {
        type: String,
        unique: true,
        default: ''
    },
    barcode: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: ''
    },
    salesPrice: {
        type: String,
        default: ''
    },
    stock: {
        type: String,
        default: ''
    },
    stockStatus: {
        type: String,
        default: ''
    },
    tax: {
        type: String,
        default: ''
    },
    // Shipping
    weight: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: ''
    },
    height: {
        type: String,
        default: ''
    },
    length: {
        type: String,
        default: ''
    },
    depth: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: ''
    },
    seoTitle: {
        type: String,
        default: ''
    },
    seoDescription: {
        type: String,
        default: ''
    },
    seoKeywords: {
        type: String,
        default: ''
    },
    images: {
        type: Array,
        default: []
    },
    featuredImage: {
        type: String,
        default: ''
    },
    drawWeight: {
        type: String,
        default: ''
    },
    drlMin: {
        type: String,
        default: ''
    },
    drlMax: {
        type: String,
        default: ''
    },
    hand: {
        type: String,
        default: ''
    },
    lengthInInches: {
        type: String,
        default: ''
    },
    updates: {
        type: Array,
        default: []
    },
    created_at: Date,
    updated_at: Date,
});

// On every save, add the date
productSchema.pre('validate', function(next) {
    var currentDate = new Date()
    this.updated_at = currentDate
    if (!this.created_at) this.created_at = currentDate
    next()
})

// productSchema.plugin(autoIncrement.plugin, { model: 'Product', field: 'productID', startAt: 100000 });

const Product = mongoose.model('Product', productSchema)

module.exports = Product