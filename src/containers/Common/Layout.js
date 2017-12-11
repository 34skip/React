/**
 * Created by zhouchao on 16/11/26.
 */
// import React, {Component} from 'react'
// import { connect } from 'dva';
// import { ActivityIndicator } from 'antd-mobile';
import React, { Component } from 'react';
import { connect } from 'dva';
import { ActivityIndicator } from 'antd-mobile';
import WeiXinLogin from '../../utils/WeiXinHelper';
import Storage from '../../utils/Storage';

class Common extends Component{

  constructor(props){
    super(props);
    if(!Storage.get('txhweb-authToken')){

      WeiXinLogin.weiChatLoginByOpenId();

    }
  }

  render(){

    return(
      <div>
        <div className="container">
          {this.props.children}
        </div>

        <ActivityIndicator
          toast
          text={this.props.animatingText}
          animating={this.props.animating}
        />
      </div>
    );

  }
}
function mapStateToProps(state) {

  const {animating, animatingText} = state.common;
  return {
    animating,
    animatingText,
  };
}

export default connect(mapStateToProps)(Common);
