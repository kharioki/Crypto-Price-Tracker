import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import ListItem from './components/ListItem';
import Chart from './components/Chart';
import { SAMPLE_DATA } from './assets/data/sampleData';
import { getMarketData } from './services/cryptoService';

const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.largeTitle}>Markets</Text>
    </View>
    <View style={styles.divider} />
  </>
)

export default function App() {
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const [data, setData] = useState([]);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['45%'], []);

  const openModal = useCallback((coinData) => {
    setSelectedCoinData(coinData);
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    };

    fetchData();
  }, []);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              symbol={item.symbol}
              logoUrl={item.image}
              currentPrice={item.current_price}
              priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
              onPress={() => openModal(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader}
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          style={styles.bottomSheetModal}
        >
          {selectedCoinData ? (
            <Chart
              name={selectedCoinData?.name}
              symbol={selectedCoinData?.symbol}
              logoUrl={selectedCoinData?.image}
              currentPrice={selectedCoinData?.current_price}
              priceChangePercentage7d={selectedCoinData?.price_change_percentage_7d_in_currency}
              sparklineData={selectedCoinData?.sparkline_in_7d.price}
            />
          ) : null}
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleWrapper: {
    marginTop: 10,
    padding: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#eaeaea',
    marginHorizontal: 16,
  },
  bottomSheetModal: {
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
