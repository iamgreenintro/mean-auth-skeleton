import { App } from './server';

import IndexRoute from './routes/index.route';
import UserRoute from './routes/user.route';
import AuthenticationRoute from './routes/authentication.route';

// Routes we want to be handled by our Express App:
const routes = [new IndexRoute(), new UserRoute(), new AuthenticationRoute()];

const app = new App(routes);

app.listen();
