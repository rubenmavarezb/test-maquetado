//Array that will cotain the data of db.json
let data = [];
////////////////////////////////////////////

//DOM selectors
const sE = elem => document.querySelector(elem);
const seAll = elem => document.querySelectorAll(elem);
///////////////////////////////////////////

//Async function to fetch the data
const getData = async () => {
    const db = await fetch('db.json');
    const result = await db.json();
    return result;
}

getData().then(result => data = [...result]);
/////////////////////////////////////////

//Function that will create the  structure of the article with the info of each product
const buildArticleHtml = product => {
    return `
    <article class="main__shoe">
        <figure class="main__shoe__img">
            <img src=${product.img} alt="">
        </figure>
        <div class="main__shoe__info">
            <p>${product.name}</p>
            <h4>$${product.price}</h4>
        </div>
    </article>
    `;
}
///////////////////////////////////////////////

//Function that will render the element in the HTML
const renderProducts = (products, elem) => {
    let container = sE(elem);
    container.innerHTML = '';
    let html = ''
    products.forEach(product => {
        html += buildArticleHtml(product);
        
    })
    return container.innerHTML = html
}
/////////////////////////////////////////////

//Function that will filter from the DB and render products filtered from category, size or color
const filterProducts = (products, type) => {
    const newData = products.filter(product => product.category.toLowerCase() === type.toLowerCase() || product.size === Number(type) || product.color.toLowerCase() === type.toLowerCase());
    console.log(newData)
    renderProducts(newData, '.main__products');
}
///////////////////////////////////////////

window.onload = () => {

    //Render the products
    renderProducts(db, '.main__products');

    //Constant declarations
    const filterClosebtn = sE('.main__categories p'); //close button in the aside element
    const burgerBtn = sE('.navbar__burger');
    const navList = sE('.navbar__nav__list')
    /////////////////////////////////////////////////////

    //Event

    //On click event for open and close the categories section
    Array.from(seAll('.main__category')).forEach(category => {
        category.onclick = (e) =>{
            e.target.classList.toggle('active');
            e.target.parentElement.children[1].classList.toggle('open');
        }
    })
    ///////////////////////////////////////////////////

    //On click event to capture the type of category the user wants to see
    Array.from(seAll('.main__options--padding')).forEach(option => {
        option.onclick = e => {
            e.stopPropagation();
            const type = e.target.textContent;
            filterProducts(db, type);
            filterClosebtn.classList.add('visible');  
        }
    })
    ///////////////////////////////////////////////////

    //On click event for rendering the producst as default
    filterClosebtn.onclick = () => {
        filterClosebtn.classList.remove('visible');
        renderProducts(db, '.main__products');
    }
    //////////////////////////////////////////////////

    //on click to open and close the menu
    burgerBtn.onclick = () => {
        navList.classList.toggle('menu-active');
    }
    navList.onclick = () => {
        navList.classList.toggle('menu-active');
    }
    //////////////////////////////////////////////////
}

