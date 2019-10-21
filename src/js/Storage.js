export default class Storage {
    static saveFlights(flights) {
        localStorage.setItem("flights", JSON.stringify(flights));
    };

    static getFlight(id) {
        let flights = JSON.parse(localStorage.getItem("flights"));
        return flights.find(flight => flight.id === id);
    };

    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    static getCart() {
        return localStorage.getItem("cart") ? 
        JSON.parse(localStorage.getItem("cart")) : [];
    };
};