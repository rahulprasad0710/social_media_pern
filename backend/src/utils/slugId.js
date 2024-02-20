import slugify from "slugify";

// Function to create a slug from a name

export const slugName = (name) => {
    const slug = slugify(name, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: true,
        trim: true,
    });
    return slug;
};

export default { slugName };
