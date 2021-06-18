import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { BackButton } from "../../../components";
import { Button } from "../../../components/Button";
import { ImageIndex } from "../../../components/ImageIndex";
import { InputPassword } from "../../../components/InputPassword";
import { api } from "../../../services/api";
import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  Subtitle,
  Title,
} from "./styles";

interface IParams {
  user: {
    name: string;
    email: string;
    document: string;
  };
}

export const SecondStep: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as IParams;

  console.log(user);

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !confirmPassword) {
      return Alert.alert("Informe a senha e a confirmação dela!");
    }

    if (password !== confirmPassword) {
      return Alert.alert("As senhas nao conferem !");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.document,
        password,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          nextScreenRoute: "SignIn",
          title: "Conta Criada!",
          message: `Agora é so fazer login ${"\n"} e aproveitar`,
        });
      })
      .catch(() => Alert.alert("Opa", "nao foi possivel fazer o cadastro !"));
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
            <FormTitle>2. Senha</FormTitle>

            <InputPassword
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
            <InputPassword
              iconName="lock"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
