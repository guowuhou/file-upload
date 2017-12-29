// 专门上传图片按二进制流方式上传
const $=require('./Jßquery');

function uploadPic(editHtml,fileId,inputId){//editHtml为html文件. fileId为input type=file文件的Id
     var file=editHtml.find(fileId)[0].files[0];
     var filename=file.name;
     var readerFile=new FileReader();
     reader.readAsDataURL(file);//将文件编码成DataUrl
     reader.onload=function(){
         var img=new Image();
         img.src=reader.result;
         img.onload=function(){
             var w =img.width , h=img.height;
             var canvas=document.createElement('canvas');
             var ctx=canvas.getContext('2d');
             $(canvas).attr({width:w,height:h});
             ctx.drawImage(img,0,0,w,h);
             var base64=canvas.toDataURL('image/jpeg',0.5);
             var result={
                 url:window.URL.createObjectURL(file),
                 base64:base64,
                 clearBase64:base64.substr(base64.indexOf(',')+1)
             }
         };
        $.ajax({
                 url:"https://xxxx.com",
                 type:'post',
                 data:{
                     datatype:"pic64",//指定文件类型
                     filename:filename//指定文件名称
                 },
                 xhrFileds:{
                     withCredentials:true
                 },
                 success(data){
                     var para=JSON.stringify(data.wefileParameter);
                     $.ajax({
                         url:"http://sbdfs.ccn",
                         type:"post",
                         data:{
                           datatype:"pic64",//指定文件类型
                           filename:filename//指定文件名称
                         },
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
}