import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { channelIcon, colors } from '../../../../constants/styles';
import styled, { css } from 'styled-components';

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

const ChannelIcon = styled.div`
  ${IconCSS}
  ${channelIconCSS}
`;

const Info = styled.div`
  width: 180px;
`;

const Title = styled.div`
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

const SubTitle = styled.div`
  color: ${colors.silver};
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BaseCSS = css`
  border-bottom: 1px solid ${colors.grey};
  border-right: 1px solid ${colors.grey};
  cursor: pointer;
  display: flex;
  height: 80px;
  list-style-type: none;
  padding: 20px;
`;

const ChannelCSS = css`
  background-color: ${colors.white};
  border-left: 2px solid ${colors.white};
`;

const SelectedCSS = css`
  border-left: 2px solid ${colors.darkPurple};
`;

export default class Channel extends Component {

  static propTypes = {
    channel: ImmutablePropTypes.map.isRequired,
    selected: PropTypes.bool.isRequired,
    onClickChannel: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onClick = ::this.onClick;
  }

  onClick (e) {
    e.preventDefault();
    this.props.onClickChannel(this.props.channel.get('id'));
  }

  render () {
    const { channel, selected } = this.props;

    const ChannelItem = styled.li`
      ${BaseCSS}
      ${ChannelCSS}
      ${selected && SelectedCSS}
`;

    return (
      <ChannelItem onClick={this.onClick}>
        <div>
          <ChannelIcon />
        </div>
        <Info>
          <Title>{channel.get('name')}</Title>
          <SubTitle>with {channel.get('onlineUsers')} people</SubTitle>
        </Info>
      </ChannelItem>
    );
  }

}
