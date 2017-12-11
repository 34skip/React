/**
 * Created by 34skip on 2017/6/12.
 */
import React, { Component } from 'react';
import { connect } from 'dva';


class Index extends Component {

  constructor(props) {
    super(props);

    props.dispatch({type: 'home/getCities'});

  }

  render() {

    return (
      <div>111</div>
    );
  }

}

Index.propTypes = {
};
function mapStateToProps(state) {

  const { ads } = state.home;
  return {
    ads
  };
}
export default connect(mapStateToProps)(Index);
