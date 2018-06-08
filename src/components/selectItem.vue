<template>
    <div class="cropper-modal">
        <div class="modal">
        <img src="../assets/img-close.png" class="close" @click="btnClose">
        <div class="modal-head">
            <div class="head-wrap">选取排版</div>
            <ul> <li v-for="(item,index) in layoutData" :key="index" @click="itemClick(item)">{{item.desc}}</li>
            </ul>
        </div>
        </div>
    </div>
</template>
<script>
export default {
     data(){
        return{
            layoutData:[
                // {mode:1,desc:'1张图片(16:9) + 文字,垂直',height:160*2.83},
                //{mode:2,desc:'1张图片(16:9) + 文字,水平',height:100*2.83},

                {mode:'pic-1-1',desc:'1张图片(模板一)',height:158*2.83}, //160*2.83
                {mode:'pic-1-2',desc:'1张图片(模板二)',height:190*2.83}, //196*2.83
                {mode:'pic-1-3',desc:'1张图片(模板三)',height:72*2.83}, //74*2.83

                {mode:'pic-2-1',desc:'2张图片(模板一)',height:170*2.83},
                {mode:'pic-2-2',desc:'2张图片(模板二)',height:216*2.83},//215*2.83
                {mode:'pic-2-3',desc:'2张图片(模板三)',height:104*2.83},//107*2.83

                {mode:'pic-3-1',desc:'3张图片(模板一)',height:158*2.83}, //160
                {mode:'pic-3-2',desc:'3张图片(模板二)',height:190*2.83}, //192
                {mode:'pic-3-3',desc:'3张图片(模板三)',height:190*2.83}, //192

                {mode:'pic-4-1',desc:'4张图片(模板一)',height:158*2.83}, //163
                {mode:'pic-4-2',desc:'4张图片(模板二)',height:261*2.83},
                // {mode:3,desc:'2张图片(16:9) + 文字,垂直',height:175,initData:{mode:3,imgs:[{src:'',tag:'one'},{src:'',tag:'two'}],height:180+5}},
              //  {mode:"common-layout-1",desc:"通栏(183mmx20mm)",height:20*2.83},
                {mode:"common-1",desc:"通栏(183mmx20mm)",height:20*2.83},
                {mode:"common-2",desc:"通栏(183mmx25mm)",height:25*2.83},
                {mode:"common-3",desc:"通栏(183mmx30mm)",height:30*2.83},
                {mode:"common-4",desc:"通栏(183mmx35mm)",height:35*2.83},
                {mode:"common-5",desc:"通栏(183mmx40mm)",height:40*2.83},
                {mode:"common-6",desc:"通栏(183mmx45mm)",height:45*2.83}



              //  {mode:4,desc:'2张图片(4:3) + 文字'},
              //  {mode:5,desc:'3张图片 + 文字'}
                ]
        }
    },
    methods:{
        btnClose(){
            this.$emit('selectItemResult','');
        },
        itemClick(item){
            this.$emit('selectItemResult',item);
        }

  
    }
}
</script>
<style scoped>
ul{
   display:flex;
   flex-wrap:wrap;
}
ul li{
    list-style: none;
    padding: 20px;
    margin: 5px;
    border: 1px solid #e5e9ef;
    width: 25%;
    cursor: pointer;
}
.cropper-modal{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55,55,55,.6);
    height: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}
  .cropper-modal .modal {
    width: 840px;
    height: 550px;
    background-color: #fff;
    position: relative;
  }

  .modal-head {
    position: relative;
    text-align: center;
    padding: 0 16px 0 40px;
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


