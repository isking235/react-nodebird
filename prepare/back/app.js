const express = require('express');
const app = express();
/*
REST API 정의

app.get -> 가져오다.
app.post -> 생성하다.
app.put -> 전체_수정
app.delete -> 제거
app.patch-> 부분_수정
app.options -> 찔러보기
app.head -> 헤더만 가져오기(헤더/바디)



*/
app.get('/', (req, res) => {
    res.send('hello express');
});

app.get('/api', (req, res) => {
    res.send('hello api');
});

app.get('/api/posts', (req, res) => {
    res.json([
        {id: 1, content: 'hello'},
        {id: 2, content: 'hello2'},
        {id: 3, content: 'hello3'},
    ]);
});

app.post('/api/post', (req, res) => {
    res.json({id: 1, content: 'hello'});

});

app.delete('/api/post', (req, res) => {
    res.json({id: 1});
});


app.listen(3065, () => {
    console.log('서버 실행 중');
});