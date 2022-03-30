import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from "../store/configureStore";

/*공통적인 값을 저장한다.*/
const NodeBird = ({Component}) => {
	return (
		<>
		 	<Head>
				<meta charSet="utf-8" />
				<title>NodeBird</title>
			</Head>
			
			<Component/>
		</>
		
	)
};

NodeBird.protypes = {
	Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(NodeBird);