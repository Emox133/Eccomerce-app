import { elements } from './base';
import Products from './Products';
 
// Initial Cart
let cart = [];


// What happens when content is loaded
document.addEventListener('DOMContentLoaded', () => {
    let products = new Products();
    products.getResults();
});