const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieparser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');


const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);
passportConfig();

//req.body 를 사용하기 위해 아래 구문 입력 필요
app.use(cors({
    origin:'*',
}));
app.use(express.json()); //front에서 json 형태로 넘오오면 body에 붙여 준다.
app.use(express.urlencoded({extended: true})); //form submitcd
app.use(cookieparser('nodebirdsecret'));
app.use(session({
    saveUninitialized : false,
    resave : false,
    secret : process.env.COOKIE_SECRET,
}));

app.use(passport.initialize());
app.use(passport.session({
    saveUninitialized : false,
    resave : false,
    secret : 'nodebirdsecret',
}));

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

app.use('/post', postRouter);
app.use('/user', userRouter);

//에러처리 미들웨어는 숨겨 있다.
//사용자 재정의 필요하여 정의한다.
/*app.use((err, req, res, next) => {


});*/

app.listen(3065, () => {
    console.log('서버 실행 중!');
});