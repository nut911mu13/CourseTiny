import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Icon, Input, Checkbox } from 'antd';
import { translate } from 'react-i18next';
import { fetchAsync } from '../../libs/helper';
import Button from '../myComponents/Button';
import { hideModalSign, changeModalKey } from '../../redux/actions/modal';
import { signedIn } from '../../redux/actions/auth';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../../libs/notification';

const FormItem = Form.Item;

class SignIn extends React.Component {
  state = {
    loading: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.loading) {
      return;
    }
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        try {
          const { status, data } = await fetchAsync('auth/signin', {
            method: 'POST',
            body: values,
          });
          if (status === 200) {
            this.props.form.resetFields();
            this.props.hideModalSign();
            this.props.signedIn(data);
            openNotification(NOTIFICTION_SUCCESS, 'signed in successfully', 'you have signed in.');
          } else {
            openNotification(NOTIFICTION_ERROR, 'sign in failed', data.error);
          }
        } catch (error) {
          openNotification(NOTIFICTION_ERROR, 'error', error.message);
        } finally {
          this.setState({ loading: false });
        }
      }
    });
  }

  render() {
    const { t, changeModalKey, form: { getFieldDecorator } } = this.props;
    const { loading } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={t('email')} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={t('password')} />)}
        </FormItem>
        <FormItem style={{ textAlign: 'center' }}>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: false,
          })(<Checkbox>{t('rememberMe')}</Checkbox>)}
          <a className="login-form-forgot" href="">{t('forgotPassword')}</a>
          <FormItem style={{ textAlign: 'center' }}>
            <Button primary center fontWeight="600" type="submit" loading={loading}>
              {t('signIn')}
            </Button>
          </FormItem>
          <hr />
          <div className="center">
            <p>Not a member ?</p>
            <a onClick={() => changeModalKey('signup')}>{t('signUp')}</a>
          </div>
        </FormItem>
      </Form>
    );
  }
}

const SignInForm = Form.create()(SignIn);
const TranslatedSignInForm = translate(['common'])(SignInForm);

const mapDispatchToProps = dispatch => ({
  hideModalSign: bindActionCreators(hideModalSign, dispatch),
  changeModalKey: bindActionCreators(changeModalKey, dispatch),
  signedIn: bindActionCreators(signedIn, dispatch),
});

export default connect(null, mapDispatchToProps)(TranslatedSignInForm);
