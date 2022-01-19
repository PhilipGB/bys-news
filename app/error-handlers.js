exports.invalidURL = (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
};

exports.errorHandlers = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: `Bad Request` });
  } else {
    res.status(500).send({ msg: "Server error" });
  }
};
