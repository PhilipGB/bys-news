const app = require("./app");

const { PORT = 9090 } = process.env;

app.listen(PORT, () => {
  console.log("Northcoders News API");
  console.log(`Listening on port ${PORT}...`);
});
