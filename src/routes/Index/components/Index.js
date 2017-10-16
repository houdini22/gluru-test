import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import SearchBarContainer from '../containers/SearchBarContainer'
import SearchResults from './SearchResults'
import styles from './Index.module.scss'

export class IndexView extends React.Component {
  static propTypes = {
    weather: PropTypes.object.isRequired,
    loadMore: PropTypes.func.isRequired,
  }

  render () {
    const { weather: { searchInProgress, results }, loadMore } = this.props

    return (
      <div styleName='index-container'>
        <SearchBarContainer
          searchInProgress={searchInProgress}
        />
        <SearchResults
          searchInProgress={searchInProgress}
          results={results}
          loadMore={loadMore}
        />
      </div>
    )
  }
}

export default CSSModules(IndexView, styles)
