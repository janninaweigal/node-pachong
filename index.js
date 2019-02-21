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
const reptileUrl = "http://localhost:8080/test";
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
    var html = iconv.decode(body, 'utf-8')
    // 解析数据
    let $ = cheerio.load(html);
    /**
     * 存放数据容器
     * @type {Array}
     */
    let content=[]
    
    // 获取数据
    $('.content').each(function (i, elem) {
        let _this = $(elem);
        let data = {
            name:_this.attr('dd_name')
        };
        console.log(_this.attr('dd_name'))
        const data2=[]
        _this.find('.list_aa li').each(function (j, elem1) {
            let _this2 = $(elem1);
            const title =_this2.find('.img').attr('title')
            const img=_this2.find('.img img').attr('src')
            const price=_this2.find('.price .rob .num').text()
            if(title&&img&&price){
                data2.push({title,img,price})
            }
        })
        if(data2.length!=0){
            data.data=data2;
            content.push(data)
        }
       
    });
   fs.mkdir(__dirname+'/data',function(error){
        if(error){
            return false;
        }
        console.log('创建目录成功');
    })
   // 生成数据
   fs.writeFileSync(__dirname+'/data/content.json', JSON.stringify(content));
});