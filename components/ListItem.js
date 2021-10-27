import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

const ListItem = ({ name, symbol, currentPrice, priceChangePercentage7d, logoUrl, onPress }) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? '#34c759' : '#ff3b30'
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        <View style={styles.leftWrapper}>
          <Image style={styles.image} source={{ uri: logoUrl }} />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.rightWrapper}>
          <Text style={styles.price}>${currentPrice.toLocaleString('en-US', { currency: 'USD' })}</Text>
          <Text style={[styles.percentage, { color: priceChangeColor }]}>{priceChangePercentage7d.toFixed(2)}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemWrapper: {
    paddingHorizontal: 16,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  titleWrapper: {
    marginLeft: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888'
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#ccc',
  },
  rightWrapper: {
    alignItems: 'flex-end'
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  percentage: {
    marginTop: 4,
    fontSize: 14,
    color: 'red'
  }
})

export default ListItem
