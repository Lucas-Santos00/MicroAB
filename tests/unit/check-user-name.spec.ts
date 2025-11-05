import validateUserName from "../../src/utils/check-user-name";

const invalidUserNames: Array<[string, string]> = [
    ['', 'string vazia'],
    [' ', 'apenas um espaço'],
    ['   ', 'apenas espaços (vazio após trim)'],
    ['ab', 'menos de 3 caracteres'],
    ['thisnameistoolong', 'mais de 12 caracteres'],
    [' João', 'espaço no início (não trimmed)'],
    ['João ', 'espaço no final (não trimmed)'],
    [' john doe', 'leading space com múltiplas palavras'],
    ['john3', 'contém número'],
    ['3john', 'começa com número'],
    ['jo4hn', 'número embutido'],
    ['john_doe', 'underscore (caractere especial não permitido)'],
    ['john-doe', 'hífen (caractere especial não permitido)'],
    ['john.doe', 'ponto (caractere especial não permitido)'],
    ['jo!hn', 'exclamação (caractere especial não permitido)'],
    ['jo@hn', 'arroba (caractere especial não permitido)'],
    ['jo#hn', 'cerquilha (caractere especial não permitido)'],
    ['(john)', 'parênteses (caractere especial não permitido)'],
    ['john/ny', 'barra (caractere especial não permitido)'],
    ['john\\ny', 'barra invertida (caractere especial não permitido)'],
    ['john\n', 'contém nova linha'],
    ['\tjohn', 'contém tabulação'],
    ['\rjohn', 'caractere de controle CR'],
    ['😀', 'emoji (não permitido)'],
    ['name😊', 'emoji combinado com texto'],
    ['***', 'apenas caracteres especiais'],
    ['12345', 'apenas números'],
    ['   ab   ', 'após trim fica curto (<3)'],
    ['admin', 'palavra reservada (admin)'],
    ['user', 'palavra reservada (user)'],
    ['test', 'palavra reservada (test)'],
    ['AdMiN', 'palavra reservada case-insensitive'],
    ['verylong name', 'contém espaço mas comprimento total >12'],
    ['José da Silva Neto', 'nome com espaços mas comprimento >12'],
    ['N4meWithMix', 'contém letra e número (inválido)'],
    ['name%name', 'caractere % (especial não permitido)'],
    ['name,name', 'vírgula no nome (caractere especial não permitido)'],
    ['.nome', 'começa com ponto (caractere especial)'],
    ['nome.', 'termina com ponto (caractere especial)'],
    ['-nome', 'começa com hífen'],
    ['nome-', 'termina com hífen'],
];

const validUserNames: Array<[string, string]> = [
    ['Ana Paula', 'composto com espaço (9 chars)'],
    ['João Pedro', 'composto com espaço e acento (10 chars)'],
    ['Maria Lu', 'composto curto (8 chars)'],
    ['Lia Mara', 'composto curto (8 chars)'],
    ['Rui Silva', 'composto com sobrenome curto (9 chars)'],
    ['Nina Rosa', 'composto com espaço (9 chars)'],
    ['Ana Maria', 'nome composto comum (9 chars)'],
    ['João de Sá', 'composto com preposição e acento (10 chars)'],
    ['Paulo Jr', 'sufixo Jr sem ponto (8 chars)'],
    ['Ana Lu', 'composto muito curto (6 chars)'],
    ['João Luiz', 'dois nomes (9 chars)'],
    ['Érica L', 'nome com acento + inicial (6-7 chars)'],
    ['Léo Max', 'nome curto com acento (7 chars)'],
    ['Mia Rose', 'composto curto (8 chars)'],
    ['Luna Sol', 'composto curto (8 chars)'],
    ['Noa Lee', 'composto curto (7 chars)'],
    ['Cleo', 'nome curto (4 chars)'],
    ['Rita Ana', 'composto com espaço (7 chars)'],
    ['Bia', 'nome mínimo válido (3 chars)'],
    ['Dona Luz', 'composto com título informal (8 chars)'],
    ['Ana de Sá', 'composto com preposição (8 chars)'],
    ['Joao', 'sem acento (4 chars)'],
    ['Ivo Rei', 'composto curto (7 chars)'],
    ['Sofia', 'nome comum (5 chars)'],
    ['Clara', 'nome comum (5 chars)'],
    ['André', 'com acento (5 chars)'],
    ['Óscar', 'com acento (5 chars)'],
    ['Lívia', 'com acento (5 chars)'],
    ['Joana', 'nome comum (5 chars)'],
    ['Maya', 'nome curto (4 chars)'],
    ['Nora', 'nome curto (4 chars)'],
    ['Vera', 'nome curto (4 chars)'],
    ['Tânia', 'com acento (5 chars)'],
    ['Nina Sol', 'composto com espaço (8 chars)'],
    ['Dani', 'nome curto (4 chars)'],
    ['Lia', 'nome mínimo alternativo (3 chars)'],
];

describe('validateUserName - invalid cases', () => {

    test.each(invalidUserNames)(
        'should fail to in each passed user name: "%s" (%s)',
        (name, reason) => {
            const result = validateUserName(name);
            expect(result.valid).toBe(false);
        }
    );

    test.each(validUserNames)(
        'should be true for a correct name: "%s" (%s)',
        (name, reason) => {
            const result = validateUserName(name);
            expect(result.valid).toBe(true);
        }
    );

});