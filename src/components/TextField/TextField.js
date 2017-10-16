import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import { FormGroup, Input, FormFeedback } from 'reactstrap'
import styles from './TextField.module.scss'

class TextField extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    containerClassName: PropTypes.string,
    hideFeedback: PropTypes.bool,
    list: PropTypes.object,
  }

  render () {
    const { input, label, meta: { touched, error }, containerClassName, hideFeedback, list, ...custom } = this.props

    let validationState = null
    if (touched) {
      validationState = !error ? 'success' : 'danger'
    }

    return (
      <FormGroup color={validationState} className={containerClassName}>
        <Input {...input} {...custom} autoComplete='off' state={validationState}
               list={list && list.items ? list.id : null}/>
        {list && list.items && (
          <datalist id={list.id}>
            {list.items.map((obj) => {
              return <option key={obj.value.replace(/\s+/g, '-')} value={obj.value}>{obj.label}</option>
            })}
          </datalist>
        )}
        {!!error && !hideFeedback && touched && (
          <FormFeedback>{error}</FormFeedback>
        )}
      </FormGroup>
    )
  }
}

export default CSSModule(TextField, styles)
