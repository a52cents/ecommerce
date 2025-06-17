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
                    utilisateurId: { type: "number" },
                    commandeproduit: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                produitId: { type: "number" },
                                quantite: { type: "number" },
                                produit: {
                                    type: "object",
                                    properties: {
                                        id: { type: "number" },
                                        nom: { type: "string" },
                                        prix: { type: "number" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}