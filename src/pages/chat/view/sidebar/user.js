import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { colors } from '../../../../constants/styles';
import styled, { css } from 'styled-components';

const Info = styled.div`
width: 180px;
`;

const SubTitle = styled.div`
color: ${colors.silver};
font-size: 12px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`;

const Time = styled.div`
  color: ${colors.silver};
  float: right;
  fontSize: 12px;
  marginTop: 6px;
`;

const TitleCSS = css`
  align-items: center;
  color: ${colors.darkGrey};
  display: flex;
  font-size: 14px;
  margin-bottom: 4px;
  margin-top: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UsernameCSS = css`
  color: ${colors.darkPurple};
`;

const TitleUsername = styled.div`
  ${TitleCSS}
  ${UsernameCSS}
`;

const StatusBaseCSS = css`
  border-radius: 50%;
  height: 6px;
  margin-left: 7px;
  width: 6px;
`;

const StatusOnlineCSS = css`
  background-color: ${colors.green};
`;

const StatusOfflineCSS = css`
  background-color: ${colors.silver};
`;

const IconCSS = css`
  align-items: center;
  border: solid 1px ${colors.grey};
  border-radius: 50%;
  display: flex;
  flex: 0 0 40px;
  height: 40px;
  justify-content: center;
  margin-right: 20px;
  width: 40px;
`;

const LetterIconCSS = css`
  color: ${colors.darkPurple};
  font-size: 26px;
`;

const LetterIcon = styled.div`
  ${IconCSS}
  ${LetterIconCSS}
`;

const ContainerBaseCSS = css`
  border-bottom: 1px solid ${colors.grey};
  border-right: 1px solid ${colors.grey};
  cursor: pointer;
  display: flex;
  height: 80px;
  list-style-type: none;
  padding: 20px;
`;

const ContainerUserCSS = css`
  background-color: ${colors.lightGrey};
  border-left: 2px solid ${colors.lightGrey};
`;

const ContainerSelectedCSS = css`
  border-left: 2px solid ${colors.darkPurple};
`;

export default class User extends Component {

  static propTypes = {
    selected: PropTypes.bool.isRequired,
    user: ImmutablePropTypes.map.isRequired,
    onClickUser: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onClick = ::this.onClick;
  }

  formatDate (unix) {
    const pad = (n) => n < 10 ? `0${n}` : n;
    const d = new Date(unix);
    return `${d.getHours()}:${pad(d.getMinutes())}`;
  }

  onClick (e) {
    e.preventDefault();
    this.props.onClickUser(this.props.user.get('id'));
  }

  render () {
    const { selected, user } = this.props;
    const lastMessage = user.get('lastMessage');

    const Status = styled.div`
      ${StatusBaseCSS}
      ${user.get('status') === 'online' ? StatusOnlineCSS : StatusOfflineCSS}
  `;

    const UserListItem = styled.div`
    ${ContainerBaseCSS}
    ${ContainerUserCSS}
    ${selected && ContainerSelectedCSS}
  `;

    return (
      <UserListItem
        onClick={this.onClick}>
        <div>
          <LetterIcon>{user.get('username').charAt(0).toUpperCase()}</LetterIcon>
        </div>
        <Info>
          <Time>{lastMessage && this.formatDate(lastMessage.get('timestamp'))}</Time>
          <TitleUsername>
            {user.get('username')}
            <Status>&nbsp;</Status>
          </TitleUsername>

          <SubTitle>{lastMessage && lastMessage.get('message')}</SubTitle>
        </Info>
      </UserListItem>
    );
  }

}
