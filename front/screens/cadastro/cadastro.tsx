import React, { useState } from 'react';
import { ButtonCancelar, ButtonConfirmar, ButtonContainer, ButtonText, ButtonTextCancelar, Container, Input } from './cadastro.style';

const CadastroScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    // Aqui você pode adicionar a lógica para enviar os dados de cadastro para o backend
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Senha:', senha);
  };

  return (
    <Container>
      <Input
        placeholder="Nome"
        onChangeText={setNome}
        value={nome}
      />
      <Input
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <Input
        placeholder="Senha"
        onChangeText={setSenha}
        value={senha}
        secureTextEntry={true} // Para esconder os caracteres da senha
      />

      <Input
        placeholder="Confirme a senha"
        onChangeText={setSenha}
        value={senha}
        secureTextEntry={true} // Para esconder os caracteres da senha
      />

      <ButtonContainer>
        <ButtonConfirmar onPress={handleCadastro}>
            <ButtonText>Confirmar</ButtonText>
        </ButtonConfirmar>
        <ButtonCancelar onPress={() => {}}>
            <ButtonTextCancelar>Cancelar</ButtonTextCancelar>
        </ButtonCancelar>
      </ButtonContainer>
    </Container>
  );
};


export default CadastroScreen;
