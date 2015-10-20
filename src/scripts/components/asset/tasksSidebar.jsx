import React from 'react/addons'

export default class TasksSidebar extends React.Component {

    constructor() {
        super();
    }

    render() {
        var tasks = this.props.tasks.map(t => {
            return <div className="nav-block__item">{t.name}</div>
        });
    	return  _.size(this.props.tasks) > 1
            ? <nav className="nav-block">
    			<span className="nav-block__title nav-block__title_type_second">Tasks</span>
                {tasks}
    		 </nav>
            : false;
    }
}
