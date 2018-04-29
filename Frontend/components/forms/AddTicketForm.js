import { Form, Input, DatePicker, InputNumber, Row, Col } from 'antd';
import { translate } from 'react-i18next';
import moment from 'moment';
import Button from '../myComponents/Button';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

class AddTicket extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          startDate: fieldsValue.ticketDate[0].format('YYYY-MM-DD'),
          endDate: fieldsValue.ticketDate[1].format('YYYY-MM-DD'),
        };
        this.props.onSubmit(values);
        this.props.form.resetFields();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { t } = this.props;
    return (
      <React.Fragment>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <FormItem
            label={t('ticketName')}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: t('errors.ticketNameRequired') }],
            })(<Input style={{ width: '100%' }} />)}
          </FormItem>
          <FormItem
            label={t('ticketDetail')}
          >
            {getFieldDecorator('detail', {
              rules: [{ required: true, message: t('errors.ticketDetailRequired') }],
            })(<Input style={{ width: '100%' }} />)}
          </FormItem>
          <FormItem
            label={t('startDateEndDate')}
          >
            {getFieldDecorator('ticketDate', {
              rules: [{ required: true, message: t('errors.ticketDateRequired') }],
            })(<RangePicker
              format={dateFormat}
              style={{ width: '100%' }}
            />)}
          </FormItem>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label={t('ticketPrice')}
              >
                {getFieldDecorator('price', {
                  rules: [{ required: true, message: t('errors.ticketPriceRequired') }],
                })(<InputNumber min={1} style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label={t('ticketQuantity')}
              >
                {getFieldDecorator('quantity', {
                  rules: [{ required: true, message: t('errors.ticketQuantityRequired') }],
                })(<InputNumber min={1} style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
          <FormItem style={{ textAlign: 'center' }}>
            <Button primary center fontWeight="600" type="submit">{t('common:save')}</Button>
          </FormItem>
        </Form>
      </React.Fragment>
    );
  }
}

const AddTicketForm = Form.create({
  mapPropsToFields(props) {
    const { ticket } = props;
    return {
      name: Form.createFormField({
        value: ticket && ticket.name,
      }),
      ticketDate: Form.createFormField({
        value: ticket && [moment(ticket.startDate), moment(ticket.endDate)],
      }),
      detail: Form.createFormField({
        value: ticket && ticket.detail,
      }),
      price: Form.createFormField({
        value: ticket && ticket.price,
      }),
      quantity: Form.createFormField({
        value: ticket && ticket.quantity,
      }),
    };
  },
})(AddTicket);

const TranslatedAddTicketForm = translate(['create_course', 'common'])(AddTicketForm);

export default TranslatedAddTicketForm;
