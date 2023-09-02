import { listen } from './app';

const { PORT = 9090 } = process.env;

listen(PORT, () => {
  console.log('BYS News API');
  console.log(`Listening on port ${PORT}...`);
});
