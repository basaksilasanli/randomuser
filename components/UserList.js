import React, { PureComponent } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import UserDetail from "./UserDetail";

export default class UserList extends PureComponent {
    state = {
        userList: [],
        loading: true,
        refreshing: false,
    };
    async componentDidMount() {
        await this.fetchUsers();
    };
    async fetchUsers() {
        try {
            const userApiCall = await fetch('https://randomuser.me/api/?results=10');
            const users = await userApiCall.json();
            this.setState({userList: users.results, loading: false, refreshing: false});
        } catch(err) {
            console.log("Error fetching data", err);
        }
    };
    async doRefresh() {
       await this.fetchUsers().then(() => {
           setTimeout( () => this.setState({refreshing: false}), 1000);
       })
    }
    renderItem(data) {
        return <UserDetail detail={data}/>
    }
    render() {
        const { userList, loading } = this.state;
        if(!loading) {
            return <View>
                    <FlatList
                        data={userList}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.phone}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.doRefresh.bind(this)}
                            /> }
                    />
            </View>
        } else {
            return <ActivityIndicator />
        }
    }
}


