import React from 'react';

export default  class Attribute extends React.Component {
    render () {
        let params = this.props.params;
        return (
            <div className="asset-data__param" data-param-id={params.id}>
                <span className="asset-data__param-title">{params.name}:</span>
                <span className="asset-data__param-content" dangerouslySetInnerHTML={{__html: params.value}} />
            </div>
        );
    }
}
