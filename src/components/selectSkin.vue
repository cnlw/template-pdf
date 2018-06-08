<template>
     <div class="cropper-modal">
        <div class="modal">
          <img src="../assets/img-close.png" class="close" @click="btnClose">
            <div class="modal-head">
                <div class="head-wrap">选取背景</div>
                <div style="justify-content: center;display: flex;">
                  <ul >
                      <li v-for="(item,index) in skins" :key="index" @click="skinClick(item)"><img :src= item /></li>
                  </ul>
                </div>
            </div>
        </div>
     </div>
</template>
<script>
export default {
   data(){
     return{
       skins:[
       require('../assets/skin/01.jpg'),
       require('../assets/skin/02.jpg'),
       require('../assets/skin/03.jpg'),
       require('../assets/skin/04.jpg'),
       require('../assets/skin/05.jpg'),
       require('../assets/skin/07.jpg'),
       require('../assets/skin/08.jpg'),
       require('../assets/skin/09.jpg'),
       require('../assets/skin/10.jpg'),
       require('../assets/skin/11.jpg'),
       require('../assets/skin/12.jpg'),
       require('../assets/skin/13.jpg')
      //  require('../assets/skin/09.jpg'),
       ]
     }
   },
   props:{
     param:{
       type:Object,
       default:{}
     }
   },
   methods:{
     skinClick(item){
       console.log("=====item======")
       console.log(item)
          var mImg = new Image();
          mImg.src = item;
          let that = this;
          mImg.onload = function(){
             var base64 = that.getBase64Image(mImg);
             //console.log(base64);
            //  let res ={
            //    tag:that.skinTag,
            //    base64:base64
            //  }
            let res = Object.assign({},that.param);
            res["base64"] = base64;
             that.$emit('skinResult',res);
          }
     },
      getBase64Image(img) {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
         var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, img.width, img.height);
         var dataURL = canvas.toDataURL("image/png");
          return dataURL
     },
     btnClose(){
       this.$emit('skinResult','');
     }
   }
}
</script>

<style scoped>
img{
    width: 100px;
    height: 150px;
}
ul{
   display:flex;
   flex-wrap:wrap;
   padding: 0px;
}
ul li{
    list-style: none;
    margin: 6px;
    cursor: pointer;
    padding: 0px;
}
.cropper-modal{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55,55,55,.6);
    height: 100%;
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
}
  .cropper-modal .modal {
    width: 740px;
    height: 450px;
    background-color: #fff;
    position: relative;
  }

  .modal-head {
    position: relative;
    text-align: center;
    padding: 0 16px;
  }
 .head-wrap {
    position: relative;
    font-size: 14px;
    color: #222;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e5e9ef;
  }
    .close{
    top: -15px;
    position: absolute;
    right: -15px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    z-index: 100;
  }
</style>

