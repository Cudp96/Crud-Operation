let backendProducts = [];
//using fetch api async/await
const getProducts = async () => {
  //const let - block scoped variable
  const response = await fetch("http://localhost:8080/api/v1/products");
  const product = await response.json();

  // console.log(product.limit)
  //object destructuring
  const { data } = product;

  console.log(data)

  // Looping the individual data to fetch all the products.
  data.forEach((product) => {
    const div = document.createElement("div");
    div.style = "width: 23%";
    div.className = "card m-2";

    const image = document.createElement("img");
    image.className = "h-75";
    image.src = product.thumbnail;

    const p = document.createElement("p");
    p.className = "text-center";
    p.innerText = product.title;

    const editButton = document.createElement("button");
    editButton.className = "btn btn-primary mb-2";
    editButton.innerText = "Edit";
    // setting attritubute for edit button
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#editexampleModal");
    editButton.addEventListener("click", (event) => {
      event.preventDefault();
      //function call Edit
      submitEditHandler(product);
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      //function call Delete
      submitDeleteHandler(product);
    });

    div.append(image);
    div.append(p);
    div.append(editButton);
    div.append(deleteButton);

    //append divs in container to html
    const container = document.getElementById("container");
    container.append(div);
  });

  // localStorage.setItem("products", JSON.stringify(data));
};

const editProductEl = document.getElementById("editproductName");
const editProductDescriptionEl = document.getElementById(
  "editproductDescription"
);
const productId = document.getElementById('productId');
//Function called when edit button is clicked
const submitEditHandler = (product) => {
  editProductEl.value = product.title;
  editProductDescriptionEl.value = product.description;
  productId.value = product._id;
};

const editProductbtnEl = document.querySelector("#editproductbtn");
editProductbtnEl.addEventListener("click", async(e) => {
  e.preventDefault();
  const editProductEl = document.getElementById("editproductName").value;
  const editProductDescriptionEl = document.getElementById(
    "editproductDescription"
  ).value;
  const prodId = productId.value; 
  
  
  let editProduct ={
   title: editProductEl,
   description: editProductDescriptionEl,
   
  }

  console.log(editProduct);
// patching the edited product using patch method 
  const response = await fetch(`http://localhost:8080/api/v1/products/${prodId}`, {
    method: "PATCH",
    headers:{
      'content-type': 'application/json'
    },
    body: JSON.stringify(editProduct),
  });
  const editProducts = await response.json();

  if(editProducts.status){
    window.location.reload();
  }
  
});

//Function called when delete button is clicked
const submitDeleteHandler = async (product) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/products/${product["_id"]}`,
    {
      method: "DELETE",
    }
  );
  const deletedProd = await response.json();
// it will delete the product and reloadthe page
  if (deletedProd.status ){
    window.location.reload();
  }

  const prods = localStorage.getItem("products");
  const filteredProd = JSON.parse(prods).filter((prod) => {
    return prod._id !== product._id;
  });
  console.log(filteredProd);
};

//This is the button click for add product from the modal.
const addProductHandler = async (event) => {
  event.preventDefault();
  const productName = document.getElementById("productName").value;
  const productDescription =
    document.getElementById("productDescription").value;
  const productImage = document.getElementById("productImage").value;

  let prod = {
    title: productName,
    description: productDescription,
    thumbnail: productImage,
  };

  //Calling backend POST API for adding new product
  const response = await fetch("http://localhost:8080/api/v1/products", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(prod),
  });

  const submittedData = await response.json();

  debugger;
  // it will get reloaded after adding the new product
  if (submittedData.status) {
    window.location.reload();
  }
};

getProducts();



// adding eventlistener to redirect to login page after clicking on loginbutton
const logOutBtnEl = document.getElementById('btn');

logOutBtnEl.addEventListener('click', (e)=>{
  e.preventDefault();
  window.location.href = 'index.html';
})

// if (localStorage.getItem("products") !== null) {
//   //getting item from local storage
//   backendProducts = localStorage.getItem("products");
//   const products = JSON.parse(backendProducts);

  // console.log(products)
  
// } else {
//   document.getElementById("container").innerHTML = "No data found";
// }
