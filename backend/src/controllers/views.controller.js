import SAMPLE_DATA from "../views/pages/api-docs.js";

const homePage = (req, res) => {
    const data = SAMPLE_DATA;

    res.render("pages/index.ejs", { api: data });
};

export default { homePage };
