var mysql = require('mysql');
var async = require('async');
const list = require('./data/content.js');
var pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'jannina@@',
    database : 'nodesql'
});

// 添加books_type
function bookTypeSave(list,callback){
    pool.getConnection(function(err,connection){
        if(err){
            return callback(err);
        }
        async.eachSeries(list,function(item,next){
            console.log(item.name)
            connection.query('insert into books_type(name) values(?)',[item.name],function(err,result){
                if(err){
                    return next(err);
                }
                next()
            });
        },callback);
        connection.release();
    });
};
// 添加books
function booksSave(list,callback){
    pool.getConnection(function(err,connection){
        if(err){
            return callback(err);
        }
        var findsql = 'select * from books_type where name=?';
        var insertsql = 'insert into books(BookTypeId,Name,BookPhoto,Price,Quantity) values(?,?,?,?,?)';
        
        async.eachSeries(list,function(item,next){
            connection.query(findsql,[item.name],function(err,result){
                if(err){
                    return next(err);
                }
                if(result.length!=0){
                    const id = result[0].Id
                    async.eachSeries(item.data,function(itemSelf,next){
                        const price = parseFloat(itemSelf.price)
                        const quantity=parseInt(itemSelf.price);
                        connection.query(insertsql,[id,itemSelf.title,itemSelf.img,price,quantity],function(err,result){
                            if(err){
                                callback(err)
                                return next(err);
                            }
                            callback(result)
                            next();
                        });
                    },callback);
                }
                next();
            });
        },callback);
        connection.release();
    });
};
// bookTypeSave(list,function(){
//     console.log('添加成功！！！！')
// })
booksSave(list,function(){
    console.log('添加成功！！！！')
})