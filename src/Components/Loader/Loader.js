import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, Platform} from 'react-native';
import Loading from 'react-native-whc-loading';
import normalize from '../../Common/FontSize'
import COLORS from '../../assets/Colors'

class Loader extends Component {
  constructor(props) {
    super(props);
  }

 
  render() {
    const {isLoading} = this.props.CommonReducer;

    return (
      <Loading
        ref="loading"
        loading={isLoading}
        // image={Assets.Loader}
        size={normalize(60)}
        indicatorColor={COLORS.black}
        easing={Loading.EasingType.linear}
        imageSize={normalize(50)}
        backgroundColor="transparent"
      />
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      !nextProps.CommonReducer.isLoading &&
      nextProps.CommonReducer.message != this.props.CommonReducer.message
    ) {
      if (nextProps.CommonReducer.fetchFailed == true) {
        setTimeout(
          () => {
            Alert.alert('', nextProps.CommonReducer.message, [
              {
                text: 'ok',
              },
            ]);
          },
          Platform.OS == 'ios' ? 1000 : 0,
        );
      } else {
          console.log('un auth code...')
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    CommonReducer: state.CommonReducer,
  };
};

export default connect(mapStateToProps)(Loader);
