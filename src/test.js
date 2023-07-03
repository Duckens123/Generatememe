app.post("/generate", (req, res) => {
  axios
    .post(
      "https://api.imgflip.com/caption_image",
      {},
      {
        params: {
          template_id: req.body.template_id,
          username: req.body.username,
          password: req.body.password,
          text0: req.body.text0,
          text1: req.body.text1,
        },
      }
    )
    .then((response) => {
      return res.send(`<img src=${response.data.data.url}>`);
    })
    .catch((e) => {
      return res.status(403).send("403 Client Error");
    });
});
