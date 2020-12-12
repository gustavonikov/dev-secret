import styled from 'styled-components';

const StyledButton = styled.button`
    margin: 10px 0;
    padding: 15px 30px;
      
    display: block;
    border: none;
    border-radius: 50px;
 
    font-size: 14px;
    font-weight: bold;

    background-color: ${({ theme }) => theme.colors.secondary};

    cursor: pointer;
`;

export default function Button(props) {
    return <StyledButton {...props} />;

}