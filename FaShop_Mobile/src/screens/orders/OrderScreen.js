import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View,ActivityIndicator,Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Moment from 'react-moment';
import urlCart from '../api/api_cart'
const OrderSceen = ({ navigation }) => {
    const [orderList, setOrderList] = useState([]);
    const [dList, setDList] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
    async function getOrders() {
        let token = await AsyncStorage.getItem("t");
        fetch(urlCart.ipv4 + "cart", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        })
        .then((response) => response.json())
        .then((json) =>
            {
                console.log(json)
                setDList(json)
            }
        )
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
    }
    useEffect(() =>{
        getOrders()
    },[])
    function getDate(date) {
        return Moment(date).format("DD-MM-yyyy");
    }
    function renderOrders({ item }) {
        return (
            <TouchableOpacity style={styles.item_order} onPress={() => navigation.navigate("OrderDetail", { post:item })}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.normal_text} >Đặt lúc:
                    {item.createdTime})
                    </Text>
                    <Text style={styles.bold_text}>{item.status}</Text>
                </View>
                <FlatList
                    data={item.list}
                    keyExtractor={i => i._id}
                    renderItem={(product) => {
                        return <Text style={styles.normal_text}>{product.item.name}</Text>
                    }}
                />
                <Text style={[styles.bold_text, { color: 'red', textAlign: 'right' }]}>Tổng: {item.total} vnd</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={[styles.container, { backgroundColor: 'white', paddingLeft: 30, paddingRight: 10 }]}>
            <Text style={[styles.bold_text, { color: 'orange', marginVertical: 5, textAlign: 'center' }]}>Chọn để xem chi tiết</Text>
            {isLoading ? <ActivityIndicator/> : (
                <View>
                <FlatList
                    data={dList}
                    keyExtractor={item => item._id}
                    renderItem={renderOrders}
                />
            </View>
            )}
        </View>
    )
}

export default OrderSceen

const styles = StyleSheet.create({
    container: {
        flex: 3,
        flexDirection: 'column',
        paddingLeft: 40,
        paddingRight: 20,
    },
    bold_text: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    normal_text: {
        fontSize: 16,
    },
    item_order:{
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 8,
        borderRadius: 10,
        shadowColor: '#FC6D3F',
        shadowRadius: 9,
    },
})
