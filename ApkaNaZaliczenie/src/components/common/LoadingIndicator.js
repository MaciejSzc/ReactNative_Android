import React from "react"
import { connect } from "react-redux"
import { View, StyleSheet, ActivityIndicator } from "react-native"

class LoadingIndicator extends React.Component {
  render() {
    return (
      <View style={styles.indicatorStyle}>
        {!!this.props.isLoading && (
          <ActivityIndicator size='large' color='#fff' />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  indicatorStyle: {
    position: "absolute",
    bottom: 35,
    left: 0,
    margin: 15
  }
})

const mapStateToProps = state => ({ isLoading: state.isLoading })

export default connect(mapStateToProps)(LoadingIndicator)
