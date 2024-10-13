





const getProducts = async () => {

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const {data} = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return data;
}

const displayProducts = async () =>{

    const product = await getProducts();
    const result = product.products.map((element) => {
        return `
        <div class="product">
            <h2>${element.title}</h2>
            <img src="${element.thumbnail}"/>
        </div>
        `;
    }).join(" ");
    document.querySelector('.products .row').innerHTML = result;

}
displayProducts();