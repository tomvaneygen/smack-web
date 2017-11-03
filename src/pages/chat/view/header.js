import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { colors, channelIcon } from '../../../constants/styles';
import styled, { css } from 'styled-components';

const logoutIcon = require('./logoutIcon.svg');

const HeaderContainer = styled.div`
  background-color: ${colors.lightGrey};
  display: flex;
  height: 80px;
  padding: 20px;
  width: 100%;
`;

const Title = styled.div`
  color: ${colors.silver};
  font-size: 26px;
  margin-top: 5px;
`;

const Right = styled.div`
  align-items: center;
  color: ${colors.darkPurple};
  display: flex;
  font-size: 14px;
  margin-left: auto;
  padding: 10px 0 11px 0;
`;

const Username = styled.span`
  margin-right: 14px;
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

const channelIconCSS = css`
  background-image: url('${channelIcon}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px 20px;
`;

const LetterIconCSS = css`
  color: ${colors.darkPurple};
  font-size: 26px;
`;

const ChannelIcon = styled.div`
  ${IconCSS}
  ${channelIconCSS}
`;

const LetterIcon = styled.div`
  ${IconCSS}
  ${LetterIconCSS}
`;

export default class Header extends Component {
  static propTypes = {
    currentChannel: ImmutablePropTypes.map,
    currentUser: ImmutablePropTypes.map,
    logout: PropTypes.func.isRequired,
    myUser: ImmutablePropTypes.map.isRequired
  }

  constructor (props) {
    super(props);
    this.onLogoutClick = ::this.onLogoutClick;
  }

  onLogoutClick (e) {
    e.preventDefault();
    this.props.logout();
  }

  render () {
    const { currentChannel, currentUser, myUser } = this.props;
    return (
      <HeaderContainer>
        <div>
          {currentChannel && <ChannelIcon />}
          {currentUser && <LetterIcon>{currentUser.get('username').charAt(0).toUpperCase()}</LetterIcon>}
        </div>
        <Title>{currentChannel ? currentChannel.get('name') : currentUser.get('username')}</Title>
        <Right>
          <Username>{myUser.get('username')}</Username>
          <button onClick={this.onLogoutClick}><img alt='Logout' src={logoutIcon} title='Logout'/></button>
        </Right>
      </HeaderContainer>
    );
  }

}
