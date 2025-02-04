export const schemas = {
    Account: {
        type: "object",
        properties: {
            uuid: {
                type: "string",
                description: "uuid auto-generated used to identification",
                example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
            },
            fullname: {
                type: "string",
                description: "Person name",
                example: "Arthur Almeida"
            },
            email: {
                type: "string",
                description: "Email related to account",
                example: "example@test.com"
            },
            password: {
                type: "string",
                description: "Password used to access account",
                example: "PASSword#123"
            }
        }
    }
}