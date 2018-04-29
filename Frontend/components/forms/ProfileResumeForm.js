import { Row, Col, Icon, Form } from 'antd';
import { translate } from 'react-i18next';
import FormTemplate from './FormTemplate';
import { ToolbarButton } from '../myComponents/Button';
import Modal from '../Modal';
import AddEducationForm from '../forms/AddEducationForm';
import AddExperienceForm from '../forms/AddExperienceForm';
import AddSkillForm from '../forms/AddSkillForm';

const WarningBar = ({ message }) => (
  <div
    style={{
      position: 'relative',
      margin: 13,
      padding: 3,
      border: '1px solid #F6A343',
      backgroundColor: '#F2F2F2',
      color: '#F6A343',
    }}
  >
    {message}
  </div>
);

const itemStyle = {
  position: 'relative',
  padding: 10,
  border: '1px solid lightgray',
};

const leftStyle = {
  xs: {
    span: 24,
  },
  sm: {
    span: 12,
  },
  md: {
    span: 6,
  },
  lg: {
    span: 5,
  },
  xl: {
    span: 4,
  },
};

const rightStyle = {
  xs: {
    span: 24,
  },
  sm: {
    span: 12,
  },
  md: {
    span: 18,
  },
  lg: {
    span: 19,
  },
  xl: {
    span: 20,
  },
};

const toolbarStyle = {
  position: 'absolute',
  right: 2,
  top: 5,
  display: 'inline-block',
};

const EduItem = ({
  id,
  university,
  facility,
  degree,
  onEdit,
  onDelete,
}) => (
  <div
    className="resume-item"
    style={itemStyle}
  >
    <Row gutter={16}>
      <Col {...leftStyle}>
        <p>มหาวิทยาลัย</p>
      </Col>
      <Col {...rightStyle}>
        <p>{university}</p>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col {...leftStyle}>
        <p>คณะ</p>
      </Col>
      <Col {...rightStyle}>
        <p>{facility}</p>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col {...leftStyle}>
        <p>ปริญญา</p>
      </Col>
      <Col {...rightStyle}>
        <p>{degree}</p>
      </Col>
    </Row>
    <div style={toolbarStyle}>
      <ToolbarButton warning type="button" onClick={() => onEdit('edu', id)}>
        <Icon type="edit" />
      </ToolbarButton>
      <ToolbarButton alert type="button" onClick={() => onDelete('edu', id)}>
        <Icon type="delete" />
      </ToolbarButton>
    </div>
  </div>
);

const ExpItem = ({
  id,
  company,
  position,
  startMonth,
  startYear,
  endMonth,
  endYear,
  currentCompany,
  onEdit,
  onDelete,
}) => (
  <div
    className="resume-item"
    style={itemStyle}
  >
    <Row gutter={16}>
      <Col {...leftStyle}>
        <p>บริษัท</p>
      </Col>
      <Col {...rightStyle}>
        <p>{company}</p>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col {...leftStyle}>
        <p>ตำแหน่ง</p>
      </Col>
      <Col {...rightStyle}>
        <p>{position}</p>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col {...leftStyle}>
        <p>เริ่มงานเมื่อ</p>
      </Col>
      <Col {...rightStyle}>
        <p>{startMonth} {startYear}</p>
      </Col>
    </Row>
    {currentCompany > 0
    ?
      <Row gutter={16}>
        <Col {...leftStyle}>
          <p>ปัจจุบันทำงานที่นี่</p>
        </Col>
        <Col {...rightStyle}>
          <p>ใช่</p>
        </Col>
      </Row>
    :
      <Row gutter={16}>
        <Col {...leftStyle}>
          <p>สิ้นสุดเมื่อ</p>
        </Col>
        <Col {...rightStyle}>
          <p>{endMonth} {endYear}</p>
        </Col>
      </Row>}
    <div style={toolbarStyle}>
      <ToolbarButton warning type="button" onClick={() => onEdit('exp', id)}>
        <Icon type="edit" />
      </ToolbarButton>
      <ToolbarButton alert type="button" onClick={() => onDelete('exp', id)}>
        <Icon type="delete" />
      </ToolbarButton>
    </div>
  </div>
);

const SkillItem = ({
  id,
  name,
  level,
  onEdit,
  onDelete,
}) => (
  <div
    className="resume-item"
    style={itemStyle}
  >
    <Row gutter={16}>
      <Col {...leftStyle}>
        <p>ทักษะ</p>
      </Col>
      <Col {...rightStyle}>
        <p>{name}</p>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col {...leftStyle}>
        <p>ระดับทักษะ</p>
      </Col>
      <Col {...rightStyle}>
        <p>{level}</p>
      </Col>
    </Row>
    <div style={toolbarStyle}>
      <ToolbarButton warning type="button" onClick={() => onEdit('skill', id)}>
        <Icon type="edit" />
      </ToolbarButton>
      <ToolbarButton alert type="button" onClick={() => onDelete('skill', id)}>
        <Icon type="delete" />
      </ToolbarButton>
    </div>
  </div>
);

class ProfileResume extends React.Component {
  state = {
    eduModal: {
      title: 'add education',
      show: false,
    },
    expModal: {
      title: 'add experience',
      show: false,
    },
    skillModal: {
      title: 'add skill',
      show: false,
    },
    selectedEdu: null,
    selectedExp: null,
    selectedSkill: null,
  }

