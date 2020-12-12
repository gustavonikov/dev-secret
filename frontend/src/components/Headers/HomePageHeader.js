import { useRouter } from 'next/router';
import styled from 'styled-components';

import ImageContainer from '../Containers/ImageContainer';
import Logo from '../Logo';
import RegisterForm from '../RegisterForm';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 70vh;
    color: ${({ theme }) => theme.colors.light};
    padding-left: 60px;
`;

const FormDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export default function HomePageHeader() {
    const router = useRouter();

    async function handleSubmit({ name, email }) {
        const { NEXT_PUBLIC_API_URL } = process.env;
        const data = await fetch(`${NEXT_PUBLIC_API_URL}/secret`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                email
            })
        });

        handleResponse(await data.json());
    }

    function handleResponse({ success, id, adminKey }) {
        if (success) {
            router.push(`/secret/${id}?adminKey=${adminKey}`)
        }
    }

    return (
        <ImageContainer>
            <Container>
                <Logo />
                <h2>A melhor brincadeira do natal.</h2>
            </Container>
            <FormDiv>
                <RegisterForm onSubmit={handleSubmit} />
            </FormDiv>
        </ImageContainer>
    );
}
