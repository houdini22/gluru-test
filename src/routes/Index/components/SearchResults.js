import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Row, Button } from 'reactstrap'
import LoadingOverlay from '@components/LoadingOverlay'
import SearchResultComponent from './SearchResult'
import styles from './SearchResults.module.scss'

export class SearchResultsComponent extends React.Component {
  static propTypes = {
    searchInProgress: PropTypes.bool.isRequired,
    results: PropTypes.array.isRequired,
    loadMore: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.loadMore = this.loadMore.bind(this)
    this.nextOffset = 20
  }

  loadMore () {
    const { loadMore } = this.props
    loadMore()
  }

  render () {
    const { searchInProgress, results } = this.props

    return (
      <div styleName='search-results-container-outer'>
        <div styleName='search-results-container-inner'>
          <Row>
            {results.map((result) => {
              return <SearchResultComponent
                key={result.name.replace(/\s+/g, '-')}
                result={result}
              />
            })}
          </Row>
          {results.length > 0 && results.length % 12 === 0 && (
            <div styleName='load-more-container'>
              <Button color='link' outline onClick={this.loadMore}>Load more</Button>
            </div>
          )}
          {searchInProgress && (
            <LoadingOverlay/>
          )}
        </div>
      </div>
    )
  }
}

export default CSSModules(SearchResultsComponent, styles)
