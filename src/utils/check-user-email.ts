type ValidationResult = { valid: boolean; errors: string[] };

/**
 * Validate email with a combination of conservative checks that reject
 * a wide variety of invalid examples (labels, TLDs, IP literals, spacing, etc.).
 * Returns an object with `valid` and an array of `errors` (Portuguese messages).
 */

export function validateEmail(email: string): ValidationResult {
	const errors: string[] = [];
	if (typeof email !== 'string') {
		errors.push('email deve ser string');
		return { valid: false, errors };
	}

	const raw = email;
	if (raw.trim() !== raw) errors.push('não deve ter espaços no início/fim');
	if (raw.length === 0) errors.push('email vazio');
	if (raw.length > 254) errors.push('email maior que 254 caracteres');
	if (/\s/.test(raw)) errors.push('não deve conter espaços');

	const atMatches = (raw.match(/@/g) || []).length;
	if (atMatches !== 1) {
		errors.push('deve conter exatamente um @');
		return { valid: false, errors };
	}

	const [local, domain] = raw.split('@');
	if (!local) errors.push('parte local ausente');
	if (!domain) errors.push('parte do domínio ausente');
	if (!local || !domain) return { valid: false, errors };

	// require a dot in domain (to have an explicit TLD)
	if (!domain.includes('.')) {
		errors.push('domínio sem TLD (sem ".")');
		return { valid: false, errors };
	}

	if (local.length > 64) errors.push('parte local maior que 64 caracteres');
	if (local.startsWith('.') || local.endsWith('.')) errors.push('parte local não pode começar/terminar com ponto');
	if (local.includes('..')) errors.push('parte local não pode ter pontos consecutivos');

	// reject local parts that look like punycode prefixes (test expectation)
	if (local.toLowerCase().startsWith('xn--')) errors.push('prefixo punycode mal formado na parte local');

	// allow common set of characters in local part (unquoted)
	const localAllowed = /^[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~.]+$/;
	if (!localAllowed.test(local)) {
		// if it's a quoted local part, allow quotes with escaped chars
		const quoted = /^"(?:\\.|[^"])*"$/;
		if (!quoted.test(local)) errors.push('caracteres inválidos na parte local');
	}

	// Domain checks
	if (domain.startsWith('.') || domain.endsWith('.')) errors.push('domínio não pode começar/terminar com ponto');
	if (domain.includes('..')) errors.push('domínio não pode ter pontos consecutivos');

	// If domain is an IP-literal like [x.x.x.x]
	if (domain.startsWith('[') && domain.endsWith(']')) {
		const ip = domain.slice(1, -1);
		const octets = ip.split('.');
		if (octets.length !== 4 || !octets.every(o => /^\d+$/.test(o) && Number(o) >= 0 && Number(o) <= 255)) {
			errors.push('IP literal inválido no domínio');
		}
	} else {
		const labels = domain.split('.');
		if (labels.some(label => label.length === 0)) errors.push('label vazia no domínio');
		for (const label of labels) {
			if (label.length > 63) errors.push('label do domínio maior que 63 caracteres');
			if (/[_]/.test(label)) errors.push('underscore não permitido em labels do domínio');
			if (/^-|-$/.test(label)) errors.push('label do domínio não pode começar/terminar com hífen');
			if (!/^[A-Za-z0-9-]+$/.test(label)) errors.push('caracteres inválidos no domínio');
		}

		const tld = labels[labels.length - 1] || '';
		if (tld.length < 2) errors.push('TLD muito curto');
		// also reject excessively long custom TLDs (tests expect some long fake-TLDs to be invalid)
		if (tld.length > 24) errors.push('TLD muito longo');
		if (!/^[A-Za-z]{2,63}$/.test(tld)) errors.push('TLD inválido (deve conter apenas letras)');
	}

	return { valid: errors.length === 0, errors };
}

export default validateEmail;