  handleHideModal = (modal) => {
    this.setState({
      [modal]: {
        ...[modal],
        show: false,
      },
    });
  }

  handleShowEducation = () => {
    this.setState({
      eduModal: {
        title: 'add education',
        show: true,
      },
      selectedEdu: null,
    });
  }

  handleShowExperience = () => {
    this.setState({
      expModal: {
        title: 'add experience',
        show: true,
      },
      selectedExp: null,
    });
  }

  handleShowSkill = () => {
    this.setState({
      skillModal: {
        title: 'add skill',
        show: true,
      },
      selectedSkill: null,
    });
  }
  handleSubmitResume = (type, values) => {
    switch (type) {
      case 'edu':
        if (this.state.eduModal.title === 'add education') {
          this.props.onAdd('edu', values);
        } else if (this.state.eduModal.title === 'edit education') {
          this.props.onUpdate('edu', values);
        }
        this.handleHideModal('eduModal');
        break;
      case 'exp':
        if (this.state.expModal.title === 'add experience') {
          this.props.onAdd('exp', values);
        } else if (this.state.expModal.title === 'edit experience') {
          this.props.onUpdate('exp', values);
        }
        this.handleHideModal('expModal');
        break;
      case 'skill':
        if (this.state.skillModal.title === 'add skill') {
          this.props.onAdd('skill', values);
        } else if (this.state.skillModal.title === 'edit skill') {
          this.props.onUpdate('skill', values);
        }
        this.handleHideModal('skillModal');
        break;
      default:
    }
  }

  handleEditResume = (type, id) => {
    switch (type) {
      case 'edu':
        this.setState({
          eduModal: {
            title: 'edit education',
            show: true,
          },
          selectedEdu: this.props.education.filter(e => e.id === id)[0],
        });
        break;
      case 'exp':
        this.setState({
          expModal: {
            title: 'edit experience',
            show: true,
          },
          selectedExp: this.props.experience.filter(e => e.id === id)[0],
        });
        break;
      case 'skill':
        this.setState({
          skillModal: {
            title: 'edit skill',
            show: true,
          },
          selectedSkill: this.props.skills.filter(s => s.id === id)[0],
        });
        break;
      default:
    }
  }

  render() {
    const {
      education,
      experience,
      skills,
      userId,
      onDelete,
    } = this.props;
    const {
      eduModal,
      expModal,
      skillModal,
      selectedEdu,
      selectedExp,
      selectedSkill,
    } = this.state;
    return (
      <React.Fragment>
        <FormTemplate
          title="ประวัติการศึกษา"
          showButton
          buttonText="เพิ่มข้อมูล"
          onClick={this.handleShowEducation}
        >
          {education.length === 0 ? <WarningBar message="คุณต้องมีประวัติการศึกษาอย่างน้อย 1 เพื่อสร้างคอร์สอบรม" /> : null}
          {education.map(e =>
            (<EduItem
              key={e.id}
              id={e.id}
              university={e.university}
              facility={e.facility}
              degree={e.degree}
              onEdit={this.handleEditResume}
              onDelete={onDelete}
            />))}
        </FormTemplate>
        <br />
        <FormTemplate
          title="ประสบการณ์ทำงาน"
          showButton
          buttonText="เพิ่มข้อมูล"
          onClick={this.handleShowExperience}
        >
          {experience.length === 0 ? <WarningBar message="คุณต้องมีประสบการณ์ทำงานอย่างน้อย 1 เพื่อสร้างคอร์สอบรม" /> : null}
          {experience.map(e =>
            (<ExpItem
              key={e.id}
              id={e.id}
              company={e.company}
              position={e.position}
              startMonth={e.startMonth}
              startYear={e.startYear}
              endMonth={e.endMonth}
              endYear={e.endYear}
              currentCompany={e.currentCompany}
              onEdit={this.handleEditResume}
              onDelete={onDelete}
            />))}
        </FormTemplate>
        <br />
        <FormTemplate
          title="ทักษะและความสามารถ"
          showButton
          buttonText="เพิ่มข้อมูล"
          onClick={this.handleShowSkill}
        >
          {skills.map(s =>
            (<SkillItem
              key={s.id}
              id={s.id}
              name={s.name}
              level={s.level}
              onEdit={this.handleEditResume}
              onDelete={onDelete}
            />))}
        </FormTemplate>
        <Modal title={eduModal.title} show={eduModal.show} onHide={() => this.handleHideModal('eduModal')}>
          <AddEducationForm
            userId={userId}
            title={eduModal.title}
            education={selectedEdu}
            onSubmit={this.handleSubmitResume}
          />
        </Modal>
        <Modal title={expModal.title} show={expModal.show} onHide={() => this.handleHideModal('expModal')}>
          <AddExperienceForm
            userId={userId}
            title={expModal.title}
            experience={selectedExp}
            onSubmit={this.handleSubmitResume}
          />
        </Modal>
        <Modal title={skillModal.title} show={skillModal.show} onHide={() => this.handleHideModal('skillModal')}>
          <AddSkillForm
            userId={userId}
            title={skillModal.title}
            skill={selectedSkill}
            onSubmit={this.handleSubmitResume}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

const ProfileResumeForm = Form.create()(ProfileResume);

const TranslatedProfileResumeForm = translate(['common'])(ProfileResumeForm);

export default TranslatedProfileResumeForm;
