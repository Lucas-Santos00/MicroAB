/**
 * Password validation.
 *
 * Summary:
 * - Accepts a password (string) and checks whether it meets the application's basic
 *   security rules.
 * - Current rules applied:
 *   1) minimum length of 8 characters and maximum of 32;
 *   2) at least one uppercase letter (A-Z);
 *   3) at least one lowercase letter (a-z);
 *   4) at least one digit (0-9);
 *   5) no leading or trailing spaces (trim required).
 *
 * Return:
 * - Promise that resolves to an object { valid: boolean } indicating if the password
 *   passed all checks.
 *
 * Notes:
 * - The function is asynchronous for convenience (project pattern); all checks are
 *   synchronous. It can be converted to a synchronous function if desired.
 */
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