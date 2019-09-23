import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
// Store
import {inject, observer} from 'mobx-react';

@inject('forecastStore')
@observer
class HomeScreen extends Component {
  async componentDidMount() {
    // Handle retrieveing data
    try {
      await this.props.forecastStore.getPersistedValue();
    } catch (e) {
      this.props.forecastStore.setError = e;
    }
  }

  _handleNewPersistedValue = () => {
    this.props.forecastStore.setNewValueAndPersist();
  };

  _handleNewValue = () => {
    this.props.forecastStore.setNewValue();
  };
  render() {
    const {value, persistedValue, isLoading, error} = this.props.forecastStore;
    return (
      <View>
        {isLoading && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Loading</Text>
          </View>
        )}

        {error.length > 0 && (
          <View>
            <Text>ERror : {error}</Text>
          </View>
        )}

        {!isLoading && (
          <>
            <View style={{marginBottom: 20}}>
              <Text>Regular value</Text>
              <Text>{value}</Text>
              <TouchableWithoutFeedback
                style={{
                  backgroundColor: 'tomato',
                  padding: 5,
                  textAlign: 'center',
                }}
                onPress={this._handleNewValue}>
                <Text>Set new regular value</Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={{marginBottom: 20}}>
              <Text>Persisted value</Text>
              <Text>{persistedValue}</Text>
              <TouchableWithoutFeedback
                style={{
                  backgroundColor: 'tomato',
                  padding: 5,
                  textAlign: 'center',
                }}
                onPress={this._handleNewPersistedValue}>
                <Text>Set new persisted value</Text>
              </TouchableWithoutFeedback>
            </View>
          </>
        )}
      </View>
    );
  }
}

export default HomeScreen;
