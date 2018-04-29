import { Form, Input, DatePicker, Icon, Checkbox } from 'antd';
import { translate } from 'react-i18next';
import moment from 'moment';
import Button from '../myComponents/Button';
import { fetchAsync } from '../../libs/helper';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../../libs/notification';


const FormItem = Form.Item;
const { MonthPicker } = DatePicker;
const dateFormat = 'MM/YYYY';

// TODO : need custom validator for endDate and isCurrent
class AddExperience extends React.Component {
  state = {
    loading: false,
    isCurrent: false,
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        this.setState({ loading: true });
        const values = {
          company: fieldsValue.company,
          position: fieldsValue.position,
          startMonth: +fieldsValue.startDate.format('M'),
          startYear: +fieldsValue.startDate.format('YYYY'),
          endMonth: fieldsValue.endDate ? +fieldsValue.endDate.format('M') : undefined,
          endYear: fieldsValue.endDate ? +fieldsValue.endDate.format('YYYY') : undefined,
          isCurrent: fieldsValue.isCurrent,
        };
        try {
          const { status, data } = (this.props.title === 'add experience')
            ?
            await fetchAsync(`user/${this.props.userId}/experience`, {
              method: 'POST',
              body: values,
            })
            :
            await fetchAsync(`user/${this.props.userId}/experience/${this.props.experience.id}`, {
              method: 'PATCH',
              body: values,
            });
          if (status === 200) {
            values.id = data.insertId || this.props.experience.id;
            this.props.onSubmit('exp', values);
            this.props.form.resetFields();
            openNotification(NOTIFICTION_SUCCESS, 'update successfully', 'you have been updated experience');
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

  handleCheckbox = (e) => {
    this.setState({
      isCurrent: e.target.checked,
    })
  }

  render() {
    const { form: { getFieldDecorator }, t } = this.props;
    const { loading, isCurrent } = this.state;

    return (
      <React.Fragment>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <FormItem
            label="บริษัท"
          >
            {getFieldDecorator('company', {
              rules: [{ required: true, message: 'กรุณากรอกชื่อบริษัท' }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="ตำแหน่ง"
          >
            {getFieldDecorator('position', {
              rules: [{ required: true, message: 'กรุณากรอกตำแหน่ง' }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="เริ่มงานเมื่อ"
          >
            {getFieldDecorator('startDate', {
              rules: [{ required: true, message: 'กรุณาเลือกเดือนและปี' }],
            })(<MonthPicker placeholder="เลือกเดือนและปี" format={dateFormat} style={{ width: '100%' }} />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('isCurrent', { valuePropName: 'checked' })
            (<Checkbox onChange={this.handleCheckbox}>ปัจจุบัน</Checkbox>)}
          </FormItem>
          <FormItem
            label="สิ้นสุดเมื่อ"
          >
            {getFieldDecorator('endDate')
            (<MonthPicker placeholder="เลือกเดือนและปี" format={dateFormat} style={{ width: '100%' }} disabled={isCurrent} />)}
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

const AddExperienceForm = Form.create({
  mapPropsToFields(props) {
    const { experience } = props;
    return {
      company: Form.createFormField({
        value: experience && experience.company,
      }),
      position: Form.createFormField({
        value: experience && experience.position,
      }),
      startDate: Form.createFormField({
        value: experience && moment(`${experience.startYear}-${experience.startMonth}`, 'YYYY-MM'),
      }),
      endDate: Form.createFormField({
        value: experience && experience.endMonth && experience.endYear && moment(`${experience.endYear}-${experience.endMonth}`, 'YYYY-MM'),
      }),
      isCurrent: Form.createFormField({
        value: experience && experience.currentCompany,
      }),
    };
  },
})(AddExperience);

const TranslatedAddExperienceForm = translate(['common'])(AddExperienceForm);

export default TranslatedAddExperienceForm;
