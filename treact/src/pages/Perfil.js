import React from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import { useUser } from "../UserContext.js";
import { getAuth, signOut } from "firebase/auth";

const Container = tw.div`min-h-screen bg-gray-100 flex flex-col items-center pt-32`;
const Content = tw.div`flex-1 flex flex-col items-center justify-start px-4 w-full`;
const FormContainer = tw.div`bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md`;
const Title = tw.h2`text-3xl font-bold text-center text-primary-700 mb-2`;
const Subtitle = tw.p`text-center text-gray-500 mb-6`;
const Field = tw.div`mb-4`;
const InputWrapper = tw.div`relative`;
const Link = tw.a`block text-center text-blue-500 hover:underline`;
const Button = tw.button`flex flex-col items-center justify-center w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition`;
export default function Perfil() {
  const { user } = useUser();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Usuário deslogado com sucesso");
        window.location.href = "/#"; // ou redirecione para login
      })
      .catch((error) => {
        console.error("Erro ao deslogar:", error);
      });
  };

  if (!user) {
    return (
      <AnimationRevealPage>
        <Header />
        <Container>
          <Content>
            <FormContainer>
              <Title>Você ainda não está logado.</Title>
              <Subtitle>Faça login ou crie uma Conta.</Subtitle>
              <Field>
                <InputWrapper>
                  <Link href="/login">Faça login</Link>
                </InputWrapper>
              </Field>
              <Field>
                <InputWrapper>
                  <Link href="/register">Criar Conta</Link>
                </InputWrapper>
              </Field>
            </FormContainer>
          </Content>
        </Container>
      </AnimationRevealPage>
    );
  }

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <Content>
          <FormContainer>
            <Title>Olá, {user.displayName}</Title>
            <Subtitle>Gerencie seu perfil</Subtitle>
            <form>
              <Field>
                <InputWrapper>
                  <Link href="/login">login</Link>
                </InputWrapper>
              </Field>
              <Field>
                <InputWrapper>
                  <Link href="/register">Registrar</Link>
                </InputWrapper>
              </Field>
              <Field>
                <InputWrapper>
                  <Link href="/configuracao">Configuração</Link>
                </InputWrapper>
              </Field>
              <Field>
                <InputWrapper>
                  <Button onClick={handleLogout}>
                    Sair
                  </Button>
                </InputWrapper>
              </Field>
            </form>
          </FormContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
}