import { elements } from './base';
import Flights from './Flights';
import UI from './UI';
import Storage from './Storage';

// What happens when content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize classes
    let ui = new UI();
    let flights = new Flights();

    // INITIALIZE APP when content is LOADED
    ui.initializeApp();

    // 2. Get result from flight class
    flights.getResults().then(flights => {
        // 1. Display the flights in the DOM 
        ui.displayResults(flights);

        // 2. Save the flight items in LS
        Storage.saveFlights(flights);
    }).then(() => {
        // 1. Get all reserve buttons AFTER content loads
        ui.getReserveButtons();

        // 2. Implement cart logic
        ui.cartLogic();
    });
});