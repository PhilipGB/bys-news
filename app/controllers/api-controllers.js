export function getApi(_req, res) {
  res.status(200).send(require('../endpoints.json'));
}
