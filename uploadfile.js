// 上传文件按二进制流方式上传
const $=require('./Jquery');

function uploadFile(editHtml,fileId,inputId){//editHtml为html文件. fileId为input type=file文件的Id
     var file=editHtml.find(fileId)[0].files[0];
     var filename=file.name;
     var readerFile=new FileReader();
     reader.readAsDataURL(file);//将文件编码成DataUrl
     reader.onload=function(){
         if(reader.error){
             alert("错误")
         }else{
             var form=document.createElement("form");
             var fd=new FormData(form);
             var blob=dataURLtoBloob(reader.result);
             fd.append('file',blob,filename);
             $.ajax({
                 url:"https://xxxx.com",
                 type:'post',
                 data:{
                     datatype:"*",//指定文件类型
                     filename:filename//指定文件名称
                 },
                 success(data){
                     fd.append('wefileParameter',data.wefileParameter);
                     $.ajax({
                         url:"http://sbdfs.ccn",
                         type:"post",
                         processData:false,
                         contentType:false,
                         data:fd,
                         xhrFileds:{
                             withCredentials:true
                         },
                         success(data){
                             if(data.responseCode==0){
                                  console.log(data.result);
                             }
                         }
                     })
                 }
             })
         }
     };
     function dataURLtoBloob(result){
         var byteString;
         if(result.split(',')[0].indexOf('base64')>=0){
             byteString=atob(result.split(',')[1]);//将文件转为二进制字符串
         }else{
             byteString=unescape(result.split(',')[1]);
         };
         var mimeString=result.split(',')[0].split(',')[1].split(';')[0];//获取type 类型
         var ia=new Uint8Array(byteString.length);//对字符串的长度匹配对应的二进制长度
        for(var i=0;i<byteString.length;i++){
             ia[i]=byteString.charCodeAt(i);//将二进制字符串转为对应的二进制数组
        };
        return new Blob([ia],{type:mimeString});
     }
}