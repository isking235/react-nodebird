import React from 'react';
import Link from 'next/link';
import PropTypes from "prop-types";


const PostCardContent = ({postData}) => (// 첫 번째 게시글 #해시태그 #익스프레스 /*/g: 전체선택, /#: #, []여기있는것중선택, ^: 이건제외, \s: 공백, \s# : #앞에서 멈춰*/
    <div>
        {postData.split(/(#[^\s#]+)/g).map((v,i) => {
            if (v.match(/(#[^\s#]+)/)) {
                return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}><a>{v}</a></Link>
            }
            return v;
        })}
    </div>
);

PostCardContent.prototype = {postData: PropTypes.string.isRequired};
export default PostCardContent;