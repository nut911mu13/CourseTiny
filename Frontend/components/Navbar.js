import Link from 'next/link';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Avatar, Menu, Dropdown, Radio } from 'antd';
import styled from 'styled-components';
import { translate } from 'react-i18next';
import { showModalSign } from '../redux/actions/modal';
import { signOut } from '../redux/actions/auth';
import { URL } from '../configs/app';

const ProfileWrapper = styled.div`
    .icon-box {
        width: 30px;
    }

    .dropdown-item {
        padding: 0 30px 0 30px;
    }

    a.dropdown-item:hover, a.dropdown-item.is-active {
        color: white;
        front-weight: bold;
        background-color: #29AAE3;
    }

    .ant-menu {
        border: 1px solid #dbdbdb;
    }

    .ant-menu-item-divider {
        background-color: #dbdbdbd;
    }

    .ant-menu-item {
        padding: 0;
        margin: 0;
    }

    .ant-menu-vertical .ant-menu-item:not(:last-child) {
        margin-bottom: 0px;
    }

    .ant-radio-button-wrapper:first-child {
        border-radius: 16px 0 0 16px;
    }

    .ant-radio-button-wrapper:last-child {
        border-radius: 0 16px 16px 0;
    }
`;

class Navbar extends React.Component {
  handleChangeLanguage = (e) => {
    this.props.i18n.changeLanguage(e.target.value);
  }
  render() {
    const {
      t,
      i18n,
      showModalSign,
      signOut,
      auth,
    } = this.props;

    const menu = (
      <ProfileWrapper>
        <Menu>
          <Menu.Item key="0">
            <Link href="/profile">
              <a className="dropdown-item">
                <div className="icon-box in-block">
                  <i className="far fa-address-card fa-lg" />
                </div>
                <div className="in-block font">{t('editProfile')}</div>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link href="/order-history">
              <a className="dropdown-item">
                <div className="icon-box in-block">
                  <i className="far fa-list-alt fa-lg" />
                </div>
                <div className="in-block font">{t('orderHistory')}</div>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/my-courses">
              <a className="dropdown-item">
                <div className="icon-box in-block">
                  <i className="fas fa-briefcase fa-lg" />
                </div>
                <div className="in-block font">{t('yourCourse')}</div>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <a className="dropdown-item">
              <div className="icon-box in-block" style={{ fontSize: '12px' }}>
                <i className="far fa-money-bill-alt fa-lg" />
              </div>
              <div className="in-block font">{t('withdraw')}</div>
            </a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="4">
            <a className="dropdown-item" style={{ padding: '0 2rem' }} onClick={signOut} >
              <div className="icon-box in-block" style={{ fontSize: '16px' }}>
                <i className="fas fa-sign-out-alt fa-lg" />
              </div>
              <div className="in-block font">{t('signOut')}</div>
            </a>
          </Menu.Item>
        </Menu>
      </ProfileWrapper>
    );
    return (
      <div>
        <div className="logo">
          <Link href="/">
            <a>
              <i className="fas fa-copyright" />
              <span className="title">COURSETINY</span>
            </a>
          </Link>
        </div>
        <div className="right-menu">
          <span className="menu-item">{t('courseService')}</span>
          <Link prefetch href="/courses"><span className="menu-item">{t('courses')}</span></Link>
          <span className="menu-item">{t('contact')}</span>
          {!auth.isAuthenticated
            ?
              <span className="menu-item" onClick={showModalSign}>{t('signIn')} / {t('signUp')}</span>
            : null
          }
          <Radio.Group size="default" defaultValue={i18n.language} onChange={this.handleChangeLanguage}>
            <Radio.Button
              value="en"
              style={{
              borderTopLeftRadius: '16px',
              borderBottomLeftRadius: '16px',
             }}
            >EN
            </Radio.Button>
            <Radio.Button
              value="th"
              style={{
              borderTopRightRadius: '16px',
              borderBottomRightRadius: '16px',
             }}
            >TH
            </Radio.Button>
          </Radio.Group>
          {auth.isAuthenticated
          ?
            <Dropdown overlay={menu}>
              <span className="menu-item">
                <Avatar src={auth.profilePhoto ? URL + auth.profilePhoto : ''} />
                <i className="fas fa-chevron-down margin-left" />
              </span>
            </Dropdown>
          : null }
        </div>
        <style jsx>{`
          .logo {
            float: left;
            font-size: 32px;
            margin-top: 11px 0 0 0;
          }
          .title {
            font-size: 16px;
            font-weight: 600;
            margin-left: 20px;
            vertical-align: top;
          }
          .menu-item {
            font-size: 16px;
            font-weight: 300;
            cursor: pointer;
            padding: 0 12px;
            display: inline-block;
            height: 100%;
          }
          .right-menu {
            float: right;
            height: 100%;
          }
          .margin-left {
            margin-left: 10px;
          }
          @media only screen and (max-width: 480px) {
            .menu-item {
              display: none;
            }
          }
        `}
        </style>
      </div>
    );
  }
}

const TranslatedNavbar = translate(['common'])(Navbar);

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  showModalSign: bindActionCreators(showModalSign, dispatch),
  signOut: bindActionCreators(signOut, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TranslatedNavbar);
