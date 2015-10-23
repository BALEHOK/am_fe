import React from 'react';
export default class DeloreanComponent extends React.Component {
  _isMounted = false

  isMounted(){
      return this._isMounted;
  }

  componentDidMount(){
      this._isMounted = true;
  }
}