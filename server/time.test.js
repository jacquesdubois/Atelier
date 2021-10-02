const { performance } = require('perf_hooks');
const axios = require('axios');

const num = Math.floor(Math.random() * 1000011);

var startTime = performance.now()

axios.get('http://localhost:5000/products')
    .then(() => {
        console.log('')
        var endTime = performance.now()
        console.log(`Call to getProducts took ${endTime - startTime} milliseconds`)
        console.log('');
    })

var startTime = performance.now()

axios.get(`http://localhost:5000/products/${num}`)
    .then(() => {
        var endTime = performance.now()
        console.log(`Call to getProductInfo took ${endTime - startTime} milliseconds`)
        console.log('');
    })

var startTime = performance.now()

axios.get(`http://localhost:5000/products/${num}/styles`)
    .then(() => {
        var endTime = performance.now()
        console.log(`Call to getProductStyles took ${endTime - startTime} milliseconds`)
        console.log('');
    })

var startTime = performance.now()

axios.get(`http://localhost:5000/products/${num}/related`)
    .then(() => {
        var endTime = performance.now()
        console.log(`Call to getRelatedProducts took ${endTime - startTime} milliseconds`)
        console.log('');
    })