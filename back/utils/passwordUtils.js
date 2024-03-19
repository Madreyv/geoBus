import argon2 from 'argon2';

// Função para criar um hash de senha
export const hashPassword = async (password) => {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (error) {
        throw new Error('Erro ao criar hash de senha');
    }
};

// Função para verificar se uma senha corresponde a um hash
export const verifyPassword = async (password, hashedPassword) => {
    try {
        const passwordMatch = await argon2.verify(hashedPassword, password);
        return passwordMatch;
    } catch (error) {
        throw new Error('Erro ao verificar senha');
    }
};
