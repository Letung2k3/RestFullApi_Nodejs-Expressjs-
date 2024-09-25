import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './routers/web';
import dotenv from 'dotenv';
import connectDB from './configs/connectDB';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 6969;
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Configure view engine (if you have such a configuration) //Config app
configViewEngine(app);
// Initialize routes
initWebRoute(app);
//init ap route
connectDB()

app.listen(port, () => {
     console.log(`Server is listening on port ${port}`);
});
