// Product model
export default class Flights {
    async getResults() {
        try {
            // 1.Get the results
            let res = await fetch('products.json');
            let data = await res.json();
            
            // 2.Destructuring flight items
            let flights = data.items;

            flights = flights.map(flight => {
                const {title, price} = flight.fields;
                const {id} = flight.sys;
                const image = flight.fields.image.fields.file.url;
                return {title, price, id, image};
            });

            console.log(flights);
            //3. Return the new flight items
            return flights;

        } catch (err) {
            console.log(err);
        }
    }
}

