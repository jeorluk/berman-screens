import styled, { keyframes } from 'styled-components'

const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`

export const Card = styled.div`
  padding: 1rem;
  border: 0;
  background-color: white;
  border-radius: 5px;
  box-shadow: ${props => props.theme.bs};
  line-height: 1.5;
  font-size: 1.5rem;
  font-weight: 600;

  label {
    font-size: 2rem;
    display: inline-block;
    margin: 2px;
  }

  input,
  textarea,
  select {
    font-size: 2rem;
    background: white;
    /* width: 100%; */
    margin: 2px;
    border: 0;
    outline: 0;
    border-bottom: 1px solid grey;

    &:hover {
      margin-bottom: 1px;
      border-bottom: 2px solid black;
    }

    &:focus {
      margin: 0;
      border: 2px solid ${props => props.theme.primaryLight};
    }
  }
`

export const Button = styled.button`
  width: auto;
  background: ${props => props.theme.primary};
  color: white;
  border: 0;
  border-radius: 5px;
  box-shadow: ${props => props.theme.bs};
  font-size: 2rem;
  font-weight: 600;
  margin: 0.5rem 0.5rem;
  padding: 0.5rem 1.2rem;
`

export const Form = styled.form`
  border: 0;
  background: white;
  line-height: 1.5;
  font-size: 1.5rem;
  font-weight: 600;

  label {
    font-size: 2rem;
    display: inline-block;
    margin: 2px;
  }

  input,
  select {
    font-size: 2rem;
    background: white;
    /* width: 100%; */
    margin: 2px;
    border: 0;
    outline: 0;
    border-bottom: 1px solid grey;

    &:hover {
      margin-bottom: 1px;
      border-bottom: 2px solid black;
    }

    &:focus {
      margin: 0;
      border: 2px solid ${props => props.theme.primaryLight};
    }
  }

  fieldset {
    /* display: flex;
    flex-wrap: wrap;
    justify-content: center; */
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        ${props => props.theme.primary} 0%,
        ${props => props.theme.primaryLight} 50%,
        ${props => props.theme.primary} 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`
