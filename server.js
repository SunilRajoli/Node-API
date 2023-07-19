const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}));

//routes
app.get('/', (req, res) => {
    res.send('Node API');
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, This is your helper!')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with id ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with id ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://admin:1dmin123@nodeapi.lji4qsx.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Node API is running on port 3000');
    })
}).catch((error) => {
    console.log(error);
})