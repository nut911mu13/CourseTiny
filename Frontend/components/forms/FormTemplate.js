import { Icon } from 'antd';
import Button from '../myComponents/Button';
import styled from 'styled-components';

const ResumeContainer = styled.div`
  margin: 12px;
  div.resume-item:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const FormTemplate = ({
  title,
  children,
  onClick,
  showButton,
  buttonText,
  centerTitle
}) => (
  <React.Fragment>
    <div style={{ border: '1px solid lightgray' }} >
      <div style={{
        display: 'inline-block',
        fontWeight: '500',
        padding: '10px',
        width: centerTitle ? '100%' : 'auto',
        textAlign: centerTitle ? 'center' : 'left',
      }}>
        {title}
      </div>
      { showButton
        ? <div style={{ display: 'inline-block', float: 'right' }}>
          <Button
            style={{ margin: '5px 10px' }}
            blueBorder
            height="2px"
            width="15px"
            borderRadius="8px"
            borderSize="1px"
            type="button"
            onClick={onClick}
          >
            <Icon type="plus" /> {buttonText}
          </Button>
        </div>
        : null
        }
      <div className="hr" style={{ clear: 'right' }} />
      <ResumeContainer>
        {children}
      </ResumeContainer>
    </div>
  </React.Fragment>
);

export default FormTemplate;
