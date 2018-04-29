import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { Row, Col, Icon } from 'antd';
import { translate } from 'react-i18next';
import Link from 'next/link';
import i18n from '../i18n';
import { initStore } from '../redux/store';
import MyLayout from '../components/Layout';
import Head from '../components/Head';
import CourseCard from '../components/CourseCard';
import CourseService from '../components/CourseService';
import Button from '../components/myComponents/Button';
import { fetchAsync } from '../libs/helper';
import { URL } from '../configs/app';

class Index extends React.Component {
  render() {
    const { t, courses } = this.props;
    const courseList = courses.map(c => (
      <Col xs={24} md={12} lg={8} key={c.id}>
        <CourseCard
          title={c.title}
          startDate={c.startDate}
          location={c.location}
          imgSrc={URL + c.cover}
        />
      </Col>
    ));
    return (
      <React.Fragment>
        <MyLayout>
          <Head title="coursetiny" />
          <div className="index-cover">
            <div className="caption">
              <span>Welcome to Coursetiny</span>
            </div>
          </div>
          <Row type="flex" align="middle">
            <Col xs={24} md={12} lg={8}>
              <div className="dropdown">
                <div className="dropdown-trigger">
                  <button className="button dropdown-style" aria-haspopup="true" aria-controls="dropdown-menu">
                    <Link href="/courses">
                      <span style={{ cursor: 'pointer' }}>
                        {t('category')}
                        <Icon type="down" style={{ marginLeft: 5, fontSize: 20, fontWeight: 500 }} />
                      </span>
                    </Link>
                  </button>
                </div>
              </div>
            </Col>
            <Col span={15}>
              <div style={{
                textAlign: 'right',
                fontSize: '20px',
              }}
              >
                <a href="#">SUPPORT FOR CUSTOMER</a>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={22} offset={1}>
              <div className="text-recommend">
                RECOMMEND COURSE /&nbsp;
                <a className="text-all" href="#">ALL</a>
              </div>
            </Col>
          </Row>

          <div className="main-content">

            <Row>
              <Col span={22} offset={1}>
                <Row gutter={24}>
                  {courseList}
                  <Col xs={24}>
                    <div style={{ margin: '20px 0', textAlign: 'center' }}>
                      <Button >
                        ดูรายละเอียดเพิ่มเติม
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>


            <div className="service-content">
              <div style={{
                color: '#29AAE3',
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
              >
                บริการ
              </div>
            </div>
          </div>

          <CourseService />

          <div className="contact-bar">ติดต่อ</div>

          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d814.3110892431605!2d100.4995333650388!3d13.866738272655612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x908bc219dd8f4458!2sComputer+Systems+Integration+Co.%2CLtd.!5e0!3m2!1sen!2sth!4v1519384652619" width="100%" height="600" frameBorder="0" style={{ border: 0, marginBottom: '-7px' }} allowFullScreen />
        </MyLayout>

        <style jsx>{`

          .index-cover {
              width: 100%;
              height: 400px;
              background: url(https://i.imgur.com/SvnuN4M.png);
              background-attachment: fixed;
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
          }

          .ant-carousel .slick-slide {
            text-align: center;
            height: 160px;
            line-height: 160px;
            background: #364d79;
            overflow: hidden;
          }

          .ant-carousel .slick-slide h3 {
            color: #fff;
          }

          .caption {
              color: #ffffff;
              position: absolute;
              left: 0;
              top: 25%;
              width: 100%;
              text-align: center;
              font-size: 30px;
              font-weight: 500;
          }

          .dropdown-style {
              font-size: 20px;
              color: white;
              height: 75px;
              width: 100%;
              background: #29AAE3;
              border: none;
              border-radius: 0;
          }

          .text-recommend {
            padding: 20px 0;
            font-size: 24px;
          }

          .text-all {
            color: #29aae3;
          }

          .main-content{
            width: 100%;
            margin-bottom: 30px;
          }

          .contact-bar {
            font-size: 24px;
            color: white;
            text-align: center;
            vertical-align: middle;
            height: 75px;
            width: 100%;
            background: #29AAE3;
            line-height: 75px;
          }

        `}
        </style>
      </React.Fragment>
    );
  }
}

const TranslatedIndex = translate(['common'], { i18n, wait: process.browser })(Index);

// Passing down initial translations
// use req.i18n instance on serverside to avoid overlapping requests set the language wrong
TranslatedIndex.getInitialProps = async ({ req }) => {
  const props = {};
  try {
    const { status, data: { courses } } = await fetchAsync('courses', { method: 'GET' });
    if (status !== 200) {
      res.statusCode = status;
      return { statusCode: status };
    }
    props.courses = courses;
  } catch (error) {
    props.courses = [];
  }

  if (req && !process.browser) return Object.assign(props, i18n.getInitialProps(req, ['common']));
  return props;
};

export default withRedux(initStore)(TranslatedIndex);
