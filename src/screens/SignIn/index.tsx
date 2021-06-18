import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";
import * as yup from "yup";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";
import { useAuth } from "../../hooks/auth";
import {
  Container,
  Footer,
  Form,
  Header,
  SubtitleHeader,
  TitleHeader
} from "./styles";

export const SignIn: React.FC = () => {
  const [paddingWhereKeyboardOpen, setPaddingWhereKeyboardOpen] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () =>
      setPaddingWhereKeyboardOpen(20)
    );

    Keyboard.addListener("keyboardDidHide", () =>
      setPaddingWhereKeyboardOpen(0)
    );
  }, []);

  async function handleSignIn() {
    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .required("Email obrigatório")
          .email("Digite um email válido"),
        password: yup.string().required("Senha obrigatória"),
      });

      await schema.validate({ email, password });

      await signIn({ email, password });

      navigation.navigate('Home')

      
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        Alert.alert("Opa", err.message);
      } else {
        Alert.alert("Erro na autenticação", `${err}`);
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate("SignUpFirstStep");
  }

  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
      style={{ paddingTop: paddingWhereKeyboardOpen }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <TitleHeader> Estamos {"\n"} quase lá. </TitleHeader>
            <SubtitleHeader>
              Faça seu login para começar {"\n"}
              uma experiência incrivel.
            </SubtitleHeader>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="Email"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <InputPassword
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />

            <Button
              title="Criar conta gratuita"
              onPress={handleNewAccount}
              enabled={true}
              color="transparent"
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
