import React from 'react/addons'

export default class TasksSidebar extends React.Component {

    constructor() {
        super();
    }

    render() {
        var tasks = this.props.tasks.map(t => {
            return <li key={t.id} className="nav-block__item">
                <a onClick={this.props.onExecution.bind(null, t.id)} className="link link_second">{t.name}</a>
            </li>
        });
    	return  _.size(this.props.tasks) > 0
            ? <nav className="nav-block">
    			<span className="nav-block__title nav-block__title_type_second">Tasks</span>
                <ul className="nav-block__list">
                    {tasks}
                </ul>
    		 </nav>
            : false;
    }
}
