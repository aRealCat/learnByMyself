let UserSQL = {
    insert: 'INSERT INTO user(account,password,name) VALUES(?,?,?)', // 插入数据
    drop: 'DROP TABLE user', // 删除表中所有的数据
    queryAll: 'SELECT * FROM user', // 查找表中所有数据
    getUserById: 'SELECT * FROM user WHERE account =?', // 查找符合条件的数据
};
module.exports = UserSQL;