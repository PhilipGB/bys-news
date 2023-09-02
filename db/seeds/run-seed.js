import devData from '../data/development-data/index.js';
import seed from './seed.js';
import { end } from '../connection.js';

const runSeed = () => {
  return seed(devData).then(() => end());
};

runSeed();
