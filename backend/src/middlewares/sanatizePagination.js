import PAGINATION from "../constants/Pagination.js";

const sanatizePagination = (req, res, next) => {
    const { limit, pageIndex } = req.query;
    const pagination = {
        limit: limit ? Number(limit) : PAGINATION.LIMIT,
        pageIndex: pageIndex ? Number(pageIndex) : PAGINATION.PAGE_INDEX,
    };
    req.pagination = pagination;
    next();
};

export default sanatizePagination;
