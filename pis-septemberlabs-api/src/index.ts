import app from './App/app';
import config from './config/config';
import { sequelize } from './config/db';

const PORT = config.PORT;

(async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log('CONNECTION ESTABLISHED SUCCESSFULLY');
    })
    .catch((err) => {
      console.log(err);
      console.log('CONNECTION REFUSED');
    });
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
})();
