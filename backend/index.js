const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const users = require("./users");
let categories = require("./categories");
let subcategories = require("./subcategories");
let products = require("./products");



const app = express();
app.use(cors());


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


const JWT_SECRET = "digitalflake_secret";

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});


/* GET all categories */
app.get("/categories", (req, res) => {
  res.json(categories);
});

/* ADD category */
app.post("/categories", (req, res) => {
  const { name, image, status } = req.body;

  const newCategory = {
    id: Date.now(),
    name,
    image,
    status,
  };

  categories.push(newCategory);
  res.json(newCategory);
});

/* DELETE category */
app.delete("/categories/:id", (req, res) => {
  const id = Number(req.params.id);
  categories = categories.filter((c) => c.id !== id);
  res.json({ success: true });
});


/* UPDATE category */
app.put("/categories/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, image, status } = req.body;

  const category = categories.find((c) => c.id === id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  category.name = name;
  category.image = image;
  category.status = status;

  res.json(category);
});


app.get("/subcategories", (req, res) => {
  res.json(subcategories);
});

app.post("/subcategories", (req, res) => {
  const { name, categoryId, categoryName, status } = req.body;

  const newSubcategory = {
    id: Date.now(),
    name,
    categoryId,
    categoryName,
    status,
  };

  subcategories.push(newSubcategory);
  res.json(newSubcategory);
});


app.put("/subcategories/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, categoryId, categoryName, status } = req.body;

  const sub = subcategories.find((s) => s.id === id);
  if (!sub) {
    return res.status(404).json({ message: "Subcategory not found" });
  }

  sub.name = name;
  sub.categoryId = categoryId;
  sub.categoryName = categoryName;
  sub.status = status;

  res.json(sub);
});

app.delete("/subcategories/:id", (req, res) => {
  const id = Number(req.params.id);
  subcategories = subcategories.filter((s) => s.id !== id);
  res.json({ success: true });
});


app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const {
    name,
    categoryId,
    categoryName,
    subcategoryId,
    subcategoryName,
    price,
    status,
  } = req.body;

  const newProduct = {
    id: Date.now(),
    name,
    categoryId,
    categoryName,
    subcategoryId,
    subcategoryName,
    price,
    status,
  };

  products.push(newProduct);
  res.json(newProduct);
});


app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  Object.assign(product, req.body);
  res.json(product);
});


app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.json({ success: true });
});







const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

