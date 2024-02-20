import employeeService from "../services/employee.service.js";
import auditService from "../services/audit.service.js";
import { SERVICES, ACTIONS, ENTITY_TYPE } from "../constants/ServiceAction.js";

const addEmployee = async (req, res) => {
    const { id: userId, permissionType } = req.user;
    const employee = await employeeService.addEmployee(req.body);

    if (!employee) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Employee not created. Something went wrong.",
        });
    }

    await auditService.addAudit2(
        employee._id,
        ENTITY_TYPE.ADMIN,
        userId,
        permissionType,
        SERVICES.ADMIN_SERVICE,
        ACTIONS.CREATED,
        `Employee named ${employee.firstName} ${employee.lastName}  with email ${employee.email} added as ${employee.jobPosition}.`
    );

    res.status(201).json({
        success: true,
        data: employee,
        message: "Admin created successfully",
    });
};

const getEmployeeList = async (req, res) => {
    const employees = await employeeService.getEmployeeList();
    res.status(200).json({
        success: true,
        data: employees,
        message: "Employees list fetched successfully.",
    });
};

const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeDetails(id);
    res.status(200).res.status(200).json({
        success: true,
        data: employee,
        message: "Employees list fetched successfully.",
    });
};

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { id: userId, permissionType } = req.user;
    const employee = await employeeService.updateEmployee(id, req.body);

    if (!employee) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Employee not updated. Something went wrong.",
        });
    }

    await auditService.addAudit2(
        employee._id,
        ENTITY_TYPE.ADMIN,
        userId,
        permissionType,
        SERVICES.ADMIN_SERVICE,
        ACTIONS.UPDATED,
        `Employee named ${employee.firstName} ${employee.lastName}  with email ${employee.email} updated successfully.`
    );

    res.status(200).json({
        success: true,
        data: employee,
        message: "Employee updated successfully",
    });
};

export default {
    getEmployeeList,
    getEmployeeById,
    addEmployee,
    updateEmployee,
};
