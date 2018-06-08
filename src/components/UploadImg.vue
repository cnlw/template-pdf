<template>
  <div>
      <div class="file-img" @click="uploadClick">
         <img :src="uploadImg" v-if="uploadImg">
          <div class="file-img-icon" v-else></div>
          <!-- <input  :id="id" type="file" @change="changed($event)"> -->
      </div>
        <Custom-Cropper v-if='isShow' @clipResult="clipResult" :mRatio="ratio" ></Custom-Cropper>
      <!-- <img src='../assets/img-icon.png'/> -->

  </div>
 </template>
 <script>
import CustomCropper from '../components/CustomCropper';
 export default {
     data(){
         return{
           //  mRatio:16/9,
             uploadImg:'',
             isShow:false,
             id:'iptFile-'+this.page+"-"+this.itemKey+"-"+this.picTag
         }
     },
     props:{
         ratio:{
             type:Number,
             default:16/9
         },
         src:{
             type:String,
             default:''
         },
         page:{
              type:Number,
             default:-1
         },
         itemKey:{
             type:Number,
             default:-1
         },
         layoutId:{
             type:String,
             default:'one'
         },
         picTag:{
             type:String,
             default:'one'
         }
     },
     components: {
       CustomCropper
     },
     methods:{
         clipResult(base){

         this.isShow =false;
         if(!base){
             return;
         }
         this.uploadImg = base;
             let res={
                        base64:base,
                        itemKey:this.itemKey,
                        page:this.page,
                        picTag:this.picTag,
                        layoutId:this.layoutId
                    }
          this.$emit('result',res)
         },
         uploadClick(){
            // console.log("==uploadClick===")
            // document.getElementById(this.id).click();
            this.isShow = true;
         },
         changed(e){
             console.log(e);
                let that = this;
                let file = e.target.files[0];
                var reader = new FileReader();  
                reader.readAsDataURL(file);//调用自带方法进行转换  
                reader.onload = function(e) {  
                   // console.log(this.result);
                    that.uploadImg = this.result;
                    let res={
                        base64:this.result,
                        itemKey:that.itemKey,
                        page:that.page,
                        picTag:that.picTag
                    }
                    that.$emit('result',res)
                };  
             //console.log(file);
         }
     }
 }
 </script>
 <style>
 .file-img{
     border: 1px solid #d9d9d9;
     height: 100%;
     width: 100%;
     align-items: center;
     display: flex;
     justify-content: center;
 }
 img{
     width: inherit;
     height: inherit;
 }
 .file-img-icon{

    width: 50px;
    height: 50px;
    background: url("../assets/img-icon.png") no-repeat;
    background-position: center;
 }
.file-img input{
    display:none
}
 </style>
 
 
  