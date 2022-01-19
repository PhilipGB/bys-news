exports.invalidURL = (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
};

exports.errorHandlers = (err, req, res, next) => {
  // console.log(err);

  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: `Bad Request` });
  } else if (err.code === "23503") {
    res.status(401).send({ msg: `Invalid username` });
  } else if (err.code === "23502") {
    res.status(405).send({ msg: `Invalid request body` });
  } else {
    res.status(500).send({ msg: "Server error" });
  }
};
