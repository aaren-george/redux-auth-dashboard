// Import React/redux
import React, { Component } from 'react'
import { connect } from 'react-redux'

// Import actions
import { addTodo } from '../actions'

// Import components
import TodoList from '../components/TodoList'
import TodoAddForm from '../components/TodoAddForm'

// Import stylesheets
import styles from '../styles/global.scss'

/**
 * <App />
 */
class App extends Component {
	/**
	 * Renders the component
	 */
	render() {
		const { data, info, dispatch } = this.props
		return (
			<div className={styles.intro}>
				<h1>{info.title}</h1>
				<p>You are now ready to begin your new ReactJS application.</p>
        <p>To get started, visit the <a href="http://facebook.github.io/react/" target="_blank">ReactJS</a> website.</p>
				<div className={styles.todoContainer}>
					<h3>SAMPLE APP</h3>
					<TodoList data={data} />
					<TodoAddForm onAddTodo={name => dispatch(addTodo(name))} />
				</div>
				<h2 className={styles.footnote}>Got a feedback or suggestion to this starter kit? <a href={info.contact_url} target="_blank">{info.contact_label}</a></h2>
			</div>
		)
	}
}

/**
 * Selector function to injector into the global state
 *
 * @param object state
 * @return object
 */
function select(state) {
	return {
		data: state.data,
    info: state.info
	}
}

export default connect(select)(App)
