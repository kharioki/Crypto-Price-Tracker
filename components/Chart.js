import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from '@rainbow-me/animated-charts';

export const { width: SIZE } = Dimensions.get('window');

const Chart = ({ name, logoUrl, symbol, currentPrice, priceChangePercentage7d, sparklineData }) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? '#34c759' : '#ff3b30';

  const formatUSD = (value) => {
    'worklet';
    if (value === '') {
      return `$ ${currentPrice.toLocaleString('en-US', { currency: 'USD' })}`;
    }

    const formattedValue = `$ ${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
    return formattedValue;
  };

  return (
    <ChartPathProvider data={{ points: sparklineData, smoothingStrategy: 'bezier' }}>
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
            <ChartYLabel format={formatUSD} style={styles.price} />
            {/* <Text style={styles.price}>${currentPrice.toLocaleString('en-US', { currency: 'USD' })}</Text> */}
            <Text style={[styles.percentage, { color: priceChangeColor }]}>{priceChangePercentage7d.toFixed(2)}%</Text>
          </View>
        </View>

        <View style={styles.chartLineWrapper}>
          <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
          <ChartDot style={{ backgroundColor: 'black' }} />
        </View>
      </View>
    </ChartPathProvider>
  )
}

const styles = StyleSheet.create({
  chartWrapper: {
    marginVertical: 16,
  },
  titlesWrapper: {
    marginHorizontal: 16,
  },
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
  chartLineWrapper: {
    marginTop: 40,
  },
})

export default Chart
