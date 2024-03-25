import User from './models/user.js';
import { hashPassword } from './utils/passwordUtils.js';

export async function registerUser(username, email, password) {
    try {
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        return { success: true, message: 'Usuário registrado com sucesso' };
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return { success: false, message: 'Erro ao registrar usuário' };
    }
}

export async function loginUser(email, password) {
    // Implementação da função de login
}
