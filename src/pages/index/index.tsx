import { View, Text, Input } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.less";
import {useCallback, useEffect, useState} from "react";

export default function Index() {
    const [value, setValue] = useState("");
    const [messageList, setMessageList] = useState<number[]>([]);

    const onInput = useCallback((e) => {
        setValue(e.detail.value);
    }, []);

    useEffect(() => {
        let list: number[] = [];
        for (let i = 0; i < 1000; i++) {
            list.push(i);
        }
        setMessageList(list);
    }, []);


    useLoad(() => {
        console.log("Page loaded.");
    });

    return (
        <View className="index">
            <View className='container'>
                <View className='messageList'>
                    {messageList.map((message, index) => (
                        <View className='messageInfo'>{`这是第${index + 1}条信息`}</View>
                    ))}
                </View>
                <View className='bottomBar'>
                    <Input
                        onClick={(event) => event.stopPropagation()}
                        value={value}
                        onInput={onInput}
                        className='input'
                        maxlength={1000}
                        placeholder={"在这里输入内容"}
                    />
                    <View className='send'>发送</View>
                </View>
            </View>
        </View>
    );
}
