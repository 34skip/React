import React, { Component } from 'react';
import { connect } from 'dva';


class Index extends Component {

  constructor(props) {
    super(props);

    props.dispatch({type: 'home/getCities'});

  }

  render() {

    return (
      <div>11122</div>
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
