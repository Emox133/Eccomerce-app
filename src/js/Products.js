// Product model
export default class Products {
    // 1. Get the results
    async getResults () {
       try {
        let results = await fetch('/dist/products.json');
        let data = await results.json();
        console.log(data);
       } catch(error) {
           console.log(error);
       }
    }
};

