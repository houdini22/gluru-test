import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Field } from 'redux-form'
import http from '@modules/http'
import TextField from '@components/TextField'
import styles from './SearchBar.module.scss'

export class SearchBarComponent extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    searchInProgress: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      autocompleteList: null
    }
  }

  componentDidMount () {
    http.get('/search/autocomplete').then((response) => {
      this.setState({
        autocompleteList: response.data
      })
    })
  }

  render () {
    const { handleSubmit, searchInProgress } = this.props
    const { autocompleteList } = this.state

    return (
      <div styleName='search-bar-container'>
        <form onSubmit={handleSubmit}>
          <Field
            name='query'
            component={TextField}
            type='text'
            placeholder='Search query...'
            containerClassName='no-margin'
            hideFeedback
            disabled={searchInProgress}
            list={autocompleteList}
          />
        </form>
      </div>
    )
  }
}

export default CSSModules(SearchBarComponent, styles)
