

const getCategory = async () => {
    
    const {data} = await axios.get('https://dummyjson.com/products/category-list');
    return data;

};
const displayCategories = async () =>{

    const loader = document.querySelector('.loader-container');
    loader.classList.add('active');
    try{
        const categories = await getCategory();
        const result = categories.map((element) => {
            return `
            <div class="category">
                <h2>${element}</h2>
                <a href="./category.html?category=${element}">details</a>
            </div>
            `;
        }).join(" ");
        document.querySelector('.categories .row').innerHTML = result;
    }
    catch{
        document.querySelector('.categories .row').innerHTML = `<p style="color: #fff;">"error during display data</p>`;
    }
    finally{
        loader.classList.remove('active');
    }
}
displayCategories();

const getProducts = async (page) => {
    
    const skip = (page - 1) * 21;
    const {data} = await axios.get(`https://dummyjson.com/products?limit=21&skip=${skip}`);
    return data;

};
const displayProducts = async (page = 1) =>{

    const loader = document.querySelector('.loader-container');
    loader.classList.add('active');
    try{
        
        const data = await getProducts(page);
        const numberOfPages = Math.ceil(data.total / 21);
        const pageItem = document.querySelector('.page-item');
        const result = data.products.map((element) => {
            return `
            <div class="product">
                <h2>${element.title}</h2>
                <img src="${element.thumbnail}"/>
            </div>
            `;
        }).join(" ");
        document.querySelector('.products .row').innerHTML = result;
        let paginationLink = ``;
        if(page!=1){
           paginationLink+= `<li class="page-item"><button class="page-link" onclick=displayProducts('${page-1}') >&laquo;</button></li>`;
        }else{
            paginationLink+= `<li class="page-item disabled"><button class="page-link">&laquo;</button></li>`;
        }

        for(let i=1;i<=numberOfPages;i++){
            paginationLink+=`<li class="page-item ${page==i?'active':''}"><button class="page-link" onclick=displayProducts('${i}') >${i}</button></li>`;
        }

        if(page==numberOfPages){
            paginationLink += `<li class="page-item disabled"><button class="page-link" >&raquo;</button></li>`;
        }
        else{
            paginationLink += `<li class="page-item"><button class="page-link" onclick=displayProducts('${page+1}') >&raquo;</button></li>`;
        }

        document.querySelector('.pagination').innerHTML = paginationLink;

    }
    catch{
        document.querySelector('.products .row').innerHTML = `<p style="color: #fff;">"error during display data</p>`;
    }
    finally{
        loader.classList.remove('active');
    }

}
displayProducts();




window.onscroll = ()=>{
    const navBar = document.querySelector('.header');
    const categories = document.querySelector('.categories');
    if(window.scrollY>categories.offsetTop){
        navBar.classList.add('nav-nav');
    }
    else{
        navBar.classList.remove('nav-nav');
    }

}



const countDown = ()=>{

    const countDownDate = new Date("2026-01-01T00:00:00").getTime();
    const now = new Date().getTime();
    let distance = countDownDate - now;
  
    const days = Math.floor(distance / (1000*24*60*60));
  
    distance = distance%(1000*24*60*60);
    const hours = Math.floor(distance / (1000*60*60));
  
    distance = distance%(1000*60*60);
    const minutes = Math.floor(distance / (1000*60));
  
    distance = distance%(1000*60);
    const seconds = Math.floor(distance / (1000));
  
    document.querySelector('#days').textContent = days;
    document.querySelector('#hours').textContent = hours;
    document.querySelector('#minutes').textContent = minutes;
    document.querySelector('#seconds').textContent = seconds;
  
  
  
  }
  
  setInterval(()=>{
  
    countDown();
  
  },1000);