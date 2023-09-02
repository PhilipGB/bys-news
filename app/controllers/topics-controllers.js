import { selectTopics } from '../models/topics-models.js';

export function getTopics(_req, res) {
  selectTopics().then((topics) => {
    res.status(200).send({ topics: topics });
  });
}
