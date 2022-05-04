module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { //MySql에는 users 테이블 생성
        //id가 기본적으로 들어있다.
        content : {},
    }, {
        charset : 'utf8mb4', //이모티콘 저장
        collate : 'utf8mb4_general_ci', //한글 저장,이모티콘저장
    });
    Post.associate = (db) => {};
    return User;
}