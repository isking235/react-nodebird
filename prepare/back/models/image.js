module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', { //MySql에는 users 테이블 생성
        //id가 기본적으로 들어있다.
        src : {},
    }, {
        charset : 'utf8', //이모티콘 저장
        collate : 'utf8_general_ci', //한글 저장,이모티콘저장
    });
    Image.associate = (db) => {};
    return User;
}