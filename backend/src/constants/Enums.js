export const UserActionEnum = [
    "ADD_TO_CART",
    "REMOVE_FROM_CART",
    "INCREASE_QUANTITY",
    "DECREASE_QUANTITY",
    "CLEAR_CART",
    "ADD_TO_WISHLIST",
    "REMOVE_FROM_WISHLIST",
    "CLEAR_WISHLIST",
];
export const AuditActionEnum = ["CREATED", "UPDATED", "DELETED", "READ"];

export const ProductTypeEnum = [
    "BOOK",
    "CLOTH",
    "FMCG",
    "ALL",
    "PRODUCT",
    "CAROUSEL",
];

export const RelatedToTypeEnum = [
    "BOOK",
    "CLOTH",
    "FMCG",
    "ALL",
    "PRODUCT",
    "CAROUSEL",
    "ROOM",
];

export const BookTagsEnum = [
    "FICTION",
    "NON_FICTION",
    "HISTORY",
    "SCIENCE",
    "TECHNOLOGY",
    "MATH",
    "PHYSICS",
    "CHEMISTRY",
    "BIOLOGY",
    "COMPUTER_SCIENCE",
    "PROGRAMMING",
    "ARTIFICIAL_INTELLIGENCE",
    "MACHINE_LEARNING",
    "DEEP_LEARNING",
];

export const FileTypeEnum = [
    "IMAGE",
    "VIDEO",
    "AUDIO",
    "DOCUMENT",
    "SPREADSHEET",
    "PRESENTATION",
    "PDF",
    "TEXT",
    "ARCHIVE",
    "CODE",
    "EXCEL",
    "SYSTEM",
];

export const PermissionEnum = {
    DASHBOARD_VIEW: "DASHBOARD_VIEW",
    IMAGE_VIEW: "IMAGE_VIEW",
    IMAGE_UPLOAD: "IMAGE_UPLOAD",
    IMAGE_UPDATE: "IMAGE_UPDATE",
    IMAGE_DELETE: "IMAGE_DELETE",
    FILE_UPLOAD: "FILE_UPLOAD",
    FILE_UPDATE: "FILE_UPDATE",
    FILE_DELETE: "FILE_DELETE",
    CART_VIEW: "CART_VIEW",
    WISHLIST_VIEW: "WISHLIST_VIEW",
    REVIEW_VIEW: "REVIEW_VIEW",
    REVIEW_DELETE: "REVIEW_DELETE",
    PRODUCT_VIEW: "PRODUCT_VIEW",
    PRODUCT_CREATE: "PRODUCT_CREATE",
    PRODUCT_UPDATE: "PRODUCT_UPDATE",
    PRODUCT_DELETE: "PRODUCT_DELETE",
    USER_VIEW: "USER_VIEW",
    USER_EDIT: "USER_EDIT",
    ADMIN_VIEW: "ADMIN_VIEW",
    ADMIN_ADD: "ADMIN_ADD",
    ADMIN_DELETE: "ADMIN_DELETE",
    ADMIN_PERMISSION: "ADMIN_PERMISSION",
    ADMIN_APPROVE: "ADMIN_APPROVE",
    ORDER_VIEW: "ORDER_VIEW",
    ORDER_EDIT: "ORDER_EDIT",
    ORDER_DELETE: "ORDER_DELETE",
    ORDER_CREATE: "ORDER_CREATE",
};

// make array of above PermissionEnum
export const PermissionArray = Object.keys(PermissionEnum).map(
    (key) => PermissionEnum[key]
);

export const UserStatusEnum = ["APPROVAL_PENDING", "ACTIVE", "INACTIVE"];

export const FEATURED_IN = [
    "BEST_SELLER",
    "NEW_RELEASE",
    "TOP_RATED",
    "RECOMMENDED",
    "TRENDING",
    "MOST_POPULAR",
    "EDITOR_CHOICE",
    "FEATURED",
    "ON_SALE",
    "TOP_SELLER",
    "UP_COMING_EXAMS",
    "NORMAL",
];
