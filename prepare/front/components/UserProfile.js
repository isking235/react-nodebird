import React, {useCallback} from 'react';
import {Avatar, Button, Card} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {logoutRequestAction} from '../reducers/user';

const UserProfile = () => {
    const dispatch = useDispatch(); // ()를 안 넣어서 오류 났었으나 왜 오류 나는지 못 찾아음..
    const {me, logOutLoading} = useSelector((state) => state.user);

    const onLogOut = useCallback(() => {
        dispatch(logoutRequestAction());
    },[]);

    return (
        <>
            <Card
                actions={[
                    <div key="twit">짹짹<br/>{me.Posts.length}</div>,
                    <div key="followings">파로잉<br/>{me.Followings.length}</div>,
                    <div key="followings">팔로워<br/>{me.Followers.length}</div>,
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>me.nickname</Avatar>}
                    title={me.nickname}
                />
            </Card>
            <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        </>

    );
}

export default UserProfile;