import React from 'react';
import reactMixin from 'react-mixin';
import {Flux} from 'delorean';

@reactMixin.decorate(Flux.mixins.storeListener)
export default class StoreWatchComponent extends React.Component {
  _isMounted = false

  isMounted(){
      return this._isMounted;
  }

  componentDidMount(){
      this._isMounted = true;
  }
}