import React, {useEffect} from 'react';
import Head from 'next/head';
import {useSelector} from "react-redux";
import Router from "next/router";

import AppLayout from '../components/AppLayout';
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import axios from "axios";


const Profile = () => {
	const {me} = useSelector((state) => state.user);
	//로그인 안했을때 프로필 화면 나오지 않도록 한다.
	useEffect(() => {
		if(!(me && me.id)) {
			Router.push('/');
		}
	},[me && me.id]);

	if(!me) {
		return null;
	}
	return (
		<>
			<Head>
				<title>내 프로필 | NodeBird</title>
			</Head>
			<AppLayout>
				<NicknameEditForm />
				<FollowList header="팔로잉" data={me.Followings} />
				<FollowList header="팔로워" data={me.Followers} />
			</AppLayout>
		</>

	);
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	console.log('getServerSideProps start');
	console.log(context.req.headers);
	const cookie = context.req ? context.req.headers.cookie : '';
	axios.defaults.headers.Cookie = '';
	if (context.req && cookie) {
		axios.defaults.headers.Cookie = cookie;
	}
	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});
	context.store.dispatch(END);
	console.log('getServerSideProps end');
	await context.store.sagaTask.toPromise();
});

export default Profile;