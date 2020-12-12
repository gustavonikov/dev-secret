import { useState } from 'react';
import styled from 'styled-components';

import Input from './Input';
import Button from './Button';

const Form = styled.form`
    max-width: 810px;

    flex: 1;
    display: flex;

    padding: 20px;

    @media (max-width: 600px) {
        flex-direction: column;
    }

    > button {
        margin: 10px;
    }
`;

function RegisterForm({ buttonText = 'Criar', onSubmit = () => {} }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [hasName, setHasName] = useState(false);
    const [hasEmail, setHasEmail] = useState(false);

    function handleChanges(event, field) {
        if (field === 'name') {
            setName(event.target.value);

            if (event.target.value.length > 0) setHasName(true)
            else setHasName(false);;
        } 
        else {
            setEmail(event.target.value);

            if (event.target.value.length > 0) setHasEmail(true)
            else setHasEmail(false);
        }

    }
    
    function handleSubmit(event) {
        event.preventDefault();
        onSubmit({name, email});
        setName('');
        setHasName(false);
        setEmail('');
        setHasEmail(false);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                name="name"
                label="Seu nome"
                value={name}
                hasName={hasName}
                onChange={(event) => handleChanges(event, 'name')}
                required
            />
            <Input
                name="email"
                label="Seu email"
                type="email"
                value={email}
                hasEmail={hasEmail}
                onChange={(event) => handleChanges(event, 'email')}
                required
            />
            <Button>{buttonText}</Button>
        </Form>
    );
}

export default RegisterForm;
