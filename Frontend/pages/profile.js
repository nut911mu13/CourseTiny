import { Row, Col } from 'antd';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import i18n from '../i18n';
import { initStore } from '../redux/store';
import { fetchAsync } from '../libs/helper';
import MyLayout from '../components/Layout';
import Head from '../components/Head';
import ProfileMenu from '../components/ProfileMenu';
import CreateProfile from '../components/forms/CreateProfile';
import ProfileBasicForm from '../components/forms/ProfileBasicForm';
import ProfileIdCardForm from '../components/forms/ProfileIdCardForm';
import Tabs, { TabPane } from '../components/myComponents/Tabs';
import Spin from '../components/myComponents/Spin';
import ProfileBankForm from '../components/forms/ProfileBankForm';
import ProfileResumeForm from '../components/forms/ProfileResumeForm';
import { URL } from '../configs/app';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../libs/notification';

class ProfileIndex extends React.Component {
  state = {
    user: {},
    loading: true,
    profileStatus: {
      primary: false,
      basic: false,
      resume: false,
      idcard: false,
      bank: false,
    },
  }

  async componentDidMount() {
    if (this.props.auth.userId) {
      this.fetchUserProfile(this.props.auth.userId);
    }
  }

  async componentWillReceiveProps({ auth }) {
    if (auth.userId && auth.userId !== this.props.auth.userId) {
      this.fetchUserProfile(auth.userId);
    } else if (!auth.userId) {
      openNotification(NOTIFICTION_ERROR, 'error', 'you are not authorized');
      this.resetForm();
    }
  }

