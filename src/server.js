import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './routers/web';
import initApiRoute from './routers/api';
import dotenv from 'dotenv';

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

//init api route
initApiRoute(app)

app.listen(port, () => {
     console.log(`Server is listening on port ${port}`);
});
