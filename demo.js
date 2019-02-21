/**
 * 获取依赖
 * @type {*}
 */
var originRequest = require('request')  
const cheerio = require('cheerio');
var iconv = require('iconv-lite');// 处理中文乱码
const fs = require('fs');
const async = require('async');
var headers = {  
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
  }
function request (url, callback) {  
    var options = {
        url: url,
        encoding: null,
        headers: headers
    }
    originRequest(options, callback)
}
/**
 * 定义请求地址
 * @type {*}
 */
const reptileUrl = "http://book.dangdang.com/";
/**
 * 处理空格和回车
 * @param text
 * @returns {string}
 */
function replaceText(text) {
  return text.replace(/\n/g, "").replace(/\s/g, "");
}
/**
 * 核心业务
 * 发请求，解析数据，生成数据
 */
request(reptileUrl, function (err, res, body) {  
    // 抛错拦截
    if (err) {
        throw Error(err);
    }
    var html = iconv.decode(body, 'gb2312')
    // 解析数据
    let $ = cheerio.load(html,{decodeEntities: false});
    /**
     * 存放数据容器
     * @type {Array}
     */
    let content=''
    console.log($('#bd_auto').children('.con').eq(2).find('.storey_two_left').html())
    // 获取数据
    // $('#bd_auto').find('.con').eq(3).find('.storey_two .storey_two_left .content').each(function (i, elem) {
    //     let _this = $(elem);
    //     let data = {
    //         name:_this.attr('dd_name')
    //     };
    //     console.log(_this.attr('dd_name'))
    //     const data2=[]
    //     _this.find('.list_aa li').each(function (j, elem1) {
    //         let _this2 = $(elem1);
    //         const title =_this2.find('.img').attr('title')
    //         const img=_this2.find('.img img').attr('src')
    //         const price=_this2.find('.price .rob .num').text()
    //         if(title&&img&&price){
    //             data2.push({title,img,price})
    //         }
    //     })
    //     if(data2.length!=0){
    //         data.data=data2;
    //         content.push(data)
    //     }
       
    // });
//    fs.mkdir(__dirname+'/data',function(error){
//         if(error){
//             return false;
//         }
//         console.log('创建目录成功');
//     })
//    // 生成数据

//    fs.writeFileSync(__dirname+'/data/content.html', JSON.stringify(content));
});


// content=unescape(content.replace(/\\u/g,"%u"));
//     //再对实体符进行转义
//     //有x则表示是16进制，$1就是匹配是否有x ，$2就是匹配出的第二个括号捕获到的内容，将$2以对应进制表示转换
//     content = content.replace(/&#(x)?(\w+);/g,function($,$1,$2){
//         return String.fromCharCode(parseInt($2,$1?16:10));
//     });