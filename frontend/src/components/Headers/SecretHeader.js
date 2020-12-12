import { useRouter } from 'next/router';
import styled from 'styled-components';

import ImageContainer from '../Containers/ImageContainer';
import Logo from '../Logo';
import RegisterForm from '../RegisterForm';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: ${({ theme }) => theme.colors.light};
`;

const DivForm = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export default function SecretHeader({ onAddParticipant }) {
    const router = useRouter();
    const { id } = router.query;

    async function handleSubmit({ name, email }) {
        const { NEXT_PUBLIC_API_URL } = process.env;
        const data = await fetch(`${NEXT_PUBLIC_API_URL}/secret/${id}/participants`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
            })
        });

        handleResponse({ name, email, response: await data.json() });
    }

    function handleResponse({ name, email, response }) {
        if (response.success) {
            onAddParticipant({ name, email, externalId: response.id });
        }
    }

    return (
        <ImageContainer>
            <Container>
                <Logo />
                <p>Você foi convidado para participar desse amigo secreto!</p>
            </Container>
            <DivForm>
                <RegisterForm buttonText='Participar' onSubmit={handleSubmit} />
            </DivForm>
        </ImageContainer>
    );
}