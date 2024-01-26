import { SERVER_PORT } from '../config';
import { initDb } from '../db/sequelize';
import { app } from './express';

initDb();

app.listen(SERVER_PORT, () => {
  console.log(`API listening on port ${SERVER_PORT}`);
});
