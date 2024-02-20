import AddressModel from "../models/address.model.js";
import UserModel from "../models/User.model.js";
import AppError from "../utils/AppError.js";

const getAddress = async ({ fullName, mobileNumber, district, ward }) => {
    const filter = {};
    if (fullName) filter.fullName = fullName;
    if (mobileNumber) filter.mobileNumber = mobileNumber;
    if (district) filter.district = district;
    if (ward) filter.ward = ward;

    const addresses = await AddressModel.find(filter);
    return addresses;
};

const createAddress = async (userId, address) => {
    const newAddress = new AddressModel({
        ...address,
    });
    const result = await newAddress.save();

    if (!result) throw new AppError("Address not created", 400);

    const user = await UserModel.findByIdAndUpdate(userId, {
        $push: {
            addresses: result._id,
        },
    });

    if (!user) throw new AppError("User not found", 404);

    return result;
};

const getAddressByUserId = async (userId) => {
    const user = await UserModel.findById(userId).populate("addresses");
    if (!user) throw new AppError("User not found", 404);
    return user.addresses;
};

const getAddressById = async (addressId) => {
    const address = await AddressModel.findById(addressId);
    if (!address) throw new AppError("Something Went Wrong.", 404);
    return address;
};

export default {
    getAddress,
    createAddress,
    getAddressByUserId,
    getAddressById,
};
