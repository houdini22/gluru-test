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

  constructor (props) {
    super(props)
    this.state = {
      autocompleteActive: false
    }
  }

  setValue (value) {
    this.props.input.onChange(value)
    this.setState({
      autocompleteActive: false
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.meta.active) {
      this.setState({
        autocompleteActive: true
      })
    } else {
      setTimeout(() => { // temp hack
        this.setState({
          autocompleteActive: false
        })
      }, 250)
    }
  }

  render () {
    const { input, label, meta: { touched, error }, containerClassName, hideFeedback, list, submit, ...custom } = this.props
    const { autocompleteActive } = this.state

    let validationState = null
    if (touched) {
      validationState = !error ? 'success' : 'danger'
    }

    return (
      <FormGroup color={validationState} className={containerClassName} styleName='form-group'>
        <div styleName='field-container'>
          <Input {...input} {...custom} autoComplete='off' state={validationState} innerRef='input'/>
          {list && list.items && autocompleteActive && (
            <ul styleName='list'>
              {list.items.map((obj) => {
                return <li
                  key={obj.value}
                  value={obj.value}
                  onClick={() => {
                    this.setValue(obj.value)
                    submit()
                  }}
                >
                  {obj.label}
                </li>
              })}
            </ul>
          )}
        </div>
        {!!error && !hideFeedback && touched && (
          <FormFeedback>{error}</FormFeedback>
        )}
      </FormGroup>
    )
  }
}

export default CSSModule(TextField, styles)
