import bcrypt from 'bcrypt';

// Função para criar um hash de senha
export const hashPassword = async (password) => {
    try {
        // const hashedPassword = await argon2.hash(password);
        // const saltRounds = 10; // Número de rounds de hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log("error", error)
        throw new Error('Erro ao criar hash de senha');
    }
};

// Função para verificar se uma senha corresponde a um hash
export const verifyPassword = async (password, hashedPassword) => {
    try {
        const passwordMatch = await bcrypt.compare(password,hashedPassword);
        return passwordMatch;
    } catch (error) {
        console.log('error', error)
        throw new Error('Erro ao verificar senha');
    }
};
