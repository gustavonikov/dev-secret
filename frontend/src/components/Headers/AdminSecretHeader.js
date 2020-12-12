import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ImageContainer from '../Containers/ImageContainer';
import Logo from '../Logo';
import Input from '../Input';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: ${({ theme }) => theme.colors.light};
`;

const DivForm = styled.div`
    padding: 20px 20px 60px;
    margin-left: 15px;

    max-width: 400px;

    color: ${({ theme }) => theme.colors.light};
`;

export default function AdminSecretHeader() {
    const [link, setLink] = useState('');
    
    useEffect(() => {
        setLink(`${window.location.origin}${window.location.pathname}`)
    }, []);

    return (
        <ImageContainer>
            <Container>
                <Logo />
            </Container>
            <DivForm>
                <p>Compartilhe essa sala com seus amigos!</p>
                <Input value={link} readOnly />
            </DivForm>
        </ImageContainer>
    );
}