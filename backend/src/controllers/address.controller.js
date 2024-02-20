import addressService from "../services/address.service.js";

const getAddress = async (req, res) => {
    const addresses = await addressService.getAddress(req.query);
    res.status(200).json({
        success: true,
        data: addresses,
        message: "Get Address Successfully",
    });
};

const createAddress = async (req, res) => {
    const { id: userId } = req.user;
    const address = await addressService.createAddress(userId, req.body);
    res.status(201).json({
        success: true,
        data: address,
        message: "Create Address Successfully",
    });
};

const getAddressByUserId = async (req, res) => {
    const { id: userId } = req.user;
    const addresses = await addressService.getAddressByUserId(userId);
    res.status(200).json({
        success: true,
        data: addresses,
        message: "Get Address Successfully",
    });
};

const getAddressById = async (req, res) => {
    const { id } = req.params;
    const address = await addressService.getAddressById(id);
    res.status(200).json({
        success: true,
        data: address,
        message: "Get Address Successfully",
    });
};

export default {
    getAddress,
    createAddress,
    getAddressByUserId,
    getAddressById,
};
