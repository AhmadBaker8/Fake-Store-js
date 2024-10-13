

const getCategory = async () => {
    
    const {data} = await axios.get('https://dummyjson.com/products/category-list');
    return data;

};
const displayCategories = async () =>{


    const categories = await getCategory();
    const result = categories.map((element) => {
        return `
        <div class="category">
            <h2>${element}</h2>
            <a href="assets/html/category.html?category=${element}">details</a>
        </div>
        `;
    }).join(" ");
    document.querySelector('.categories .row').innerHTML = result;
}
displayCategories();

const getProducts = async () => {
    
    const {data} = await axios.get('https://dummyjson.com/products');
    console.log(data);
    return data;

};
const displayProducts = async () =>{


    const products = await getProducts();
    const result = products.products.map((element) => {
        return `
        <div class="product">
            <h2>${element.title}</h2>
            <img src="${element.thumbnail}"/>
        </div>
        `;
    }).join(" ");
    document.querySelector('.products .row').innerHTML+= result;

}
displayProducts();

