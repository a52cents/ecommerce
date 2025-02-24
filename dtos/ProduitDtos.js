const ExistingProductDto = {
    type: "object",
    properties: {
        id: { type: "number" },
        nom: { type: "string" },
        prix: { type: "number" }
    }
}

export const CreateProductDto = {
    security: [{ token: [] }],
    body: {
        type: "object",
        properties: {
            nom: { type: "string" },
            prix: { type: "number" }
        },
        required: ["nom", "prix"],
    },
    response: {
        200: ExistingProductDto
    }
}

export const GetProductDto = {
    params: {
        type: "object",
        properties: {
            id: { type: "number" }
        }
    },
    response: {
        200: ExistingProductDto
    }
}

export const GetProductsDto = {
        response: {
            200: {
                type: "array",
                items: ExistingProductDto
            }
        }
}

export const EditProductDto = {
    params: {
        type: "object",
        properties: {
            id: { type: "number" }
        }
    },
    body: {
        type: "object",
        properties: {
            nom: { type: "string" },
            prix: { type: "number" }
        },
    },
    response: {
        200: ExistingProductDto
    }
}

export const DeleteProductDto = {
    security: [{ token: [] }],
    params: {
        type: "object",
        properties: {
            id: { type: "number" }
        }
    },
    response: {
        200: ExistingProductDto
    }
}