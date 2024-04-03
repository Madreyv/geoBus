import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { ButtonCancelar, ButtonConfirmacao, ButtonContainer, ButtonText, ButtonTextCancelar, Container, Pergunta } from './Popup.style';

interface IPopupProps {
    visible: boolean;
    onClose: Function;
    onEmbarqueConfirmado:Function;
}


const Popup = ({ visible, onClose, onEmbarqueConfirmado }: IPopupProps) => {
    const [viagemConfirmada, setViagemConfirmada] = useState(false);
    useEffect(() => {
        setViagemConfirmada(false)
    },[visible])

    const handleEmbarqueConfirmado = (confirmacao:boolean) => {
        setViagemConfirmada(confirmacao);
        if(confirmacao == false){
            onEmbarqueConfirmado(confirmacao)
        }
    };

    const handleEnviarMensagem = (enviar :boolean) =>{
        onEmbarqueConfirmado(enviar);
    }

  return (
    <Modal isVisible={visible}>
      <Container >
        {!viagemConfirmada && (
            <>
                <Pergunta>Embarcou no veículo?</Pergunta>
                <ButtonContainer>
                    <ButtonConfirmacao onPress={() => handleEmbarqueConfirmado(true)}>
                        <ButtonText >Sim</ButtonText>
                    </ButtonConfirmacao>
                    <ButtonCancelar onPress={() => handleEmbarqueConfirmado(false)}>
                        <ButtonTextCancelar>Não</ButtonTextCancelar>
                    </ButtonCancelar>
                </ButtonContainer>
            </>
        )

        }
        {viagemConfirmada && (
          <>
            <Pergunta>Compartilhar como está sendo a viagem?</Pergunta>
            <ButtonContainer>
                <ButtonConfirmacao onPress={() => handleEnviarMensagem(true)}>
                    <ButtonText>Sim</ButtonText>
                </ButtonConfirmacao>
                <ButtonCancelar onPress={() => handleEnviarMensagem(false)}>
                    <ButtonTextCancelar>Não</ButtonTextCancelar>
                </ButtonCancelar>
            </ButtonContainer>
          </>
        )}
      </Container>
    </Modal>
  );
};

export default Popup;
