module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { //MySql에는 users 테이블 생성
        //id가 기본적으로 들어있다.
        content : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        //RetweetId
    }, {
        charset : 'utf8mb4', //이모티콘 저장
        collate : 'utf8mb4_general_ci', //한글 저장,이모티콘저장
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User, {through: 'Like', as:'Likers'});
        db.Post.belongsTo(db.Post, {as: 'Retweet'});
    };
    return Post;
};