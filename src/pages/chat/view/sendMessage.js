import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { reduxForm } from 'redux-form';
import { colors } from '../../../constants/styles';
import styled from 'styled-components';

const Container = styled.form`
  display: flex;
  font-size: 16px;
`;

const Input = styled.input`
  border-radius: 6px;
  color: ${colors.darkGrey};
  width: 100%;
  height: 40px;
  display: inline-block;
  padding: 10px 70px 10px 18px;
`;

const Button = styled.button`
  color: ${colors.darkPurple};
  height: 40px;
  margin-left: -70px;
  padding: 0 16px 0 16px;
  position: absolute;
`;

const Div = styled.div`
  backgroundColor: ${colors.lightGrey};
  borderTop: 1px solid ${colors.grey};
  bottom: 0;
  height: 80px;
  left: 280px;
  padding: 20px;
  position: absolute;
  right: 0;
`;

@reduxForm({
  fields: [ 'message', 'userId' ],
  form: 'messageForm',
  // Get the form state. Because we are working with an Immutable state,
  // we need to tell redux-form how to extract the 'form' part of the state.
  // reduxMountPoint is by default = 'form'
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint)
})
@Radium
export default class SendMessage extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    style: PropTypes.object,
    submitting: PropTypes.bool.isRequired
  };

  render () {
    const { fields: { message }, handleSubmit, submitting } = this.props;

    return (
      <Div>
        <Container onSubmit={handleSubmit}>
          <Input {...message} autoComplete='off' placeholder='Write something...' type='text' />
          <Button disabled={submitting} type='submit'>Send</Button>
        </Container>
      </Div>
    );
  }
}
