import { query } from '../../db/connection.js';

export function selectTopics() {
  return query('SELECT * FROM topics;').then((result) => result.rows);
}
