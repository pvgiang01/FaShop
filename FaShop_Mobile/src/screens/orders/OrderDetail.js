import { StyleSheet, Text, View, FlatList, TouchableHighlight,Image } from 'react-native'
import React, { useEffect } from 'react'

const OrderDetail = ({ route }) => {
  let item = route.params.post;

  return (
    <View style={[styles.container, { backgroundColor: 'white', paddingVertical: 20 }]}>
      <View style={{ flex: 2 }}>
      <View>
                <Image source={item.image} style={{ width: 100, height: 100, marginBottom: 10 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                  <View style={{ flexDirection: 'row', }}>
                    <Text style={styles.bold_text}>{item.quantity}x  </Text>
                    <Text style={styles.bold_text}>{item.name}</Text>
                  </View>
                  <Text style={styles.normal_text}>{item.price} vnd</Text>
                </View>
              </View>
      </View>
      <View style={{ backgroundColor: 'orange', height: 2, margin: 20 }}></View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={styles.bold_text}>Tạm tính</Text>
          <Text style={styles.normal_text}> vnd</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.bold_text}>Voucher</Text>
          <Text style={styles.normal_text}>Không có</Text>
        </View>

        <View style={{ backgroundColor: 'orange', height: 2, margin: 20 }}></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[styles.bold_text, { color: 'red' }]}>Tổng cộng</Text>
          <Text style={[styles.normal_text, { color: 'red' }]}> vnd</Text>
        </View>
        <View style={{ backgroundColor: 'orange', height: 2, margin: 20 }}></View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.bold_text}>Thanh toán bằng</Text>
          <Text style={styles.normal_text}>Ví HighFood</Text>
        </View>
      </View>
      <TouchableHighlight style={{ marginHorizontal: 10, borderRadius: 15, padding: 10, backgroundColor: 'orange', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Đặt lại</Text>
      </TouchableHighlight>
    </View>
  )
}

export default OrderDetail

const styles = StyleSheet.create({
  container: {
    // height: screen.height,
    flex: 3,
    flexDirection: 'column',
    paddingLeft: 40,
    paddingRight: 20,
  },
  bold_text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1F222B',
  },
  normal_text: {
    fontSize: 16,
  },
})