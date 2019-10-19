import { elements } from './base';
import Flights from './Flights';
import UI from './UI';

// Initial Cart
let cart = [];

// What happens when content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize classes
    let ui = new UI();
    let flights = new Flights();

    // 2. Get result from flight class
    flights.getResults().then(flights => {
        // 1. Displat the flights in the DOM 
        ui.displayResults(flights);
    });
});