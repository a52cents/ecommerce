export const PublicUserDto = {
    type: "object",
    properties: {
        id: { type: "number" },
        mail: { type: "string" },
        role: { type: "string" },
        token: { type: "string" }
    }
}

export const CreateUserDto = {
    body: {
        type: "object",
        required: ["mail", "password"],
        properties: {
            mail: { type: "string" },
            password: { type: "string" },
        },
        required: ["mail", "password"],
    },
    response: {
        200: PublicUserDto
    }
}

export const GetUserDto = {
    params: {
        type: "object",
        properties: {
            id: { type: "number" }
        }
    },
    response: {
        200: PublicUserDto
    }
}

export const GetUserByMailPwdDto = {
    body: {
        type: "object",
        required: ["mail", "password"],
        properties: {
            mail: { type: "string" },
            password: { type: "string" },
        },
        required: ["mail", "password"],
    },
    response: {
        200: {
            type: "object",
            properties: {
                id: { type: "number" },
                mail: { type: "string" },
                role: { type: "string" },
                token: { type: "string" }
            }
        }
    }
}