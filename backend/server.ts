import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Dummy data
const products = [
  { id: 1, name: 'Product A', price: 100 },
  { id: 2, name: 'Product B', price: 150 },
  { id: 3, name: 'Product C', price: 200 }
];

// Clothing brands data
const clothingBrands = [
  {
    id: 1,
    name: 'Brand A',
    products: [
      { id: 1, name: 'T-Shirt', price: 20, sizes: ['S', 'M', 'L', 'XL'] },
      { id: 2, name: 'Jeans', price: 40, sizes: ['30', '32', '34', '36'] }
    ]
  },
  {
    id: 2,
    name: 'Brand B',
    products: [
      { id: 3, name: 'Jacket', price: 60, sizes: ['M', 'L', 'XL'] },
      { id: 4, name: 'Sneakers', price: 80, sizes: ['8', '9', '10', '11'] }
    ]
  }
];

// Purchase route
app.post('/purchase', (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json({ message: `Purchased ${quantity} of ${product.name}` });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get a single product
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Get all clothing brands
app.get('/clothing-brands', (req, res) => {
  res.json(clothingBrands);
});

// Get a single clothing brand
app.get('/clothing-brands/:id', (req, res) => {
  const brand = clothingBrands.find(b => b.id === parseInt(req.params.id));
  if (brand) {
    res.json(brand);
  } else {
    res.status(404).json({ message: 'Brand not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 