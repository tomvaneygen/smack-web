import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { colors } from '../../../constants/styles';
import styled, { css } from 'styled-components';

const IconContainer = styled.div`
  display: inline-block;
`;

const Icon = styled.div`
  align-items: center;
  border: solid 1px ${colors.grey};
  border-radius: 50%;
  color: ${colors.darkPurple};
  display: flex;
  flex: 0 0 20px;
  font-size: 13px;
  height: 20px;
  justify-content: center;
  width: 20px;
`;

const Header = styled.div`
  font-size: 12px;
`;

const Username = styled.div`
  color: ${colors.darkPurple};
  display: inline-block;
  margin-left: 13px;
  margin-right: 5px;
`;

const Timestamp = styled.div`
  color: ${colors.silver};
  display: inline-block;
  margin-right: 13px;
`;

const ContainerBaseCSS = css`
  list-style-type: none;
  padding: 10px 20px 10px 20px;
`;

const ContainerMineCSS = css`
  text-align: right;
`;

const MessageBaseCSS = css`
  background-color: ${colors.lightGrey};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  display: inline-block;
  margin-top: 16px;
  padding: 20px;
`;

const MessageMineCSS = css`
  background-color: ${colors.darkPurple};
  border-top-left-radius: 20px;
  border-top-right-radius: 0;
  color: ${colors.white};
`;

@Radium
export default class Message extends Component {

  static propTypes = {
    isMyMessage: PropTypes.bool.isRequired,
    message: ImmutablePropTypes.map.isRequired
  };

  formatDate (unix) {
    const pad = (n) => n < 10 ? `0${n}` : n;
    const d = new Date(unix);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${d.getHours()}:${pad(d.getMinutes())}`;
  }

  render () {
    const { isMyMessage, message } = this.props;
    const username = message.get('username');

    const icon = (
      <IconContainer>
        <Icon>{username.charAt(0).toUpperCase()}</Icon>
      </IconContainer>
    );

    const ContainerBase = styled.li`
      ${ContainerBaseCSS}
      ${isMyMessage && ContainerMineCSS}
  `;

    const MessageBase = styled.div`
      ${MessageBaseCSS}
      ${isMyMessage && MessageMineCSS}
  `;

    return (
      <ContainerBase>
        <Header>
          {!isMyMessage && icon}
          <Username>{username}</Username>
          <Timestamp>at {this.formatDate(message.get('timestamp'))}</Timestamp>
          {isMyMessage && icon}
        </Header>
        <MessageBase>
          {message.get('message')}
        </MessageBase>
      </ContainerBase>
    );
  }
}
