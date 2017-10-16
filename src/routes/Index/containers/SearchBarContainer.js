import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import SearchBarComponent from '../components/SearchBar'
import { search } from '@reducers/weather'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const FORM_NAME = 'search-form'

const validate = (values) => {
  let errors = {}

  if (!values.query) {
    errors['query'] = 'Required.'
  }

  return errors
}

const onSubmit = (values, dispatch) => {
  dispatch(search(values.query))
}

const createdReduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit,
  validate,
  initialValues: {
    query: ''
  },
})(SearchBarComponent)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const query = selector(state, 'query')
  return {
    query
  }
})(createdReduxForm)
