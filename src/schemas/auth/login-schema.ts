const loginJsonSchema = {
    body: {
        type: 'object',
        properties: {
            email: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['email', 'password'],
        additionalProperties: false,
    }
}

export default loginJsonSchema;