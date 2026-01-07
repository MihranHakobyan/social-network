import express from 'express';
import { sequelize } from './config/db/db_configs.js';
import dotenv from 'dotenv';
import { authRoute } from './src/auth/authRoute.js';
import { accountRoute } from './src/account/accountRoute.js';
import { postRoute } from './src/post/postRoule.js';
import errorMiddleware from './libs/errorMiddleware.js';

dotenv.config();

const app = express();
const { PORT } = process.env || 3060;

app.use(express.json());
app.use(express.urlencoded());
app.use('/auth', authRoute);
app.use('/account', accountRoute);
app.use('/posts',postRoute)
app.use(errorMiddleware);

sequelize.sync({alter:true}).then(() => {
    console.log("database connected");
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));