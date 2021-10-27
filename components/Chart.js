import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

const Chart = ({ name, logoUrl, symbol, currentPrice, priceChangePercentage7d, sparklineData }) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? '#34c759' : '#ff3b30'

  return (
    <View style={styles.chartWrapper}>
      <View style={styles.titlesWrapper}>
        <View style={styles.upper}>
          <View style={styles.leftWrapper}>
            <Image source={{ uri: logoUrl }} style={styles.image} />
            <Text style={styles.subtitle}>{name} ({symbol.toUpperCase()})</Text>
          </View>
          <Text style={styles.subtitle}>7d</Text>
        </View>

        <View style={styles.lower}>
          <Text style={styles.price}>${currentPrice.toLocaleString('en-US', { currency: 'USD' })}</Text>
          <Text style={[styles.percentage, { color: priceChangeColor }]}>{priceChangePercentage7d.toFixed(2)}%</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chartWrapper: {
    margin: 16,
  },
  titlesWrapper: {},
  upper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#a9abb1',
  },
  lower: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  percentage: {
    fontSize: 18,
  },
})

export default Chart
