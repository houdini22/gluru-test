import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Col } from 'reactstrap'
import styles from './SearchResult.module.scss'

export class SearchResultComponent extends React.Component {
  static propTypes = {
    result: PropTypes.object.isRequired,
  }

  render () {
    const { result } = this.props

    return (
      <Col lg={3} md={3} sm={4} xs={6}>
        <div
          styleName='result-item'
        >
          <div>
            <div styleName='icon'>
              {result.description} ({Math.round(result.score * 100)}%
            </div>
            <div styleName='city-name' title={result.description}>
              {result.name}
            </div>
            <div styleName='weather-details'>
              <p>
                Temperature: <span styleName='num-detail'>{Math.round(result.temperature)}</span>
              </p>
              <p>
                Precipitation: <span styleName='num-detail'>{result.humidity}%</span>
              </p>
            </div>
          </div>
        </div>
      </Col>
    )
  }
}

export default CSSModules(SearchResultComponent, styles)
