import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { sidebarItemStyle, colors } from '../../../constants/styles';
import styled from 'styled-components';

const logoutIcon = require('./logoutIcon.svg');

const Container = styled.div`
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


@Radium
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
      <Container>
        <div>
          {currentChannel && <div style={[ sidebarItemStyle.icon, sidebarItemStyle.channelIcon ]}></div>}
          {currentUser && <div style={[ sidebarItemStyle.icon, sidebarItemStyle.letterIcon ]}>{currentUser.get('username').charAt(0).toUpperCase()}</div>}
        </div>
        <Title>{currentChannel ? currentChannel.get('name') : currentUser.get('username')}</Title>
        <Right>
          <Username>{myUser.get('username')}</Username>
          <button onClick={this.onLogoutClick}><img alt='Logout' src={logoutIcon} title='Logout'/></button>
        </Right>
      </Container>
    );
  }

}
