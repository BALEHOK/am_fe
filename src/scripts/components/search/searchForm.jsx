/**
 * @jsx React.DOM
 */

var React = require('react');

var SearchForm = React.createClass({
    render: function() {
        return (
          <div className="wrap-block">
            <div className="title-subsection">Search</div> 
            <ul role="tablist" className="nav nav-pills search-tabs">
              <li className="active"><a data-toggle="tab" role="tab" href="#simple">Simple</a></li>
              <li><a data-toggle="tab" role="tab" href="#by_type">By type</a></li>
            </ul>
            <div className="tab-content">
              <div id="simple" className="tab-pane active">
                <div className="row">
                  <div className="col-md-7">
                    <div className="input-group shadow-input-group">
                      <div className="input-group-btn">
                        <button data-toggle="dropdown" className="btn btn-default dropdown-toggle gradient-form-grey fixed-static-search" type="button">Active assets <span className="caret" /></button>
                        <ul role="menu" className="dropdown-menu dropdown-sticky fixed-static-search">
                          <li><a href="#">History</a></li>
                        </ul> 
                      </div>
                      <input type="text" placeholder="Search asset" className="form-control has-button-right" />
                      <div className="input-group-btn">
                        <button data-toggle="dropdown" className="btn gradient-form-green" type="button">
                          <span className="fa fa-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-1 separator-horizontal">
                    <span>OR</span>
                  </div>
                  <div className="col-md-2">
                    <div className="input-group shadow-input-group">
                      <button onclick="location.href='by_type.html'" data-toggle="dropdown" className="btn btn-default btn-wide-padder" type="button">
                        Search by type
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div id="by_type" className="tab-pane">
              </div>
            </div>         
          </div>
      );
    }
});
module.exports = SearchForm;