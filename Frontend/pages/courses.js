import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { Form, Select, Row, Col } from 'antd';
import { translate } from 'react-i18next';
import { fetchAsync } from '../libs/helper';
import i18n from '../i18n';
import { initStore } from '../redux/store';
import MyLayout from '../components/Layout';
import Head from '../components/Head';
import CourseCard from '../components/CourseCard';
import { URL } from '../configs/app';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../libs/notification';

const FormItem = Form.Item;
const { Option } = Select;

class Course extends React.Component {
  state = {
    loading: false,
    categories: [],
    courses: [],
    selectedCategory: 0,
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
    this.setState({ loading: true });
    try {
      const { status, data: { courses } } = await fetchAsync('courses', { method: 'GET' });
      if (status === 200) {
        this.setState({ courses });
      }
    } catch (error) {
      openNotification(NOTIFICTION_ERROR, 'error', error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  handleChange = (value) => {
    this.setState({ selectedCategory: value });
  }

  render() {
    const { categories, selectedCategory } = this.state;
    const { t, i18n } = this.props;
    const fillteredCourses = this.state.courses.filter(c => (
      (selectedCategory === c.categoryId) || (selectedCategory === 0)
    ));

    const courses = fillteredCourses.map(c => (
      <Col key={c.id} span={8}>
        <CourseCard
          title={c.title}
          startDate={c.startDate}
          location={c.location}
          imgSrc={URL + c.cover}
        />
      </Col>
    ));

    return (
      <MyLayout>
        <Head title="coursetiny" />
        <Row style={{ margin: '24px 0' }}>
          <Col xs={{ span: 24, offset: 0 }} md={{ span: 18, offset: 3 }}>
            <Row gutter={16}>
              <Col xs={{ span: 20, offset: 2 }} sm={{ span: 5, offset: 0 }}>
                <FormItem
                  label={t('category')}
                >
                  <Select
                    showSearch
                    defaultValue={0}
                    style={{ width: '100%' }}
                    placeholder="Select a category"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option key={0} value={0}>All</Option>
                    {categories.map(c => (<Option key={c.id} value={c.id}>{c[i18n.language]}</Option>))}
                  </Select>
                </FormItem>
              </Col>
              <Col span={19}>
                <Row gutter={16}>
                  {courses}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </MyLayout>
    );
  }
}

const TranslatedCourse = translate(['common'], { i18n, wait: process.browser })(Course);

// Passing down initial translations
// use req.i18n instance on serverside to avoid overlapping requests set the language wrong
TranslatedCourse.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['common']);
  return {};
};

export default withRedux(initStore)(TranslatedCourse);
