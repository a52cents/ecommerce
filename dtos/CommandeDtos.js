export const CreateCommandeDto = {
    security: [{ token: [] }],
    body: {
        type: "object",
        properties: {
            produits: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "number" }
                    }
                }
            }
        },
        required: ["produits"],
    },
    response: {
        200: {
            type: "object",
            properties: {
                id: { type: "number" },
                id_client: { type: "number" },
                produits: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id_produit: { type: "number" }
                        }
                    }
                }
            }
        }
    }
}

export const listCommandeDto = {
    security: [{ token: [] }],
    response: {
        200: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "number" },
                    id_client: { type: "number" },
                    produits: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id_produit: { type: "number" }
                            }
                        }
                    }
                }
            }
        }
    }
}