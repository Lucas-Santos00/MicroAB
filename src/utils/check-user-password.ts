const validatePassword = async (password: string): Promise<{ valid: boolean }> => {
    const minLength = 8;
    const maxLength = 32;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const noLeadingOrTrailingSpaces = password === password.trim();

    const valid =
        password.length >= minLength &&
        password.length <= maxLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        noLeadingOrTrailingSpaces;

    return { valid };
}

export default validatePassword;