module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { //MySql에는 users 테이블 생성
        //id가 기본적으로 들어있다.
        email : {
            
        },
        nickname: {},
        password : {},
    }, {
        charset : 'utf8',
        collate : 'utf8_general_ci', //한글 저장
    });
    User.associate = (db) => {};
    return User;
}