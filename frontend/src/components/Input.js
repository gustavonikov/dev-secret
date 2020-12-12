import { useState } from 'react';
import styled, { css } from 'styled-components';

const WrapperInput = styled.div`
    position: relative;
    
    width: 100%;
    
    display: flex;
    margin: 10px 15px 10px 0;

    &:nth-child(2) {
        margin-right: 10px;
    }
`;

const Label = styled.label`
    width: 100%;
    height: 0;
`;

Label.Text = styled.span`
    height: 50px;
    position: absolute; 
    top: 0;
    left: 16px;

    font-size: 14px;

    display: flex;
    align-items: center;
  
    transform-origin: 0% 0%;

    transition: .1s ease-in-out;

    color: ${({ theme }) => theme.colors.primary};
`;

const Input = styled.input`
    width: 88%;

    padding: 16px;

    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};

    border: 0;
    border-radius: 12px;


    &:focus {
        border: none;
        outline: none;
    }

    &:focus:not([type="color"]) + span {
        transform: scale(.6) translateY(-10px);
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus {
        -webkit-text-fill-color: ${({ theme }) => theme.colors.primary};
        -webkit-box-shadow: 0 0 0px 1000px #fff inset;
        transition: background-color 5000s ease-in-out 0s;
    }

    ${({ hasName }) => hasName && css`
        &:not([type="color"]) + span {
            transform: scale(.6) translateY(-10px);
        }
    `}

    ${({ hasEmail }) => hasEmail && css`
        &:not([type="color"]) + span {
            transform: scale(.6) translateY(-10px);
        }
    `}
`;

export default function InputComponent (props) {
    return (
        <WrapperInput>
            <Label htmlFor={props.name}>
                <Input 
                    {...props}
                />
                <Label.Text>
                    {props.label}
                </Label.Text>
            </Label>
        </WrapperInput>
    );
}
