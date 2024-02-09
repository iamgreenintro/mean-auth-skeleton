import { App } from './server';

import IndexRoute from './routes/index.route';
import UserRoute from './routes/user.route';
// import AuthRoute from './routes/auth.route';

// Routes we want to be handled by our App:
const routes = [new IndexRoute(), new UserRoute()];

const app = new App(routes);

app.listen();