  fetchUserProfile = async (userId) => {
    this.setState({ loading: true });
    try {
      const { status, data: { user } } = await fetchAsync(`user/${userId}`, { method: 'GET' });
      user.education = JSON.parse(user.education);
      user.experience = JSON.parse(user.experience);
      user.skills = JSON.parse(user.skills);
      if (status === 200) {
        this.setState({
          user,
          loading: false,
          profileStatus: this.profileStatusChecker(user),
        });
      } else {
        openNotification(NOTIFICTION_ERROR, 'error', data.error);
        this.resetForm();
      }
    } catch (error) {
      openNotification(NOTIFICTION_ERROR, 'error', error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  profileStatusChecker = (profile) => {
    return {
      primary: true,
      basic: profile.aboutMe ? true : false,
      resume: profile.education.length > 0 && profile.experience.length > 0,
      idcard: profile.idCardNumber ? true : false,
      bank: profile.accountNo ? true : false,
    };
  }

  resetForm = () => {
    this.setState({
      user: {},
      loading: true,
      profileStatus: {
        primary: false,
        basic: false,
        resume: false,
        idcard: false,
        bank: false,
      },
    });
  }

  handleUpdateProfile = (values) => {
    this.setState({
      user: {
        ...this.state.user,
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        birthday: values.birthday,
        sex: values.sex,
        mobileNumber: values.mobileNumber,
      },
    });
  }

  handleUpdateProfilePhoto = (imagePath) => {
    this.setState({
      user: {
        ...this.state.user,
        profilePhoto: imagePath,
      },
    });
  }

  handleUpdateProfileBasic = (values) => {
    const user = {
      ...this.state.user,
      aboutMe: values.aboutMe,
      website: values.website,
    };

    this.setState({
      user,
      profileStatus: this.profileStatusChecker(user),
    });
  }

  handleUpdateIdCard = (values) => {
    const user = {
      ...this.state.user,
      idCardNumber: values.number,
      idCardTitle: values.titleId,
      idCardFirstName: values.firstName,
      idCardLastName: values.lastName,
      idCardMaritalStatusId: values.maritalStatusId,
      idCardCurrentAddress: values.currentAddress,
      idCardAddress: values.idCardAddress,
    };

    this.setState({
      user,
      profileStatus: this.profileStatusChecker(user),
    });
  }

  handleUpdateBank = (values) => {
    const user = {
      ...this.state.user,
      bankId: values.bankId,
      branch: values.branch,
      accountNo: values.accountNo,
    };

    this.setState({
      user,
      profileStatus: this.profileStatusChecker(user),
    });
  }

  handleAddResume = (type, values) => {
    const { user } = this.state;
    switch (type) {
      case 'edu':
        this.setState({
          user: {
            ...user,
            education: [
              ...user.education,
              {
                id: values.id,
                university: values.university,
                facility: values.facility,
                degree: values.degree,
              },
            ],
          },
        });
        break;
      case 'exp':
        this.setState({
          user: {
            ...user,
            experience: [
              ...user.experience,
              {
                id: values.id,
                company: values.company,
                position: values.position,
                startMonth: values.startMonth,
                startYear: values.startYear,
                endMonth: values.endMonth,
                endYear: values.endYear,
                currentCompany: values.isCurrent,
              },
            ],
          },
        });
        break;
      case 'skill':
        this.setState({
          user: {
            ...user,
            skills: [
              ...user.skills,
              {
                id: values.id,
                name: values.name,
                level: values.level,
              },
            ],
          },
        });
        break;
      default:
    }
    this.setState({
      profileStatus: this.profileStatusChecker(this.state.user),
    });
  };

  handleUpdateResume = (type, values) => {
    const { user } = this.state;
    switch (type) {
      case 'edu':
        this.setState({
          user: {
            ...user,
            education: user.education.map(e => (
              (e.id === values.id)
                ?
                {
                  id: values.id,
                  university: values.university,
                  facility: values.facility,
                  degree: values.degree,
                }
                : e
            )),
          },
        });
        break;
      case 'exp':
        this.setState({
          user: {
            ...user,
            experience: user.experience.map(e => (
              (e.id === values.id)
                ?
                {
                  id: values.id,
                  company: values.company,
                  position: values.position,
                  startMonth: values.startMonth,
                  startYear: values.startYear,
                  endMonth: values.endMonth,
                  endYear: values.endYear,
                  currentCompany: values.isCurrent,
                }
                : e
            )),
          },
        });
        break;
      case 'skill':
        this.setState({
          user: {
            ...user,
            skills: user.skills.map(s => (
              (s.id === values.id)
                ?
                {
                  id: values.id,
                  name: values.name,
                  level: values.level,
                }
                : s
            )),
          },
        });
        break;
      default:
    }
    this.setState({
      profileStatus: this.profileStatusChecker(this.state.user),
    });
  };

  handleDeleteResume = async (type, id) => {
    switch (type) {
      case 'edu':
        await this.fetchDeleteEdu(id);
        break;
      case 'exp':
        await this.fetchDeleteExp(id);
        break;
      case 'skill':
        await this.fetchDeleteSkill(id);
        break;
      default:
    }
    this.setState({
      profileStatus: this.profileStatusChecker(this.state.user),
    });
  };

  fetchDeleteEdu = async (id) => {
    const { user } = this.state;
    const { userId } = this.props.auth;
    this.setState({ loading: true });
    try {
      const { status } = await fetchAsync(`user/${userId}/education/${id}`, { method: 'DELETE' });
      if (status === 200) {
        this.setState({
          user: {
            ...user,
            education: user.education.filter(e => e.id !== id),
          },
          loading: false,
        });
        openNotification(NOTIFICTION_SUCCESS, 'delete successfully', 'you have deleted your education');
      } else {
        openNotification(NOTIFICTION_ERROR, 'error', data.error);
      }
    } catch (error) {
      openNotification(NOTIFICTION_ERROR, 'error', error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  fetchDeleteExp = async (id) => {
    const { user } = this.state;
    const { userId } = this.props.auth;
    this.setState({ loading: true });
    try {
      const { status } = await fetchAsync(`user/${userId}/experience/${id}`, { method: 'DELETE' });
      if (status === 200) {
        this.setState({
          user: {
            ...user,
            experience: user.experience.filter(e => e.id !== id),
          },
          loading: false,
        });
        openNotification(NOTIFICTION_SUCCESS, 'delete successfully', 'you have deleted your experience');
      } else {
        openNotification(NOTIFICTION_ERROR, 'error', data.error);
      }
    } catch (error) {
      openNotification(NOTIFICTION_ERROR, 'error', error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  fetchDeleteSkill = async (id) => {
    const { user } = this.state;
    const { userId } = this.props.auth;
    this.setState({ loading: true });
    try {
      const { status } = await fetchAsync(`user/${userId}/skills/${id}`, { method: 'DELETE' });
      if (status === 200) {
        this.setState({
          user: {
            ...user,
            skills: user.skills.filter(s => s.id !== id),
          },
          loading: false,
        });
        openNotification(NOTIFICTION_SUCCESS, 'delete successfully', 'you have deleted your skill');
      } else {
        openNotification(NOTIFICTION_ERROR, 'error', data.error);
      }
    } catch (error) {
      openNotification(NOTIFICTION_ERROR, 'error', error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { tab } = this.props.url.query;
    const { loading, profileStatus, user } = this.state;
    const { auth: { userId } } = this.props;
    return (
      <MyLayout>
        <Head title="profile - coursetiny" />
        <Row style={{ margin: '24px 0' }}>
          <Col xs={16} offset={4}>
            <Row gutter={12}>
              <Col span={7}>
                <ProfileMenu profileStatus={profileStatus} loading={loading} />
              </Col>
              <Col span={17}>
                <Spin spinning={loading} size="large">
                  <Tabs type="card" activeKey={tab || 'index'}>
                    <TabPane tab="index" key="index">
                      <CreateProfile
                        userId={userId}
                        email={user.email}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        username={user.username}
                        birthday={user.birthday}
                        sex={user.sex}
                        mobileNumber={user.mobileNumber}
                        profilePhoto={user.profilePhoto}
                        onUpdate={this.handleUpdateProfile}
                        onUpdateProfilePhoto={this.handleUpdateProfilePhoto}
                      />
                    </TabPane>
                    <TabPane tab="basic" key="basic">
                      <ProfileBasicForm
                        userId={userId}
                        aboutMe={user.aboutMe || ''}
                        website={user.website || ''}
                        onUpdate={this.handleUpdateProfileBasic}
                      />
                    </TabPane>
                    <TabPane tab="resume" key="resume">
                      <ProfileResumeForm
                        userId={userId}
                        education={user.education || []}
                        experience={user.experience || []}
                        skills={user.skills || []}
                        onAdd={this.handleAddResume}
                        onUpdate={this.handleUpdateResume}
                        onDelete={this.handleDeleteResume}
                      />
                    </TabPane>
                    <TabPane tab="idcard" key="idcard">
                      <ProfileIdCardForm
                        userId={userId}
                        idCardNumber={user.idCardNumber || ''}
                        idCardTitle={user.idCardTitle || 1}
                        idCardFirstName={user.idCardFirstName || ''}
                        idCardLastName={user.idCardLastName || ''}
                        idCardMaritalStatusId={user.idCardMaritalStatusId || 1}
                        idCardCurrentAddress={user.idCardCurrentAddress || ''}
                        idCardAddress={user.idCardAddress || ''}
                        onUpdate={this.handleUpdateIdCard}
                      />
                    </TabPane>
                    <TabPane tab="bank" key="bank">
                      <ProfileBankForm
                        userId={userId}
                        bankId={user.bankId || 1}
                        branch={user.branch || ''}
                        accountNo={user.accountNo || ''}
                        onUpdate={this.handleUpdateBank}
                      />
                    </TabPane>
                  </Tabs>
                </Spin>
              </Col>
            </Row>
          </Col>
        </Row>

        <style jsx>{`

          .form-title {
            font-weight: 500;
            padding: 10px;
          }

        `}
        </style>

      </MyLayout>
    );
  }
}

const TranslatedProfileIndex = translate(['common'], { i18n, wait: process.browser })(ProfileIndex);

// Passing down initial translations
// use req.i18n instance on serverside to avoid overlapping requests set the language wrong
TranslatedProfileIndex.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['common']);
  return {};
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default withRedux(initStore, mapStateToProps)(TranslatedProfileIndex);
