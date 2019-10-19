import { elements } from './base';

//UI / Display model
export default class UI {
    displayResults(flights) {
        let result = '';
        flights.forEach(flight => {
           result += `
            <article class="product">
                <div class="product__container">
                    <img src=${flight.image} alt=${flight.title} class="product__container-img">
                    <a href="#" class="product__container-reserve btn--reserve btn--white" data-id=${flight.id}>
                        Reserve now <i class="fas fa-plane-departure"></i>
                    </a>
                </div>
                <h3 class="product__name">${flight.title}</h3>
                <h4 class="product__price">$${flight.price}</h4>
            </article>
            `;
            elements.flightsContent.innerHTML = result;
        })
    }
};
