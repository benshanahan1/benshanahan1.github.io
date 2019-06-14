import React from 'react';
import { withRouter } from 'react-router-dom';


class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    // eslint-disable-next-line
    if (this.props.location !== prevProps.location) {
      // eslint-disable-next-line
      window.scrollTo(0, 0);
    }
  }

  render() {
    // eslint-disable-next-line
    return this.props.children;
  }
}


export default withRouter(ScrollToTop);
