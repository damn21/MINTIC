app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});