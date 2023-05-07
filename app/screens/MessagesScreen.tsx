import {
    View,
    FlatList,
    StyleSheet,
    type ImageSourcePropType,
    type ViewStyle,
} from 'react-native';
import { useState } from 'react';

import ListItem from '../components/lists/ListItem';
import ListItemSeperator from '../components/lists/ListItemSeperator';
import ListItemDeleteAction from '../components/lists/ListItemDeleteAction';

interface MessageType {
    id: number;
    title: string;
    description: string;
    image: ImageSourcePropType;
}

const initialMessages = [
    {
        id: 1,
        title: 'Janus QA',
        description:
            'Hey! Is this item still available? I just wanted to let you know that it is available now. Thanks!',
        image: require('../assets/mosh.jpg'),
    },
    {
        id: 2,
        title: 'Janus QA',
        description:
            "I'm interested in this item. When will you be able to post it?",
        image: require('../assets/mosh.jpg'),
    },
];

interface Props {
    style?: ViewStyle;
}

const MessagesScreen = ({ style }: Props) => {
    const [messages, setMessages] = useState<MessageType[]>(initialMessages);
    const [refreshing] = useState<boolean>(false);

    const handleDelete = (message: MessageType) => {
        setMessages(messages.filter((m) => m.id !== message.id));
    };

    return (
        <View style={[styles.container, !!style && style]}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
