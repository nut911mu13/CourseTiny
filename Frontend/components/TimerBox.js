import moment from 'moment';

class TimerBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingTime: props.remainingTime,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        remainingTime: prevState.remainingTime - 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const remainingTime = this.state.remainingTime > 0
      ? moment('1900-01-01 00:00:00').add(this.state.remainingTime, 'seconds').format('mm:ss')
      : 'Timeout!';
    return (
      <div className="timer-box">
        <div className="timer-head timer-text">Hold Tickets</div>
        <div className="timer-body timer-text">{remainingTime}</div>
        <style jsx>{`
          .timer-box {
            width: 240px;
            height: 140px;
            float: right;
            border: 3px solid #29AAE3;
            box-sizing: border-box;
          }
          .timer-text {
              font-size: 32px;
              font-weight: 500;
              text-align: center;
              height: 50%;
              line-height: 2.2;
          }
          .timer-head {
              color: white;
              background-color: #29AAE3;
          }
          .timer-body {
              color: #29AAE3;
          }
        `}</style>
      </div>
    );
  }
}

export default TimerBox;
