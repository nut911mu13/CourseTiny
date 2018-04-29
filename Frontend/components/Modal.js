import { Modal, Icon } from 'antd';
import styled, { css } from 'styled-components';
import Button from './myComponents/Button';

const MyModal = ({
  className,
  title,
  show,
  children,
  onHide,
  border,
  borderRadius,
  bottomButton,
  buttonIcon
}) => (
  <React.Fragment>
    <Modal
      title={title}
      wrapClassName={`vertical-center-modal ${className}`}
      footer={null}
      visible={show}
      onOk={() => {}}
      onCancel={onHide}
    >
      {children}
      <div className="buttonStatus">
        <Button primary fullWidth borderRadius="0px" style={{
          bottom: 0,
          left: 0,
          position: 'absolute'
        }}>
          <Icon type="to-top" />
          <span>{bottomButton}</span>
        </Button>
      </div>
    </Modal>
  </React.Fragment>
);

export default styled(MyModal)`

  .ant-modal-header {
    border-bottom: ${props => props.borderBottom ? '1px solid #e8e8e8' : '0'};
  }

  .ant-modal-title {
    text-align: center;
  }

  .ant-modal-body {
    position: relative;
  }

  .ant-modal-content {
    border-radius: ${props => props.borderRadius ? '0' : '5px'}
  }

  .buttonStatus {
    display: ${props => props.bottomButton ? 'block' : 'none' }
  }
`;
