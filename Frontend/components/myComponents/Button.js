import styled, { css } from 'styled-components';
import { Icon } from 'antd';

const primayColor = '#29AAE3';
const primaryColorHover = '#3dbef7';
const successColor = '#3AB54A';
const successColorHover = '#62d471';
const cancelColor = '#B3B3B3';
const cancelColorHover = '#c1c1c1';

const alertColor = '#FF2B56';
const warningColor = '#FFDB4A';

const Button = styled.button`
  display: inline-block;
  cursor: pointer;
  text-align: center;
  font-size: ${props => props.fontSize || '16px'};
  font-weight: ${props => props.fontWeight || '400'};
  border-radius: ${props => props.borderRadius || '30px'};
  padding: ${props => props.height || '5px'} ${props => props.width || '50px'};
  margin: 0;
  background: transparent;
  color: #5E6365;
  border-style: solid;
  border-width: ${props => props.borderSize || '2px'};
  ${''}
  border-color: #dbdbdb;
  transition: 0.3s;
  outline: 0;

  &:hover {
    border-color: ${primayColor};
    color: ${primayColor};
  }

  ${props => props.primary && css`
    border-color: ${primayColor};
    background: ${primayColor};
    color: white;
    &:hover {
      border-color: ${primaryColorHover};
      background: ${primaryColorHover};
      color: white;
    }
  `}

  ${props => props.blueBorder && css`
    color: ${primayColor};
    border-color: ${primayColor};
      &:hover {
        background: ${primayColor};
        color: white;
      }
  `}

  ${props => props.redBorder && css`
    color: ${alertColor};
    border-color: ${alertColor};
      &:hover {
        border-color: ${alertColor};
        background: ${alertColor};
        color: white;
      }
  `}

  ${props => props.fullWidth && css`
    width: 100%;
  `}

  ${props => props.center && css`
    margin: 0 auto;
  `}

  ${props => props.success && css`
    border-color: ${successColor};
    background: ${successColor};
    color: white;
    &:hover {
      border-color: ${successColorHover};
      background: ${successColorHover};
      color: white;
    }
  `}

  ${props => props.cancel && css`
    border-color: ${cancelColor};
    background: ${cancelColor};
    color: white;
    &:hover {
      border-color: ${cancelColorHover};
      background: ${cancelColorHover};
      color: white;
    }
  `}

  ${props => props.loading && css`
    cursor: default;
  `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    filter: alpha(opacity=70); /* For IE8 and earlier */
  }

`;

export const ToolbarButton = styled.button`
  display: inline-block;
  cursor: pointer;
  text-align: center;
  font-size: ${props => props.fontSize || '16px'};
  font-weight: ${props => props.fontWeight || '400'};
  margin: 0 3px 0 3px;
  border-radius: 5px;
  padding: 1px 5px;
  background: transparent;
  color: #B0B0B0;
  border: 1px solid #B0B0B0;
  transition: 0.3s;
  outline: 0;

  &:hover {
    border: 1px solid ${primayColor};
    color: ${primayColor};
  }

  ${props => props.warning && css`
    color: ${warningColor};
    border: 1px solid ${warningColor};
      &:hover {
        border: 1px solid ${warningColor};
        background: ${warningColor};
        color: white;
      }
  `}

  ${props => props.alert && css`
    color: ${alertColor};
    border: 1px solid ${alertColor};
      &:hover {
        border: 1px solid ${alertColor};
        background: ${alertColor};
        color: white;
      }
  `}

`;

export default props => (
  <Button
    {...props}
  >
    { props.loading ? <span><Icon type="loading" /> </span> : null }
    {props.children}
  </Button>
);

