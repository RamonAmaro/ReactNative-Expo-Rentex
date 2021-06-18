import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as yup from "yup";
import { BackButton } from "../../../components";
import { Button } from "../../../components/Button";
import { ImageIndex } from "../../../components/ImageIndex";
import { Input } from "../../../components/Input";
import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  Subtitle,
  Title
} from "./styles";

export const FirstStep: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = yup.object().shape({
        name: yup.string().required("Nome obrigatorio"),
        email: yup
          .string()
          .required("Email obrigatorio")
          .email("Email inválido!"),
        document: yup.string().required("CNH obrigatorio"),
      });

      const data = { name, email, document };

      await schema.validate(data);

      navigation.navigate("SignUpSecondStep", { user: data });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        Alert.alert("Opa", err.message);
      } else {
        Alert.alert("Opa", err.message);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack} />
            <Steps>
              <ImageIndex />
              <ImageIndex active />
            </Steps>
          </Header>

          <Title> Crie sua {"\n"} conta </Title>
          <Subtitle>
            Faça seu cadastro de {"\n"} De forma rápida e fácil
          </Subtitle>
          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />
            <Input
              iconName="mail"
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              value={document}
              onChangeText={setDocument}
            />
          </Form>
          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
