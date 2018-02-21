import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const GOOGLE_MAPS_APIKEY = ''
const LINK = 'https://maps.googleapis.com/maps/api/distancematrix/json?'

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      origin_addresses: '',
      destination_addresses: '',
      distance: '',
      duration: ''
    }
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {

      let link = LINK
      link += 'units=metric'
      link += '&mode=driving'
      link += '&origins=' + position.coords.latitude + ',' + position.coords.longitude
      link += '&destinations=-21.795681,-48.1785521'
      link += '&key=' + GOOGLE_MAPS_APIKEY

      fetch(link).then((response) => {
        return response.json()
      }).then((json) => {
        if (json.status == 'OK') {
          this.setState({
            origin_addresses: json.origin_addresses,
            destination_addresses: json.destination_addresses,
            distance: json.rows[0]['elements'][0]['distance']['text'],
            duration: json.rows[0]['elements'][0]['duration']['text']
          })
        }
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <View>
            <Text style={styles.rowTitle}>Distancia</Text>
            <Text style={styles.rowText}>{this.state.distance}</Text>
          </View>
          <View>
            <Text style={styles.rowTitle}>Tempo de carro</Text>
            <Text style={styles.rowText}>{this.state.duration}</Text>
          </View>
        </View>
        <View style={styles.block}>
          <Text style={styles.rowTitle}>Localização Atual</Text>
          <Text style={styles.rowText}>{this.state.origin_addresses}</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.rowTitle}>Nagano endereço</Text>
          <Text style={styles.rowText}>{this.state.destination_addresses}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    flex: 1
  },
  block: {
    borderRadius: 0,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: 'powderblue',
    padding: 10,
    alignItems: 'center',
    flex: 1
  },
  rowTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  rowText: {
    fontSize: 18,
    textAlign: 'center'
  }
})