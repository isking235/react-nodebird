import React, {useEffect} from 'react';
import AppLayout from '../components/AppLayout';
import {useDispatch, useSelector} from "react-redux";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import {LOAD_POSTS_REQUEST} from "../reducers/post";
import {LOAD_USER_REQUEST} from "../reducers/user";

const Home = () => {
	const dispatch = useDispatch();
	const {me} = useSelector((state) => state.user);
	const {mainPosts, hasMorePosts, loadPostsLoading,retweetError} = useSelector((state) => state.post);

	useEffect(() => {
		if(retweetError) {
			alert(retweetError);
		}
	},[retweetError]);

	useEffect(()=> {
		dispatch({
			type : LOAD_USER_REQUEST,
		});
		dispatch({
			type : LOAD_POSTS_REQUEST,
		});
	},[]);

	useEffect(() => {
		function onScroll() {
			//console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
			/*
			scrollY : 얼마나 내렸는지
			clientHeight : 화면 보이는 길이
			scrollHeight : 총 길이
			* */
			if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight-300) {
				if (hasMorePosts && !loadPostsLoading) {
					const lastId = mainPosts[mainPosts.length - 1]?.id; //mainPosts 가 undifined 될수도 있기때문에 ?.id를 한다.
					dispatch({
						type : LOAD_POSTS_REQUEST,
						lastId,
					});
				}
			}
		}

		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [hasMorePosts, loadPostsLoading]);

	return (
		<AppLayout>
			{me && <PostForm />}
			{mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
		</AppLayout>
	);
};

export default Home;