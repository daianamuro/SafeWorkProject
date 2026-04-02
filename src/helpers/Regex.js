class Validate {
    static patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  // ejemplo simple
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ // min 8, 1 may, 1 min, 1 número
    };

    static validate(type, value) {
        if (!this.patterns[type]) return false;
        return this.patterns[type].test(value);
    }
}

export default Validate;