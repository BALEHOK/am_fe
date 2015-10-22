import Actions from './Actions';

export default class DynamicAttributeActions extends Actions {
  loadDynList(listId) {
    return this._dispatcher.loadDynList(listId);
  }
}
