import {Button, Form, Input} from "antd";
import useinput from "../hooks/useinput";
import React, {useCallback} from "react";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const CommentForm = ({post}) => {
    const id = useSelector((state)=>state.user.me?.id);
    const [commentText, onChangeCommentText] = useinput('');
    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText);
    }, [commentText]);

    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{position:'relative', margin:0}}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button type="primary" htmlType="submit">삐약</Button>
            </Form.Item>
        </Form>
    );
};

CommentForm.prototype = {
    post:PropTypes.object.isRequired,
}

export default CommentForm;