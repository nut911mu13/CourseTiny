import Link from 'next/link';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { Row, Col, Icon } from 'antd';
import styled from 'styled-components';
import { translate } from 'react-i18next';
import { fetchAsync } from '../libs/helper';
import i18n from '../i18n';
import { initStore } from '../redux/store';
import MyLayout from '../components/Layout';
import Head from '../components/Head';
import MyCourseCard from '../components/MyCourseCard';
import { URL } from '../configs/app';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../libs/notification';

const AddButton = styled.button`
  width: 100%;
  height: 190px;
  color: #29AAE3;
  border: 1px solid #29AAE3;
  text-align: center;
  background: white;
  outline: 0;
  transition: all 0.3s;
  margin-bottom: 16px;

  &:hover {
    cursor: pointer;
    color: white;
    background: #29AAE3;
  }
`;

class MyCourse extends React.Component {
  state = {
    loading: false,
    courses: [],
  }
  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const { status, data: { courses } } = await fetchAsync('user/courses', { method: 'GET' });
      if (status === 200) {
        this.setState({ courses });
      } else {
        openNotification(NOTIFICTION_ERROR, 'load course failed', data.error);
      }
    } catch (error) {
      openNotification(NOTIFICTION_ERROR, 'error', error.message);
    } finally {
      this.setState({ loading: false });
    }
  }
  render() {
    const columns = {
      xs: {
        span: 24, offset: 0,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 8,
      },
      xl: {
        span: 6,
      },
    };
    const myCourseCards = this.state.courses.map(c => (
      <Col {...columns}>
        <MyCourseCard
          title={c.title}
          imgSrc={URL + c.cover}
        />
      </Col>));
    return (
      <MyLayout>
        <Head title="profile - coursetiny" />
        <Row style={{ margin: '24px 0' }}>
          <Col xs={{ span: 24, offset: 0 }} md={{ span: 18, offset: 3 }}>
            <Row gutter={16}>
              <Col {...columns}>
                <Link href="/create">
                  <AddButton type="button">
                    <Icon type="plus" style={{ fontSize: '40px' }} /><br />เพิ่มคอร์สอบรมของคุณ
                  </AddButton>
                </Link>
              </Col>
              {myCourseCards}
            </Row>
          </Col>
        </Row>
      </MyLayout>
    );
  }
}

const TranslatedMyCourse = translate(['common'], { i18n, wait: process.browser })(MyCourse);

// Passing down initial translations
// use req.i18n instance on serverside to avoid overlapping requests set the language wrong
TranslatedMyCourse.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['common']);
  return {};
};

export default withRedux(initStore)(TranslatedMyCourse);
