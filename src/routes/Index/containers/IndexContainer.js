import { connect } from 'react-redux'
import Index from '../components/Index'
import { loadMore } from '@reducers/weather'

const mapDispatchToProps = {
  loadMore
}

const mapStateToProps = (state) => ({
  weather: state.weather
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
