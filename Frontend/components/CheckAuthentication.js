import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkAuth } from '../redux/actions/auth';

class CheckAuthentication extends React.Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    return <div />;
  }
}

const mapDispatchToProps = dispatch => ({
  checkAuth: bindActionCreators(checkAuth, dispatch),
});

export default connect(null, mapDispatchToProps)(CheckAuthentication);
