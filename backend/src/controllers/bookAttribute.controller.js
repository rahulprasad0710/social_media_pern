import BookAttributeService from "../services/bookAttribute.service.js";

const getBookAttributes = async (req, res) => {
    const bookAttributes = await BookAttributeService.getBookAttributes();
    res.status(200).json({
        success: true,
        data: bookAttributes,
        message: "Book Attributes fetched successfully",
    });
    if (!bookAttributes) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Book Attributes not fetched",
        });
    }
};
// category
const addBookCategory = async (req, res) => {
    const bookCategory = await BookAttributeService.addBookCategory(req.body);
    res.status(201).json({
        success: true,
        data: bookCategory,
        message: "Book Category created successfully",
    });
    if (!bookCategory) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Book Category not created",
        });
    }
};

const getBookCategory = async (req, res) => {
    const bookCategory = await BookAttributeService.getBookCategory();
    res.status(200).json({
        success: true,
        data: bookCategory,
        message: "Book Category fetched successfully",
    });
    if (!bookCategory) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Book Category not fetched",
        });
    }
};

const updateBookCategory = async (req, res) => {
    const { id } = req.params;
    const bookCategory = await BookAttributeService.updateBookCategory(
        id,
        req.body
    );
    if (!bookCategory) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Book Category not updated",
        });
    }
    res.status(200).json({
        success: true,
        data: bookCategory,
        message: "Book Category updated successfully",
    });
};

// Book Tags

const addBookTag = async (req, res) => {
    const bookTag = await BookAttributeService.addBookTag(req.body);
    if (!bookTag) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Book Tag not created",
        });
    }
    res.status(201).json({
        success: true,
        data: bookTag,
        message: "Book Tag created successfully",
    });
};

const updateBookTag = async (req, res) => {
    const { id } = req.params;
    const bookTag = await BookAttributeService.updateBookTag(id, req.body);
    if (!bookTag) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Book Tag not updated",
        });
    }
    res.status(200).json({
        success: true,
        data: bookTag,
        message: "Book Tag updated successfully",
    });
};

// Publisher

const addPublisher = async (req, res) => {
    const publisher = await BookAttributeService.addPublisher(req.body);
    if (!publisher) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Publisher not created",
        });
    }
    res.status(201).json({
        success: true,
        data: publisher,
        message: "Publisher created successfully",
    });
};

const updatePublisher = async (req, res) => {
    const { id } = req.params;
    const publisher = await BookAttributeService.updatePublisher(id, req.body);
    if (!publisher) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Publisher not updated",
        });
    }
    res.status(200).json({
        success: true,
        data: publisher,
        message: "Publisher updated successfully",
    });
};

// Author

// const getBookAuthor = async (req, res) => {
//     const bookAuthor = await BookAttributeService.getBookAuthor();
//     res.status(200).json({
//         success: true,
//         data: bookAuthor,
//         message: "Book Author fetched successfully",
//     });
//     if (!bookAuthor) {
//         res.status(400).json({
//             success: false,
//             data: null,
//             message: "Book Author not fetched",
//         });
//     }
// };

const addAuthor = async (req, res) => {
    const author = await BookAttributeService.addAuthor(req.body);
    res.status(201).json({
        success: true,
        data: author,
        message: "Author created successfully",
    });
    if (!author) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Author not created",
        });
    }
};

const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const author = await BookAttributeService.updateAuthor(id, req.body);
    res.status(200).json({
        success: true,
        data: author,
        message: "Author updated successfully",
    });
    if (!author) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Author not updated",
        });
    }
};

// Course

const addCourse = async (req, res) => {
    const course = await BookAttributeService.addCourse(req.body);
    res.status(201).json({
        success: true,
        data: course,
        message: "Course created successfully",
    });
    if (!course) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Course not created",
        });
    }
};

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const course = await BookAttributeService.updateCourse(id, req.body);
    res.status(200).json({
        success: true,
        data: course,
        message: "Course updated successfully",
    });
    if (!course) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Course not updated",
        });
    }
};

export default {
    getBookAttributes,
    getBookCategory,
    addBookCategory,
    addBookTag,
    addAuthor,
    addPublisher,
    addCourse,
    updateBookCategory,
    updateBookTag,
    updateAuthor,
    updatePublisher,
    updateCourse,
};
