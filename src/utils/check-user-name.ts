type ValidationResult = { valid: boolean; errors: string[] };

/**
 * validateUserName
 * - only letters and spaces (supports Unicode letters)
 * - trimmed (no leading/trailing spaces)
 * - not empty
 * - length between 3 and 12 characters (after trim)
 * - not a reserved word (admin, user, test)
 */

function validateUserName(input: unknown): ValidationResult {
	const errors: string[] = [];

	if (typeof input !== 'string') {
		errors.push('nome deve ser uma string');
		return { valid: false, errors };
	}

	const raw = input;

	// trimmed check
	if (raw.trim() !== raw) errors.push('nome não deve ter espaços no início ou fim');

	const name = raw.trim();

	// empty
	if (name.length === 0) errors.push('nome vazio');

	// length bounds
	if (name.length < 3) errors.push('nome deve ter ao menos 3 caracteres');
	if (name.length > 12) errors.push('nome muito longo (máx 12 caracteres)');

	// only letters and spaces — use Unicode property escape to allow accented letters
	// fallback: if engine doesn't support \p{L}, the regex will throw; using try/catch
	let lettersOnly = false;
	try {
		lettersOnly = /^[\p{L} ]+$/u.test(name);
	} catch (e) {
		// fallback to a conservative ascii + common accents class
		lettersOnly = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(name);
	}
	if (!lettersOnly) errors.push('apenas letras e espaços são permitidos (sem números ou caracteres especiais)');

	// reserved words (compare lowercased, and also check single-word equality)
	const reserved = new Set(['admin', 'user', 'test']);
	if (reserved.has(name.toLowerCase())) errors.push('nome reservado não permitido');

	return { valid: errors.length === 0, errors };
}

export default validateUserName;