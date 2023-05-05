import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState } from 'react';

import ListItem from '../components/ListItem';
import ListItemSeperator from '../components/ListItemSeperator';
import ListItemDeleteAction from '../components/ListItemDeleteAction';

interface MessageType {
    id: number;
    title: string;
    description: string;
    image: any;
}

const initialMessages = [
    {
        id: 1,
        title: 'T1',
        description: 'D1',
        image: require('../assets/mosh.jpg'),
    },
    {
        id: 2,
        title: 'T2',
        description: 'D2',
        image: require('../assets/mosh.jpg'),
    },
];

const MessagesScreen = () => {
    const [messages, setMessages] = useState<MessageType[]>(initialMessages);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const handleDelete = (message: MessageType) => {
        setMessages(messages.filter((m) => m.id !== message.id));
    };

    return (
        <View>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        title={item.title}
                        image={item.image}
                        subTitle={item.description}
                        onPress={() =>
                            console.log('Message pressed ' + item.id.toString())
                        }
                        onSwipeLeft={() => (
                            <ListItemDeleteAction
                                onPress={() => handleDelete(item)}
                            />
                        )}
                    />
                )}
                ItemSeparatorComponent={ListItemSeperator}
                refreshing={refreshing}
                onRefresh={() =>
                    setMessages([
                        {
                            id: 2,
                            title: 'T2',
                            description: 'D2',
                            image: require('../assets/mosh.jpg'),
                        },
                    ])
                }
            />
        </View>
    );
};

export default MessagesScreen;
