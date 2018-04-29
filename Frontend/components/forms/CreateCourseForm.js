import Router from 'next/router';
import { Form, Input, DatePicker, Select, Row, Col, Icon, Upload } from 'antd';
import Link from 'next/link';
import { translate } from 'react-i18next';
import moment from 'moment';
import { fetchAsync, fetchAsyncForm } from '../../libs/helper';
import Button, { ToolbarButton } from '../myComponents/Button';
import Table from '../myComponents/Table';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../../libs/notification';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

class CreateCourse extends React.Component {
  state = {
    coverSrc: '',
    file: null,
    categories: [],
    loading: false,
  }

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const { status, data: { categories } } = await fetchAsync('categories', { method: 'GET' });
      if (status === 200) {
        this.setState({ categories });
      }
    } catch (error) {
      openNotification(NOTIFICTION_ERROR, 'error', error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    // need for setting ticket count value and trigger validation
    if (nextProps.tickets.length !== this.props.tickets.length) {
      this.props.form.setFieldsValue({
        ticketCount: nextProps.tickets.length,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.loading) { // prevent resubmitting
      return;
    }
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        const {
          title, location, category, description, courseDate,
        } = fieldsValue;
        const formData = new FormData();
        formData.append('type', 'coursePhoto');
        formData.append('title', title);
        formData.append('startDate', courseDate[0].format('YYYY-MM-DD'));
        formData.append('endDate', courseDate[1].format('YYYY-MM-DD'));
        formData.append('location', location);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('cover', this.state.file);
        formData.append('tickets', JSON.stringify(this.props.tickets));

        this.setState({ loading: true });
        try {
          const { status, data } = await fetchAsyncForm('courses', formData);
          if (status === 200) {
            this.resetForm();
            this.props.onSubmit(); // reset parent form
            openNotification(NOTIFICTION_SUCCESS, 'create course successfully', 'your course has been created.');
            Router.push('/my-courses');
          } else {
            openNotification(NOTIFICTION_ERROR, 'create course failed', data.error);
          }
        } catch (error) {
          openNotification(NOTIFICTION_ERROR, 'error', error.message);
        } finally {
          this.setState({ loading: false });
        }
      }
    });
  }

  resetForm = () => {
    this.setState({ coverSrc: '', file: null });
    this.props.form.resetFields();
  }

  checkTicketCount = (rule, value, callback) => {
    if (!value) {
      callback(this.props.t('errors.ticketRequired'));
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      t,
      i18n,
      onAddTicket,
      onEditTicket,
      onDeleteTicket,
      tickets,
    } = this.props;
    const { categories, loading } = this.state;

    const columns = [{
      title: t('tickets'),
      dataIndex: 'name',
      key: 'name',
    }, {
      title: t('detail'),
      dataIndex: 'detail',
      key: 'detail',
    }, {
      title: t('startDate'),
      dataIndex: 'startDate',
      key: 'startDate',
    }, {
      title: t('endDate'),
      dataIndex: 'endDate',
      key: 'endDate',
    }, {
      title: t('quantity'),
      dataIndex: 'quantity',
      key: 'quantity',
    }, {
      title: t('price'),
      dataIndex: 'price',
      key: 'price',
    }, {
      title: t('action'),
      key: 'action',
      render: (text, record) => (
        <div>
          <ToolbarButton warning type="button" onClick={() => onEditTicket(record.key)}>
            <Icon type="edit" />
          </ToolbarButton>
          <ToolbarButton alert type="button" onClick={() => onDeleteTicket(record.key)}>
            <Icon type="delete" />
          </ToolbarButton>
        </div>
      ),
    }];

    const dataSource = tickets.map(d => ({
      ...d,
      startDate: moment(d.startDate).format(dateFormat),
      endDate: moment(d.endDate).format(dateFormat),
    }));

    const uploadProps = {
      name: 'file',
      showUploadList: false,
      action: '/upload.do',
      beforeUpload: (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.setState({ file, coverSrc: e.target.result });
        };
        reader.readAsDataURL(file);
        return false;
      },
    };

    return (
      <React.Fragment>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={{ span: 24, offset: 0 }} md={{ span: 18, offset: 3 }}>
              <FormItem
                label="ภาพ cover ของคอร์ส (735px x 315px is recommend)"
              >
                {getFieldDecorator('cover', {
                  rules: [{ required: true, message: 'กรุณาอัพโหลดภาพ cover' }],
                  valuePropName: 'file',
                })(<div className="cover-container">
                  <Upload {...uploadProps}>
                    <div className="bottom-left">
                      <Button blueBorder type="button" width="15px">
                        <Icon type="camera" /> Select File
                      </Button>
                    </div>
                  </Upload>
                  <img className="cover" alt="course cover" src={this.state.coverSrc} />
                </div>)}
              </FormItem>
            </Col>
          </Row>
          <br />
          <Row gutter={16}>
            <Col xs={{ span: 24, offset: 0 }} md={{ span: 9, offset: 3 }}>
              <FormItem
                label={t('courseTitle')}
              >
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: t('errors.courseTitleRequired') }],
                })(<Input style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} md={{ span: 9 }}>
              <FormItem
                label={t('startDateEndDate')}
              >
                {getFieldDecorator('courseDate', {
                  rules: [{ required: true, message: t('errors.courseDateRequired') }],
                })(<RangePicker
                  format={dateFormat}
                  ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                  onChange={() => { }}
                  style={{ width: '100%' }}
                />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={{ span: 24, offset: 0 }} md={{ span: 9, offset: 3 }}>
              <FormItem
                label={t('location')}
              >
                {getFieldDecorator('location', {
                  rules: [{ required: true, message: t('errors.locationRequired') }],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} md={{ span: 9 }}>
              <FormItem
                label={t('common:category')}
              >
                {getFieldDecorator('category', {
                  rules: [{ type: 'number', required: true, message: t('errors.categoryRequired') }],
                })(<Select style={{ width: '100%' }}>
                  {categories.map(c => <Option key={c.id} value={c.id}>{c[i18n.language]}</Option>)}
                </Select>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24, offset: 0 }} md={{ span: 18, offset: 3 }}>
              <FormItem
                label={t('description')}
              >
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: t('errors.descriptionRequired') }],
                })(<TextArea style={{ width: '100%', minHeight: 200 }} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24, offset: 0 }} md={{ span: 18, offset: 3 }}>
              <FormItem
                label={t('tickets')}
                required
              >
                {getFieldDecorator('ticketCount', {
                  rules: [{ type: 'number' }, { validator: this.checkTicketCount }],
                  initialValue: 0,
                })(<Input type="hidden" />)}
              </FormItem>
              <div style={{ width: '100%', textAlign: 'center' }}>
                <Button
                  blueBorder
                  center
                  width="12px"
                  height="3px"
                  borderRadius="8px"
                  borderSize="1px"
                  type="button"
                  onClick={onAddTicket}
                >
                  <Icon type="plus" />{t('addTicket')}
                </Button>
              </div>
              <br />
              {dataSource.length > 0
              ? <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                size="small"
              />
              : null
              }
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={{ span: 24, offset: 0 }} md={{ span: 18, offset: 3 }}>
              <Link href="/my-courses">
                <Button cancel type="button">
                  {t('common:cancel')}
                </Button>
              </Link>
              <Button success style={{ float: 'right' }} type="submit" loading={loading}>
                {t('common:save')}
              </Button>
            </Col>
          </Row>
        </Form>
        <style jsx>{`
          .cover-container {
            position: relative;
            height: 315px;
            width: 735px;
            overflow: hidden;
            text-decoration: none;
            background-color: #c1c1c1;
            margin: auto;
          }

          .cover {
            min-height: 100%;
            min-width: 100%;
            width: 100%;
            position: absolute;
            top: 0px;
            left: 0;
          }

          .bottom-left {
            position: absolute;
            bottom: 8px;
            left: 16px;
            font-size: 18px;
            z-index: 1;
          }
        `}
        </style>
      </React.Fragment>
    );
  }
}

const CreateCourseForm = Form.create()(CreateCourse);

const TranslatedCreateCourseForm = translate(['create_course', 'common'])(CreateCourseForm);

export default TranslatedCreateCourseForm;
