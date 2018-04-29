import { Form, Input, Icon } from 'antd';
import { translate } from 'react-i18next';
import Button from '../myComponents/Button';
import { fetchAsync } from '../../libs/helper';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../../libs/notification';


const FormItem = Form.Item;

// TODO : need custom validator for endDate and isCurrent
class AddSkill extends React.Component {
  state = {
    loading: false,
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        this.setState({ loading: true });
        try {
          const { status, data } = (this.props.title === 'add skill')
            ?
            await fetchAsync(`user/${this.props.userId}/skills`, {
              method: 'POST',
              body: fieldsValue,
            })
            :
            await fetchAsync(`user/${this.props.userId}/skills/${this.props.skill.id}`, {
              method: 'PATCH',
              body: fieldsValue,
            });
          if (status === 200) {
            fieldsValue.id = data.insertId || this.props.skill.id;
            this.props.onSubmit('skill', fieldsValue);
            this.props.form.resetFields();
            openNotification(NOTIFICTION_SUCCESS, 'update successfully', 'you have been updated your skill');
          } else {
            openNotification(NOTIFICTION_ERROR, 'update failed', data.error);
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
    const { form: { getFieldDecorator }, t } = this.props;
    const { loading } = this.state;

    return (
      <React.Fragment>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <FormItem
            label="ทักษะความสามารถ (ใส่ครั้งละ 1 อย่าง)"
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'กรุณากรอกทักษะ' }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="ระดับความสามารถ"
          >
            {getFieldDecorator('level', {
              rules: [{ required: true, message: 'กรุณากรอกระดับความสามารถ' }],
            })(<Input />)}
          </FormItem>
          <Button primary fullWidth borderRadius="0px" type="submit" loading={loading}>
            <Icon type="check" style={{ fontSize: '20px', fontWeight: 'bold' }} />&nbsp;
            เพิ่มข้อมูล
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

const AddSkillForm = Form.create({
  mapPropsToFields(props) {
    const { skill } = props;
    console.log(skill)
    return {
      name: Form.createFormField({
        value: skill && skill.name,
      }),
      level: Form.createFormField({
        value: skill && skill.level,
      }),
    };
  },
})(AddSkill);

const TranslatedAddSkillForm = translate(['common'])(AddSkillForm);

export default TranslatedAddSkillForm;
