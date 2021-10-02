const { performance } = require('perf_hooks');
const axios = require('axios');

var startTime = performance.now()

axios.get('http://localhost:5000/products')
    .then(() => {
        console.log('')
        var endTime = performance.now()
        console.log(`Call to getProducts took ${endTime - startTime} milliseconds`)
        console.log('');
    })

var startTime = performance.now()

axios.get('http://localhost:5000/products/999999')
    .then(() => {
        var endTime = performance.now()
        console.log(`Call to getProductInfo took ${endTime - startTime} milliseconds`)
        console.log('');
    })

var startTime = performance.now()

axios.get('http://localhost:5000/products/999999/styles')
    .then(() => {
        var endTime = performance.now()
        console.log(`Call to getProductStyles took ${endTime - startTime} milliseconds`)
        console.log('');
    })

var startTime = performance.now()

axios.get('http://localhost:5000/products/999999/related')
    .then(() => {
        var endTime = performance.now()
        console.log(`Call to getRelatedProducts took ${endTime - startTime} milliseconds`)
        console.log('');
    })