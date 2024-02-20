const data = {
    title: "User sign Authentication",
    method: "GET Method",
    url: "/api/auth/signin",
    input: {
        email: "string (required)",
        password: "string (required) (min 6 chars)",
        username: "string (required) (unique)",
        confirmPassword: "string (required) (min 6 chars)",
        mobileNumber: "string (required) (unique)",
    },
    output: {
        success: "boolean",
        data: "object (user)",
        message: "string",
    },
};

export default data;
