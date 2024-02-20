import Admin from "../models/admin.model.js";
import AppError from "../utils/AppError.js";

const addEmployee = async (data) => {
    let isAlreadyAdminExist = null;
    isAlreadyAdminExist = await Admin.findOne({
        mobileNumber: data.mobileNumber,
    });
    if (isAlreadyAdminExist)
        throw new AppError("Admin with mobile Number already exists", 400);
    isAlreadyAdminExist = await Admin.findOne({ email: data.email });
    if (isAlreadyAdminExist)
        throw new AppError("Admin with email already exists", 400);

    const newAdmin = Admin(data);
    const admin = await newAdmin.save();
    delete admin._doc.password;
    return admin._doc;
};

const getEmployeeList = async () => {
    const employees = Admin.find().select("-password");
    if (!employees) {
        throw new AppError("No employees found", 404);
    }
    return employees;
};

const getEmployeeDetails = async (id) => {
    const employee = await Admin.findById(id).select("-password");
    if (!employee) {
        throw new AppError("employee not found", 404);
    }
    return employee;
};

const updateEmployee = async (id, data) => {
    let isAlreadyAdminExist = null;
    isAlreadyAdminExist = await Admin.findOne({
        mobileNumber: data.mobileNumber,
    });
    if (isAlreadyAdminExist && isAlreadyAdminExist._id.toString() !== id)
        throw new AppError("Admin with mobile Number already exists", 400);
    if (data.email) {
        if (isAlreadyAdminExist && isAlreadyAdminExist.email !== data.email)
            throw new AppError("Email cannot change.", 400);
    }
    // eslint-disable-next-line no-unused-vars
    const { email: _removeEmail, ...rest } = data;

    const updatedEmployee = await Admin.findByIdAndUpdate(
        id,
        {
            ...rest,
        },
        {
            new: true,
            runValidators: true,
        }
    ).select("-password");
    if (!updatedEmployee) {
        throw new AppError("employee not created", 404);
    }
    return updatedEmployee;
};

export default {
    getEmployeeList,
    getEmployeeDetails,
    addEmployee,
    updateEmployee,
};
