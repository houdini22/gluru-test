import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Field, formValues } from 'redux-form'
import http from '@modules/http'
import TextField from '@components/TextField'
import { FORM_NAME } from '../containers/SearchBarContainer'
import styles from './SearchBar.module.scss'

export class SearchBarComponent extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    searchInProgress: PropTypes.bool.isRequired,
    query: PropTypes.string,
  }

  constructor (props) {
    super(props)
    this.state = {
      autocompleteList: null
    }
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.keyUpTimeout = null
  }

  componentDidMount () {
    http.get('/search/autocomplete').then((response) => {
      this.setState({
        autocompleteList: response.data
      })
    })
  }

  handleKeyUp () {
    clearTimeout(this.keyUpTimeout)
    this.keyUpTimeout = setTimeout(() => {
      http.get('/search/autocomplete', {
        params: {
          query: this.props.query
        }
      }).then((response) => {
        this.setState({
          autocompleteList: response.data
        })
      })
    }, 500)
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
            onKeyUp={this.handleKeyUp}
          />
        </form>
      </div>
    )
  }
}

export default CSSModules(SearchBarComponent, styles)
