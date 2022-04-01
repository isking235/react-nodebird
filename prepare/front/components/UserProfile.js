import React, {useCallback} from 'react';
import {Avatar, Button, Card} from "antd";
import {useDispatch} from "react-redux";
import {logoutAction} from '../reducers/user';

const UserProfile = () => {
    const dispatch = useDispatch(); // ()를 안 넣어서 오류 났었으나 왜 오류 나는지 못 찾아음..

    const onLogOut = useCallback(() => {
        dispatch(logoutAction);
    },[]);

    return (
        <>
            <Card
                actions={[
                    <div key="twit">짹짹<br/>0</div>,
                    <div key="followings">파로잉<br/>0</div>,
                    <div key="followings">팔로워<br/>0</div>,
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>ZC</Avatar>}
                    title="ZeroCho"
                />
            </Card>
            <Button onClick={onLogOut}>로그아웃</Button>
        </>

    );
}

export default UserProfile;