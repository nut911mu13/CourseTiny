import withRedux from 'next-redux-wrapper';
import { translate } from 'react-i18next';
import i18n from '../i18n';
import { initStore } from '../redux/store';
import MyLayout from '../components/Layout';
import Head from '../components/Head';
import CreateCourseForm from '../components/forms/CreateCourseForm';
import Modal from '../components/Modal';
import AddTicketForm from '../components/forms/AddTicketForm';

class Create extends React.Component {
  state = {
    showModal: false,
    nextTicketId: 1,
    tickets: [],
    selectedTicket: null,
    ticketModalTitle: '',
  }

  resetForm = () => {
    this.setState({
      showModal: false,
      nextTicketId: 1,
      tickets: [],
      selectedTicket: null,
    });
  }

  handleHideModal = () => {
    this.setState({ showModal: false });
  }

  handleAddTicket = () => {
    this.setState({
      ticketModalTitle: this.props.t('addTicket'),
      selectedTicket: null,
      showModal: true,
    });
  }

  handleSubmitTicket = (ticket) => {
    const {
      name,
      detail,
      price,
      quantity,
      startDate,
      endDate,
    } = ticket;
    if (this.state.ticketModalTitle === this.props.t('addTicket')) {
      const nextTicketId = this.state.nextTicketId + 1;
      this.setState({
        showModal: false,
        selectedTicket: null,
        nextTicketId,
        tickets: [
          ...this.state.tickets,
          {
            key: this.state.nextTicketId,
            name,
            detail,
            startDate,
            endDate,
            price,
            quantity,
          },
        ],
      });
    } else if (this.state.ticketModalTitle === this.props.t('editTicket')) {
      this.setState({
        showModal: false,
        tickets: this.state.tickets.map(t => (
          (t.key === this.state.selectedTicket.key)
            ? {
              key: t.key,
              name,
              detail,
              startDate,
              endDate,
              price,
              quantity,
            }
            : t
        )),
      });
    }
  }

  handleDeleleTicket = (id) => {
    this.setState({
      tickets: this.state.tickets.filter(t => t.key !== id),
    });
  }

  handleEditTicket = (id) => {
    const [selectedTicket] = this.state.tickets.filter(t => t.key === id);
    this.setState({
      ticketModalTitle: this.props.t('editTicket'),
      selectedTicket,
      showModal: true,
    });
  }

  render() {
    const {
      showModal,
      tickets,
      selectedTicket,
      ticketModalTitle,
    } = this.state;
    return (
      <MyLayout>
        <Head title="coursetiny" />
        <div style={{ margin: '24px 0px', padding: '0 8px' }}>
          <CreateCourseForm
            onAddTicket={this.handleAddTicket}
            onEditTicket={this.handleEditTicket}
            onDeleteTicket={this.handleDeleleTicket}
            onSubmit={this.resetForm}
            tickets={tickets}
          />
        </div>
        <Modal title={ticketModalTitle} show={showModal} onHide={this.handleHideModal}>
          <AddTicketForm
            onSubmit={this.handleSubmitTicket}
            ticket={selectedTicket}
          />
        </Modal>
      </MyLayout>
    );
  }
}

const TranslatedCreate = translate(['create_course', 'common'], { i18n, wait: process.browser })(Create);

// Passing down initial translations
// use req.i18n instance on serverside to avoid overlapping requests set the language wrong
TranslatedCreate.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['create_course', 'common']);
  return {};
};

export default withRedux(initStore)(TranslatedCreate);
