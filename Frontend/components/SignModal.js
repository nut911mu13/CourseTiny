import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import Tabs, { TabPane } from './myComponents/Tabs';
import Modal from './Modal';
import { hideModalSign } from '../redux/actions/modal';
import SignInForm from './forms/SignInForm';
import SignUpForm from './forms/SignUpForm';

const SignModal = ({
  t, signForm, hideModalSign,
}) => {
  const modalTitle = signForm.activeKey === 'signin' ? t('signIn') : t('signUp');
  return (
    <React.Fragment>
      <Modal title={modalTitle} show={signForm.show} onHide={hideModalSign}>
        <Tabs type="card" activeKey={signForm.activeKey}>
          <TabPane tab={modalTitle} key="signin">
            <SignInForm />
          </TabPane>
          <TabPane tab={modalTitle} key="signup">
            <SignUpForm />
          </TabPane>
        </Tabs>
      </Modal>
      <style jsx>{`
          .login-form-forgot {
            float: right;
          }
          .center {
            text-align: center;
          }
        `}
      </style>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  signForm: state.form.signForm,
});

const mapDispatchToProps = dispatch => ({
  hideModalSign: bindActionCreators(hideModalSign, dispatch),
});

const TranslatedSignModal = translate(['common'])(SignModal);

export default connect(mapStateToProps, mapDispatchToProps)(TranslatedSignModal);
