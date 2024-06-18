const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/auth');
const productRouter = require('./routers/productRouter');
const connectDB = require('./database');
const port = 5000;

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});