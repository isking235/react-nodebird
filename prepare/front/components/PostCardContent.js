import React, {useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import {Button, Input} from 'antd';
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {UPDATE_POST_REQUEST} from "../reducers/post";

const {TextArea} = Input;

const PostCardContent = ({postData, editMode, onChangePost, onCancelUpdate}) => {
    const {updatePostLoading, updatePostDone} = useSelector((state) => state.post);
    const [editText, setEditText] = useState(postData);
    const onChangeText = useCallback((e) => {
        setEditText(e.target.value);
    });

    useEffect(() => {
        if (updatePostDone) {
            onCancelUpdate();
        }
    }, [updatePostDone]);

    return (// 첫 번째 게시글 #해시태그 #익스프레스 /*/g: 전체선택, /#: #, []여기있는것중선택, ^: 이건제외, \s: 공백, \s# : #앞에서 멈춰*/

        <div>
            {editMode
                ? (
                    <>
                        <TextArea value={editText} onChange={onChangeText}/>
                        <Button.Group>
                            <Button loading={updatePostLoading} onClick={onChangePost(editText)}>수정</Button>
                            <Button type="danger" onClick={onCancelUpdate}>취소</Button>
                        </Button.Group>
                    </>

                )
                :postData.split(/(#[^\s#]+)/g).map((v,i) => {
                    if (v.match(/(#[^\s#]+)/)) {
                        return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}><a>{v}</a></Link>
                    }
                    return v;
                })}

        </div>
    );
}

PostCardContent.prototype = {
    postData: PropTypes.string.isRequired,
    editMode : PropTypes.bool,
    onChangePost : PropTypes.func.isRequired,
    onCancelUpdate : PropTypes.func.isRequired,

};

PostCardContent.prototype = {
    editMode : false,
}

export default PostCardContent;