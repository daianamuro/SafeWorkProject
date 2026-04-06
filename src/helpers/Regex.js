export const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
};

export const validate = (type, value) => {
    if (!patterns[type]) return false;
    return patterns[type].test(value);
};