import validatePassword from '../../src/utils/check-user-password';

const invalidPasswords = [
    ['short1', 'menos de 8 caracteres'],
    ['thispasswordiswaytoolongtobevalid123', 'mais de 32 caracteres'],
    ['nouppercase1', 'sem letras maiúsculas'],
    ['NOLOWERCASE1', 'sem letras minúsculas'],
    ['NoNumbersHere', 'sem números'],
    ['     leadingSpace1', 'espaço no início'],
    ['trailingSpace1     ', 'espaço no fim'],
    ['     ', 'apenas espaços'],
    ['', 'string vazia'],
    ['onlyletters', 'apenas letras, sem números'],
    ['12345678', 'apenas números, sem letras'],
]

describe('Validação de Senha de Usuário', () => {
    
    test.each(invalidPasswords)(
        'deve falhar para senha inválida: %s (%s)',
        async (password, reason) => {
            const result = await validatePassword(password);
            expect(result.valid).toBe(false);
        }
    );

    it('deve passar para senhas válida', async () => {
        const result = await validatePassword('ValidPass123');
        expect(result.valid).toBe(true)
    })

});