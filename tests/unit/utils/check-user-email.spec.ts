import { check } from "drizzle-orm/gel-core"
import validateEmail from "../../../src/utils/check-user-email"

const invalidEmail = [
['lucas', 'sem "@" e sem domínio'],
['lucas@', 'sem domínio após "@"'],
['@domain.com', 'sem parte local antes de "@"'],
['lucas@domain', 'sem TLD (ex.: .com)'],
['lucas@domain.', 'domínio termina com ponto'],
['lucas@.com', 'domínio começa com ponto'],
['lucas@@domain.com', 'dois "@"'],
['lucas domain.com', 'espaço sem aspas'],
['lucas@domain..com', 'dois pontos consecutivos no domínio'],
['.lucas@domain.com', 'parte local começa com ponto'],
['lucas.@domain.com', 'parte local termina com ponto'],
['lu..cas@domain.com', 'dois pontos consecutivos na parte local'],
['luca(s)@domain.com', 'caractere inválido "(" na parte local sem escaping'],
['lucas@do_main.com', 'underscore no domínio (inválido em labels DNS)'],
['lucas@-domain.com', 'label do domínio começa com hífen'],
['lucas@domain-.com', 'label do domínio termina com hífen'],
['lucas@do..main.com', 'dois pontos consecutivos no domínio'],
['lucas@domain.c', 'TLD muito curto (dependendo da regra)'],
['lucas@domain.123', 'TLD numérico (geralmente inválido)'],
['"unclosed@quote@domain.com', 'aspas não fechadas na parte local'],
['"wrong"quote@domain.com', 'aspas mal posicionadas na parte local'],
['lucas@domain!.com', 'caractere especial "!" no domínio'],
['lucas@domain,com', 'vírgula no domínio'],
['lucas@domain;com', 'ponto-e-vírgula no domínio'],
['lucás@domain.com', 'caractere com acento sem suporte ASCII (dependendo do parser)'],
['lucas@domínio.com', 'domínio com acento (IDN sem punycode)'],
['lucas@256.256.256.256', 'IP literal inválido (octetos >255)'],
['lucas@[256.256.256.256]', 'IP literal entre colchetes inválido'],
['lucas@192.168.1.1', 'IP sem colchetes (se esperando literal IP, precisa de [])'],
['lucas@.domain.com', 'subdomínio vazio (label iniciando com ponto)'],
['lucas@domain..', 'domínio terminando com ponto duplo'],
['', 'string vazia'],
[' ', 'apenas espaço'],
['\nlucas@domain.com', 'caractere de nova linha'],
['lucas@domain .com', 'espaço entre domínio e TLD'],
['lucas @domain.com', 'espaço antes do "@"'],
['lu cas@domain.com', 'espaço dentro da parte local'],
['"local part"@domain.com', 'parte local com espaço sem escaping correto'],
['"local\@part"@domain.com', 'escaping incorreto nas aspas (possível inválido)'],
['verylonglocalpartthatexceedssixtyfourcharacters_abcdefghijklmnopqrstuvwxyz@domain.com', 'parte local maior que 64 caracteres'],
['lucas@' + 'a'.repeat(64) + '.com', 'label do domínio maior que 63 caracteres (excedido)'],
['a'.repeat(255) + '@domain.com', 'comprimento total do endereço excede 254 caracteres'],
['lucas@do_main..com', 'underscore + pontos consecutivos no domínio'],
['lucas@@domain@com', 'múltiplos "@" espalhados'],
['lucas@- -domain.com', 'hífens e espaços inválidos no domínio'],
['lucas@domain..com ', 'espaço no final com pontos consecutivos'],
[' "lucas"@domain.com', 'aspas com espaço inicial não escapado'],
['lucas@.com', 'domínio apenas com TLD (label vazio antes do .)'],
['lucas@[192.168.1.999]', 'IP literal com octeto inválido'],
['"\\r\n"@domain.com', 'caracteres de controle na parte local'],
['lucas@domain..com', 'duplicado: dois pontos no domínio (exemplo repetido intencionalmente)'],
['lucas@domain.toolongtldthatdoesnotexist', 'TLD muito longo/não existente (pode ser inválido dependendo da validação)'],
['lucas@.localhost', 'label vazio antes de localhost'],
['lucas@localhost.', 'localhost com ponto final errado'],
['xn--lucas@domain.com', 'prefixo punycode mal formado'],
['lucas@sub_domain.domain.com', 'underscore em subdomínio (inválido)'],
['lucas@domain.c_m', 'underscore no TLD (inválido)'],
['"unbalanced"quote@domain.com', 'aspas desbalanceadas na parte local'],
['lucas@-domain-.com', 'label do domínio começa e termina com hífen'],
['lucas@#domain.com', 'caractere # no domínio'],
['lucas@domain..com.', 'ponto extra ao final com pontos consecutivos'],
];

const validEmails = [
    'lucas.santos@gmail.com',
    'ana_silva@outlook.com',
    'marcos.dev@yahoo.com',
    'cliente+vip@empresa.com.br',
    'joao.almeida@protonmail.com',
    'vendas@startup.io',
    'suporte@empresa.tech',
    'rafael.souza@consultoria.co',
    'contato@agencia.digital',
    'camila.mendes@negocios.app',
    'fernando.oliveira@globaldata.ai',
    'time.financeiro@empresa.cloud',
    'isabela.rocha@corporate.dev',
    'gustavo@meuprojeto.org',
    'carla.design@criativa.studio',
    'atendimento@empresa.biz',
    'juliana@produtividade.tools',
    'bruno.marketing@agencia.pro',
    'patricia.hr@empresa.solutions',
    'felipe@servicos.net'
];

describe('Check E-mail validation middleware', () => {

    test.each(invalidEmail)(
        'should fail for invalid email: %s (%s)',
        async (email, reason) => {
            const result = validateEmail(email);
            expect(result.valid).toBe(false);
        }
    );

    test.each(validEmails)(
        'should pass for valid email: %s',
        async (email) => {
            const result = validateEmail(email);
            expect(result.valid).toBe(true);
        }
    );

})