import React, {useCallback} from 'react';
import {Avatar, Button, Card} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {logoutRequestAction} from '../reducers/user';
import Link from 'next/link';

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
                    <div key="twit"><Link href={`/user/${me.id}`}><a>짹짹<br/>{me.Posts.length}</a></Link></div>,
                    <div key="followings"><Link href="/profile"><a>팔로잉<br/>{me.Followings.length}</a></Link></div>,
                    <div key="followings"><Link href="/profile"><a>팔로워<br/>{me.Followers.length}</a></Link></div>,
                ]}
            >
                <Card.Meta
                    avatar={(
                        <Link href={`/user/${me.id}`} prefetch={false}>
                            <a><Avatar>me.nickname</Avatar></a>
                        </Link>
                    )}
                    title={me.nickname}
                />
            </Card>
            <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        </>

    );
}

export default UserProfile;