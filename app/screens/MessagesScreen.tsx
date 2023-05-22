import {
    View,
    FlatList,
    StyleSheet,
    type ImageSourcePropType,
} from 'react-native';
import { useState } from 'react';

import ListItem from '../components/lists/ListItem';
import ListItemSeperator from '../components/lists/ListItemSeperator';
import ListItemDeleteAction from '../components/lists/ListItemDeleteAction';
import { type AccountNavCompositeScreenProps } from '../navigation/navigation';
import { useConfigStore } from '../store/configStore';
import moshImage from '../assets/mosh.jpg';

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
        image: moshImage,
    },
    {
        id: 2,
        title: 'Janus QA',
        description:
            "I'm interested in this item. When will you be able to post it?",
        image: moshImage,
    },
];

const MessagesScreen = ({
    route,
}: AccountNavCompositeScreenProps<'Messages'>) => {
    const style = route.params?.style;
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
                            useConfigStore
                                .getState()
                                .logger?.debug(`Message pressed ${item.id}`)
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
                            image: moshImage,
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
