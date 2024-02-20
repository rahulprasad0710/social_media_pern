import auditService from "../services/audit.service.js";

const getAll = async (req, res) => {
    const {
        userId,
        serviceName,
        permissionType,
        action,
        fromDate,
        toDate,
        entityType,
        limit,
        pageIndex,
    } = req.query;
    const { data, pagination } = await auditService.getAll(
        userId,
        serviceName,
        permissionType,
        action,
        fromDate,
        toDate,
        entityType,
        limit,
        pageIndex
    );
    res.status(200).json({
        sucess: true,
        data,
        pagination,
        message: "Get all audits successfully",
    });
};

const getAuditById = async (req, res) => {
    const { id } = req.params;
    const audit = await auditService.getAuditById(id);
    res.status(200).json({
        sucess: true,
        data: audit,
        message: "Get audit by id successfully",
    });
};

export default { getAll, getAuditById };
