import { StyleSheet, Text, View, Dimensions, Image, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import urlCart from '../api/api_cart'
const WIDTH = Dimensions.get("window");
const ItemScreen = ({ route, navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const up = () => {
    setQuantity(quantity + 1)
    updateQuantity();
  };

  const down = () => {
    if (quantity <= 1) {
      setQuantity(quantity)
    }
    else {
      setQuantity(quantity - 1)
      updateQuantity()
    }
  };

  const updateQuantity = async () => {
    fetch(urlCart.ipv4 + "cart/update-quantity", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + await AsyncStorage.getItem("t"),
      },
      body: JSON.stringify(quantity)
    })
      .catch((err) => console.log(err));
  }

  let item = route.params.post;
  async function addToCart() {
    console.log(await AsyncStorage.getItem("t"));
    let itemData = { ...item, quantity: quantity }
    fetch(urlCart.ipv4 + "cart/new", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + await AsyncStorage.getItem("t"),
      },
      body: JSON.stringify(itemData),//chuyển object sang json
    })
      .then((response) => response.json()) //response là đối tượng trả về json
      .then((json) => {
        console.log(json);
        if (json.status) {
          Alert.alert("Bạn thêm sản phẩm vào giỏ hàng thành công")
          navigation.goBack()
        }
        else {
          Alert.alert("Lỗi thực hiện")
        }
      })
      .catch((err) => console.log(err.message));
  }
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>
      <View style={styles.bottomView}>
      <View style={{ padding: 10 }}>
        <View style={styles.viewDetail}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, marginTop: 5 }}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <Text style={styles.price}>{item.price} đ</Text>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: 'orange',
              marginVertical: 20,
              opacity: 0.5,
            }}
          ></View>
          <View style={styles.quantity}>
            <Pressable onPress={() => down()}>
              <Text style={{ fontSize: 30 }}>-</Text>
            </Pressable>
            <Text
              style={{
                marginLeft: 15,
                marginRight: 15,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {quantity}
            </Text>
            <Pressable >
              <Text style={{ fontSize: 25 }} onPress={() => up()}>+</Text>
            </Pressable>
          </View>
          <Text style={styles.textDetails}>Details</Text>
          <Text style={styles.textDetails2}>{item.description}</Text>
        </View>
      </View>
      </View>
      <View style={styles.view2}>
        <Pressable
          style={styles.btnAddCart}
          onPress={() => {
            addToCart();
          }}
        >
          <Text style={styles.textAddCart}>Add To Cart</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ItemScreen

const styles = StyleSheet.create({
  textAddCart: {
    fontWeight: "bold",
    color: 'white',
    fontSize: 17,
  },
  btnAddCart: {
    width: "70%",
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    flex: 1.5,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    borderColor: 'orange',
    borderWidth: 1,
    height: 470,
    width:'100%',
    position:'absolute',
    marginTop:330,
    backgroundColor:'white'
  },
  view2: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textDetails2: {
    fontSize: 16,
    fontWeight: "400",
  },
  textDetails: {
    fontSize: 20,
    fontWeight: "600",
  },
  price: {
    justifyContent: "flex-end",
    fontSize: 25,
    fontWeight: "bold",
    color: 'red',
  },
  name: {
    fontWeight: "bold",
    fontSize: 25,
  },
  quantity: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    marginTop: (-WIDTH.width * 5) / 100,
    marginLeft:110
  },
  image: {
    width: '100%',
    height:350,
    borderRadius: 5,
    borderColor: "orange",
    borderWidth: 1,
  },
  viewDetail: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
})