const Product = require('../models/Product');

const baseHtml = `
<!DOTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles.css">
        <title>Tienda de Ropa</title>
    </head>
    <body>
`;

const getNavbar = (isDashboard = false) => `
<nav>
    <a href="/products">Inicio</a>
    ${isDashboard ? '<a href="/dashboard/new">Nuevo Producto</a>' : ''}
</nav>
`;

function getProductCards(products) {
    let html = '';
    for (let product of products) {
      html += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>${product.price}€</p>
          <a href="/products/${product._id}">Ver detalle</a>
        </div>
      `;
    }
    return html;
  }

  const showProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const productCards = getProductCards(products);
        const html = baseHtml + getNavbar() + productCards + '</body></html>';
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
  }


  const showProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) return res.status(404).send('Producto no encontrado');
      const html = baseHtml + getNavbar() + `
        <div class="product-detail">
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>${product.price}€</p>
          <a href="/products">Volver</a>
        </div>
      </body></html>`;
      res.send(html);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  };

  const showProductByCategory = async (req, res) => {
    
    // NO CONSIGO QUE FUNCIONE
    
    const category = req.params.category;
    const products = await Product.find({category: category});
   
    if(!products || products.length === 0) {
      return res.status(404).send('Categoría no encontrada');
    }
   
    const html = baseHtml + getNavbar() + 
    `
      <div class="product-detail">
        <img src="${products.image}" alt="${product.name}">
        <h2>${products.name}</h2>
        <p>${products.description}</p>
        <p>${products.price}€</p>
        <a href="/products">Volver</a>
      </div>
    </body></html>`;
    res.send(html);
  };

const showDashboard = async (req, res) => {
  const products = await Product.find();
  const productCards = getProductDashboard(products);
  const html = baseHtml + getNavbar() + productCards +' </body></html>';
  res.send(html);
};

  function getProductDashboard(products) {
    let html = '';
    for (let product of products) {
      html += `
        <div class="product-card-dashboard">
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>${product.price}€</p>
          <a href="/dashboard/${product._id}">Ver producto</a>
        </div>
      `;
    }
    return html;
  }

  const showNewProduct = (req, res) => {
    const html = baseHtml + getNavbar(true) + `
    <form action="/dashboard" method="POST">
    <input type="text" name="name" placeholder="Nombre" required>
    <textarea name="description" placeholder="Descripción" required></textarea>
    <input type="text" name="image" placeholder="Imagen URL" requried>
    <select name="category" required>
    <option value="-">Selecciona una categoria</option>
    <option value="Camisetas">Camisetas</option>
    <option value="Pantalones">Pantalones</option>
    <option value="Zapatos">Zapatos</option>
    <option value="Accesorios">Accesorios</option>
    </select>
    <select name="size" required>
    <option value="-">Selecciona una talla</option>
    <option value="XS">XS</option>
    <option value="S">S</option>
    <option value="M">M</option>
    <option value="L">L</option>
    <option value="XL">XL</option>
    </select>
    <input type="number" name="price" placeholder="Precio" required>
    <button type="submit">Crear Producto</button>
    </form>
    </body></html>`;
    res.send(html);
  }

  const createProduct = async (req, res) => {
    try {
      const {name, description, image, category, size, price} = req.body;
      const product = new Product({name, description, image, category, size, price});
      await product.save();
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }

  };

  const showProductByIdDashboard = async (req, res) => {
    try {
    const product = await Product.findById(req.params.productId);
    if(!product) return res.status(404).send('Producto no encontrado');
    const html = baseHtml + getNavbar(true) + `
    <div class="product-detail">
    <img src="${product.image}" alt"${product.name}">
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <p>${product.price}</p>
    <a href="/dashboard/${product._id}/edit">Editar</a>
    <form action="/dashboard/${product._id}/delete" method="POST">
    <button type="submit">Eliminar</button>
    </form>
    </div>
    </body>
    </html>
    `;
    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
  }

  const showEditProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) return res.status(404).send('Producto no encontrado');
      const html = baseHtml + getNavbar(true) + `
        <form action="/dashboard/${product._id}" method="POST">
          <input type="text" name="name" value="${product.name}" required>
          <textarea name="description" required>${product.description}</textarea>
          <input type="text" name="image" value="${product.image}" required>
          <select name="category" required>
            <option value="Camisetas" ${product.category === 'Camisetas' ? 'selected' : ''}>Camisetas</option>
            <option value="Pantalones" ${product.category === 'Pantalones' ? 'selected' : ''}>Pantalones</option>
            <option value="Zapatos" ${product.category === 'Zapatos' ? 'selected' : ''}>Zapatos</option>
            <option value="Accesorios" ${product.category === 'Accesorios' ? 'selected' : ''}>Accesorios</option>
          </select>
          <select name="size" required>
            <option value="XS" ${product.size === 'XS' ? 'selected' : ''}>XS</option>
            <option value="S" ${product.size === 'S' ? 'selected' : ''}>S</option>
            <option value="M" ${product.size === 'M' ? 'selected' : ''}>M</option>
            <option value="L" ${product.size === 'L' ? 'selected' : ''}>L</option>
            <option value="XL" ${product.size === 'XL' ? 'selected' : ''}>XL</option>
          </select>
          <input type="number" name="price" value="${product.price}" required>
          <button type="submit">Actualizar Producto</button>
        </form>
        </body></html>`;
       res.send(html);
      } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  };
  
  const updateProduct = async (req, res) => {
    try {
        const { name, description, image, category, size, price } = req.body;
        await Product.findByIdAndUpdate(req.params.productId, { name, description, image, category, size, price });
        res.redirect(`/dashboard/${req.params.productId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  };
  
  const deleteProduct = async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.productId);
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  };
  
  module.exports = {
    showProducts,
    showProductById,
    showProductByCategory,
    showDashboard,
    showNewProduct,
    createProduct,
    showProductByIdDashboard,
    showEditProduct,
    updateProduct,
    deleteProduct,
  };


