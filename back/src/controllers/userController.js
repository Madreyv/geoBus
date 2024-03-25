import User from '../models/user.js';
import { hashPassword, verifyPassword } from '../utils/passwordUtils.js';
import jwt from 'jsonwebtoken';

// Função para registrar um novo usuário
export const cadastrarUsuario = async (req, res) => {
    console.log('cadastro de usuario', req.body)
    try {
        const { nome, email, senha, tipo } = req.body;

        // Hash da senha
        const hashedPassword = await hashPassword(senha);

        // Cria um novo usuário no banco de dados
        const newUser = new User({
        name:nome,
        email,
        password: hashedPassword,
        tipo,
        });
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso',user: newUser });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
};

// Função para fazer login
export const logarUsuario = async (req, res) => {
    console.log('req', req.body)
    const{email, senha} = req.body;

  // Verificar se o usuário existe no banco de dados
  const user = await User.findOne({ where: {email: email} });
//   const user = await User.findOne({ where: { email: email } });
    console.log('user', user)
  if (!user) {
    return res.status(401).json({ error: 'Usuário não encontrado' });
  }

  try {
    // Verificar se a senha está correta
    const senhaCorreta = await verifyPassword(senha, user.password)
    if (senhaCorreta) {
      // Gerar token de autenticação
      const token = jwt.sign({ userId: user._id }, 'seu_segredo');
        const response = {
            name: user.dataValues.name,
            email:user.dataValues.email,
            token: token
        }
      return res.json({ response });
    } else {
      // Senha incorreta
      return res.status(401).json({ error: 'Senha incorreta' });
    }
  } catch (error) {
    console.error('Erro ao verificar a senha:', error);
    return res.status(500).json({ error: 'Erro interno do servidor no endpoint de login' });
  }
};
