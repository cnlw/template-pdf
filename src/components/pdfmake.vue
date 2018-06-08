<template>
    <div>
        <h1>pdf本地预览版</h1>
        <!-- <input value="生成pdf" type="button" @click="pdf"/> -->
         <input value="开始操作" type="button" @click="startClick" v-if="!start"/>
         <input value="生成pdf" type="button" @click="pdfCode" v-if="start"/>
        <div style="display:flex;flex-direction: row;background-color:rgb(82, 86, 89);" v-if="start">
            <div class="sys-bar">
                <img src="../assets/skin.png" class="sys-skin" @click="isSkin=true"/>
                <!-- <img src="../assets/skin.png" class="sys-skin" @click="skinClick"/>
                <input  id="skinId" type="file" @change="skinChanged($event)" style="display:none"> -->
            </div>
        <ul style="padding: 0 20px 20px 20px;" >
            <li class="page" v-for="(page,indexs) in pages" :key="indexs" style="margin: 10px 0px;background: #fff;position: relative;" :style="{'background-image':'url('+page.bgImg+')'}">
                <ul class="editpage">
                    <li v-for="(item,index) in page.content" :key="index">
                        <!-- 一张图 模板一 start 文字居上 图片在底部 -->
                        <div  v-if="item.mode == 'pic-1-1'" class="box-boder" style="height: 447.14px" @click="boxClick($event)">
                            <m-title :id = item.titleId  :page = page.curr  :itemKey = index @result="titleResult"></m-title>
                            <UploadImg @result='upLoadResult' :src = item.src :page = page.curr :itemKey = index style="height:283px;margin-top: 14.12px;" :ratio="183/100"></UploadImg>
                            <textarea placeholder="输入描述"  v-model="item.txt" style="height:99.7575px;margin-top: 14.12px;width: inherit" class="common-textarea"/>
                        </div>

                         <!-- 一张图 模板二 start 图片左边，文字右方 -->
                        <div  v-if="item.mode == 'pic-1-2'" style="height:537.7px" class="box-boder">
                            <m-title :id = item.titleId  :page = page.curr  :itemKey = index @result="titleResult"></m-title>
                            <div style="display:flex;margin-top: 14.12px;height:486.76px">
                            <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index style="width:283px" :ratio="100/172"></UploadImg>
                            <textarea placeholder="输入描述" style="width:220.74px;margin-left: 14.12px;" class="common-textarea" v-model="item.txt"/>
                            </div>
                        </div>
                         <!-- 一张图 模板三 start 图片左边，文字右方 -->
                        <div  v-if="item.mode == 'pic-1-3'" style="height:203.76px" class="box-boder">
                            <m-title :id = item.titleId  :page = page.curr  :itemKey = index @result="titleResult"></m-title>
                            <div style="display:flex;margin-top: 14.12px;height:153.386px">
                            <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index style="width:283px"></UploadImg>
                            <textarea placeholder="输入描述" style="width:220.74px;margin-left: 14.12px;" class="common-textarea" v-model="item.txt"/>
                            </div>
                        </div>

                        <!--两张图 模板一 start-->
                        <div  v-if="item.mode == 'pic-2-1'" :style="{height:item.height+'px'}" class="box-boder">
                             <m-title :id = item.titleId  :page = page.curr  :itemKey = index @result="titleResult"></m-title>
                             <div style="display:flex;margin-top: 14.12px;height:401.86px" >
                                <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[0].tag :layoutId= item.imgs[0].layoutId style="width:226.4px;" :ratio="80/142"></UploadImg>
                                <div style="width: 277px;margin-left: 14.12px;">
                                    <UploadImg @result='upLoadResult' :src = item.src :page = page.curr :picTag= item.imgs[1].tag :layoutId= item.imgs[1].layoutId :itemKey = index style="height:152.82px"></UploadImg>
                                    <textarea placeholder="输入描述" v-model="item.txt" style="margin-top: 14.12px;width: inherit;height: 234.89px;" class="common-textarea"/>
                                </div>
                            </div>
                        </div>
                         <!--两张图 模板一 end-->

                         <!-- 两张图 模板二 start  图片 2张   -->
                        <div v-if="item.mode == 'pic-2-2'" :style="{height:item.height+'px'}" class="box-boder">
                            <m-title :id = item.titleId  :page = page.curr  :itemKey = index @result="titleResult"></m-title>
                            <div class="twoPic-Horizontal" style="height:447.14px;margin-top: 14.12px">
                              <UploadImg @result='upLoadResult' :src = item.imgs[0].src :page = page.curr  :itemKey = index style="width:251.87px" :picTag= item.imgs[0].tag :layoutId= item.imgs[0].layoutId :ratio="89/158" ></UploadImg>
                              <UploadImg @result='upLoadResult' :src = item.imgs[1].src :page = page.curr  :itemKey = index style="width:251.87px;margin-left: 14.12px;" :picTag= item.imgs[1].tag :layoutId= item.imgs[1].layoutId :ratio="89/158" ></UploadImg>
                            </div>
                            <textarea placeholder="输入描述" style="margin-top: 14.12px;width: inherit;height:100.465px" class="common-textarea" v-model="item.txt"/>
                        </div>

                        <!-- 两张图 模板三 start  图片 2张   -->
                        <div v-if="item.mode == 'pic-2-3'" :style="{height:item.height+'px'}" class="box-boder">
                            <m-title :id = item.titleId  :page = page.curr  :itemKey = index @result="titleResult"></m-title>
                            <div class="twoPic-Horizontal" style="height:141.5px;margin-top: 14.12px">
                              <UploadImg @result='upLoadResult' :src = item.imgs[0].src :page = page.curr  :itemKey = index style="width:251.87px" :picTag= item.imgs[0].tag :layoutId= item.imgs[0].layoutId :ratio="89/50" ></UploadImg>
                              <UploadImg @result='upLoadResult' :src = item.imgs[1].src :page = page.curr  :itemKey = index style="width:251.87px;margin-left: 14.12px;" :picTag= item.imgs[1].tag :layoutId= item.imgs[1].layoutId :ratio="89/50" ></UploadImg>
                            </div>
                            <textarea placeholder="输入描述" style="margin-top: 14.12px;width: inherit;height: 88.4375px;" class="common-textarea" v-model="item.txt"/>
                        </div>

                        <!--三张图 模板一 start -->
                        <div v-if="item.mode == 'pic-3-1'" class="box-boder"  :style="{height:item.height+'px'}">
                             <m-title :id = item.titleId  :page = page.curr  :itemKey = index @result="titleResult"></m-title>
                            <div style="display: flex;height:288.66px;margin-top: 14.12px">
                               <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[0].tag :layoutId= item.imgs[0].layoutId  :ratio="80/142" style="width: 162.72px;"></UploadImg>
                               <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[1].tag :layoutId= item.imgs[1].layoutId  :ratio="80/142" style="width: 162.72px;margin-left: 14.12px;"></UploadImg>
                               <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[2].tag :layoutId= item.imgs[2].layoutId  :ratio="80/142" style="width: 162.72px;margin-left: 14.12px;"></UploadImg>
                            </div>
                            <textarea placeholder="输入描述" v-model="item.txt" style="height:94.0975px;margin-top: 14.12px;width: inherit;" class="common-textarea"/>
                        </div>
                        <!--三张图 模板一 end -->

                        <!--三张图 模板二 start -->
                        <div v-if="item.mode == 'pic-3-2'" class="box-boder"   :style="{height:item.height+'px'}">
                             <m-title :id = item.titleId  :page = page.curr  :itemKey = index @result="titleResult"></m-title>
                             <div :style="{height:(item.height-(5+12.75)*2.83)+'px'}" style="display: flex;margin-top: 14.12px;">
                                 <div :style="{width:120*2.83+'px'}" style="display: flex;flex-direction: column;">
                                    <UploadImg :style="{height:67*2.83+'px'}" @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[0].tag :layoutId= item.imgs[0].layoutId  :ratio="120/67"></UploadImg>
                                    <div :style="{height:100*2.83+'px',width:120*2.83+'px'}" style="display: flex;margin-top: 14.12px;">
                                        <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[1].tag :layoutId= item.imgs[1].layoutId  :ratio="57.5/102" style="width: 162.72px;"></UploadImg>
                                        <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[2].tag :layoutId= item.imgs[2].layoutId  :ratio="57.5/102" style="width: 162.72px;margin-left: 14.12px;"></UploadImg>
                                    </div>
                                 </div>
                                 <textarea placeholder="输入描述" v-model="item.txt" :style="{width:120*2.83+'px'}" style="margin-left: 14.12px;" class="common-textarea"/>
                             </div>
                        </div>
                        <!--三张图 模板二 end -->

                         <!--三张图 模板三 start -->
                        <div v-if="item.mode == 'pic-3-3'" class="box-boder"   :style="{height:item.height+'px'}">
                             <m-title :id = item.titleId  :page = page.curr  :itemKey = index @result="titleResult"></m-title>
                             <div :style="{height:(item.height-(5+12.75)*2.83)+'px'}" style="display: flex;margin-top: 14.12px;">
                                 <div :style="{width:120*2.83+'px'}" style="display: flex;flex-direction: column;">
                                    <div :style="{height:100*2.83+'px'}" style="display: flex;">
                                        <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[0].tag :layoutId= item.imgs[1].layoutId  :ratio="57.5/102" style="width: 162.72px;"></UploadImg>
                                        <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[1].tag :layoutId= item.imgs[2].layoutId  :ratio="57.5/102" style="width: 162.72px;margin-left: 14.12px;"></UploadImg>
                                    </div>
                                    <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[2].tag :layoutId= item.imgs[0].layoutId  :ratio="120/67" style="height:189.61px;margin-top: 14.12px;"></UploadImg>
                                 </div>
                                 <textarea :style="{width:(183-120-5)*2.83+'px'}" style="margin-left: 14.12px;"  placeholder="输入描述" v-model="item.txt" class="common-textarea"/>
                             </div>
                        </div>
                        <!--三张图 模板三 end -->

                        <!--四张图 模板一 start -->
                        <div v-if="item.mode == 'pic-4-1'" class="box-boder"  :style="{height:item.height+'px'}">
                                <m-title :id = item.titleId  :page = page.curr  :itemKey = index @result="titleResult"></m-title>
                                 <div style="display: flex;margin-top: 14.12px;" :style="{height:50*2.83+'px'}">
                                    <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[0].tag :layoutId= item.imgs[0].layoutId  :ratio="89/50" style="width: 251.87px;"></UploadImg>
                                    <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[1].tag :layoutId= item.imgs[1].layoutId  :ratio="89/50" style="width: 251.87px;margin-left: 14.12px;"></UploadImg>
                                </div>
                                <textarea placeholder="输入描述"  v-model="item.txt" :style="{height:(item.height-(12.75+50+50+15)*2.83)+'px'}" style="margin-top: 14.12px;width: inherit;" class="common-textarea"/>
                                 <div style="display: flex;margin-top: 14.12px;" :style="{height:50*2.83+'px'}">
                                    <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[2].tag :layoutId= item.imgs[2].layoutId  :ratio="89/50" style="width: 251.87px;"></UploadImg>
                                    <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[3].tag :layoutId= item.imgs[3].layoutId  :ratio="89/50" style="width: 251.87px;margin-left: 14.12px;"></UploadImg>
                                </div>

                        </div>
                        <!--四张图 模板一 end -->

                        <!--四张图 模板二 start -->
                        <div v-if="item.mode == 'pic-4-2'" class="box-boder"  style="height:738.63px">
                                <m-title :id = item.titleId  :page = page.curr  :itemKey = index @result="titleResult"></m-title>
                                <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[0].tag :layoutId= item.imgs[0].layoutId  :ratio="183/102" style="display: flex;height:288.66px;margin-top: 14.12px;"></UploadImg>
                                <div style="display: flex;height:288.66px;margin-top: 14.12px">
                                  <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[1].tag :layoutId= item.imgs[1].layoutId  :ratio="57.5/102" style="width: 162.72px;"></UploadImg>
                                  <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[2].tag :layoutId= item.imgs[2].layoutId  :ratio="57.5/102" style="width: 162.72px;margin-left: 14.12px;"></UploadImg>
                                  <UploadImg @result='upLoadResult' :src = item.src :page = page.curr  :itemKey = index  :picTag= item.imgs[3].tag :layoutId= item.imgs[3].layoutId  :ratio="57.5/102" style="width: 162.72px;margin-left: 14.12px;"></UploadImg>
                                </div>
                                <textarea placeholder="输入描述"  :style="{height:item.height-(12.75+5+102+5+102+5)*2.83+'px'}" v-model="item.txt" style="height:82.7775px;margin-top: 14.12px;width: inherit;" class="common-textarea"/>

                        </div>
                        <!--四张图 模板二 end -->


                        <!-- 通栏 模板一 -->
                        <div v-if="item.mode == 'common-1'" class="box-boder"  style="height:56.6px">
                          <UploadImg  @result='upLoadResult' :src = item.src :page = page.curr :itemKey = index style="height:56.6px" :ratio="183/20"></UploadImg>
                        </div>
                        <!-- 通栏 模板二 -->
                        <div v-if="item.mode == 'common-2'" class="box-boder"  style="height:70.75px">
                          <UploadImg  @result='upLoadResult' :src = item.src :page = page.curr :itemKey = index style="height:70.75px" :ratio="183/25"></UploadImg>
                        </div>
                         <!-- 通栏 模板三 start-->
                        <div v-if="item.mode == 'common-3'" class="box-boder"  style="height:84.9px">
                          <UploadImg  @result='upLoadResult' :src = item.src :page = page.curr :itemKey = index style="height:84.9px" :ratio="183/30"></UploadImg>
                        </div>
                        <!-- 通栏 模板三 end-->

                        <!-- 通栏 模板四 start-->
                        <div v-if="item.mode == 'common-4'" class="box-boder"  style="height:99.05px">
                          <UploadImg  @result='upLoadResult' :src = item.src :page = page.curr :itemKey = index style="height:99.05px" :ratio="183/35"></UploadImg>
                        </div>
                        <!-- 通栏 模板四 end-->

                        <!-- 通栏 模板五 start-->
                        <div v-if="item.mode == 'common-5'" class="box-boder"  style="height:113.2px">
                          <UploadImg  @result='upLoadResult' :src = item.src :page = page.curr :itemKey = index style="height:113.2px" :ratio="183/40"></UploadImg>
                        </div>
                        <!-- 通栏 模板五 end-->

                        <!-- 通栏 模板六 start-->
                        <div v-if="item.mode == 'common-6'" class="box-boder"  style="height:127.35px">
                          <UploadImg  @result='upLoadResult' :src = item.src :page = page.curr :itemKey = index style="height:127.35px" :ratio="183/45"></UploadImg>
                        </div>
                        <!-- 通栏 模板六 end-->
                    </li>
                </ul>
                 <div @click="changePageBg(indexs)">换背景</div>
                 <img src="../assets/img-close.png" v-if="indexs==lastestCurr" class="del" :style="delBtn" @click="btnDelClick"/>
                 <div @click="add" v-if="indexs==lastestCurr">继续添加</div>
            </li>
        </ul>
         <iframe id="pdfV" frameborder="0" width="400" height="600" :src="iframeData"></iframe>
        </div>
        <selectItem v-show="isSelectItem" @selectItemResult="selectItemResult"></selectItem>
        <selectSkin v-show="isSkin" @skinResult="skinResult" :param="skinParam"></selectSkin>
        <!-- bar 操作栏 -->
        <!-- <div class="bar-bg">

        </div> -->
    </div>
</template>
<script>
import "pdfmake/build/pdfmake";
//import "pdfmake/build/vfs_fonts";
// import  "pdfmake/build/方正姚体vfs_fonts";
// import '../assets/pdf-fonts/方正姚体vfs_fonts'
// import '../assets/pdf-fonts/vfs_fonts.js'
// import '../libs/pdfmake/fonts/msyh_fonts.js'
import UploadImg from "../components/UploadImg"
import selectItem from "../components/selectItem"
import selectSkin from "../components/selectSkin"

import moment from 'moment'
import mTitle from "../components/mTitle"
export default {
      mounted() {
        const s = document.createElement('script');
        s.type = 'text/javascript';                                 
        s.src = 'https://alicdn.talianshe.com/tls_php_resources/tls_web_assests/msyh_fonts.js';
        document.body.appendChild(s);
        },
     data(){
        return{
         start:false, //标记是否开始操作
         isSelectItem:false,
         isSkin:false, //标记背景选择框
         skinParam:{},//背景标识
         sysbgImg:'',
         //sysbgImg:'data:image/jpeg;base64,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',
         pages:[{curr:1,bgImg:'',content:[
            //  {
            //        mode:'pic-2-1',height:170*2.83,imgs:[
            //                {src:'',tag:'one',layoutId:"pic-2-1-pic1"},
            //                {src:'',tag:'two',layoutId:"pic-2-1-pic2"}]
            //  }

         ]}],
         pdfDocGenerator:'',
         iframeData:'',
         lastestCurr:0, //最新页下标
         pageHeight:803.89, //可用高度
        // mode:{"mode1":}
       /*  mode1IMG:{   //16:9  宽度500 多像素
            width: 519.28,
            height:292.09
         },*/
         timeSt:new Date().getTime(),
       // mode3:{mode:3,imgs:[{src:'',tag:'one',layoutId:"mode3-pic1-"+this.timeSt},{src:'',tag:'two',layoutId:"mode3-pic2-"+this.timeSt+1}],height:180+5}
         }
        },
     components:{
        UploadImg,
        selectItem,
        mTitle,
        selectSkin
     },
     watch:{
      /*   pages:{
            handler(newValue, oldValue) {
            //  console.log('=====handler=======')
            //  let timer = setTimeout(function() {
			// 	}, 100);
            // },
                //this.pdfCode();

            },
             deep:true
         }*/
     },
    computed:{
        delBtn(){
             let mContent = this.pages[this.lastestCurr].content;
                let h=0;
                if(mContent.length>1){  //计算 删除按钮 top
                   // console.log("len==>"+mContent.length)
                        for(let m in mContent){
                                h+=mContent[m].height+10; //10 代表也 组件框 的padding
                        }
                         h=h-mContent[mContent.length-1].height-10;
                }
           // console.log("高度===>"+h)
           // console.log("删除按钮高度")
            return "top:"+h+"px";
        }
    },
    methods:{
        //单页换背景
       changePageBg(index){
           this.skinParam={
               tag:'pageBg',
               index:index
           }
           this.isSkin=true
       },
    //    changeSysBg(){ //改变全局皮肤
            
    //    }
       btnDelClick(){
        let mContent = this.pages[this.lastestCurr].content; //页面内容
        // console.log(mContent);
        console.log("=====删除按钮事件======")
        if(mContent.length>1){
            mContent.splice(mContent.length-2,2); // 删除2个元素
           // mContent.splice(mContent.length-1,1);
        }else{
            this.pages.splice(this.pages.length-1,1)  //只有一个删除 本页
            if(this.lastestCurr>0){
              this.lastestCurr = this.lastestCurr-1;
            }else{
               this.pages=[{curr:1,content:[],bgImg:''}],
               this.start = false;
            }
        }
        console.log(mContent);
       },
       boxClick(e){
        //    console.log("===boxClick===")
           console.log(e.currentTarget)
       },
        startClick(){  //开始操作按钮
           this.add();
        },
        skinResult(res){ //背景选择返回数据
           this.isSkin = false;
           this.skinParam = {};
           console.log(res)
           if(res){
               let tag = res.tag;
               if(tag == "pageBg"){ //单页面 换背景
                    this.pages[res.index].bgImg = res.base64
               }else{ //系统全局换背景
                   this.sysbgImg  = res.base64;
                   for(let m in this.pages){
                       if(!this.pages[m].bgImg){
                          this.pages[m].bgImg = res.base64
                       }
                   }
               }
               //this.sysbgImg = res;
           }
           console.log("skinResult");
        },
        selectItemResult(itemRes){
            this.isSelectItem=false;
            if(itemRes){
                this.start = true;
                console.log("选取排版==》"+itemRes.mode)
                this.timeSt=new Date().getTime();
                let mContent = this.pages[this.lastestCurr].content;
                let h=0;
                for(let m in mContent){
                    h+=mContent[m].height;
                }
                console.log("h==>"+h)
                console.log("可用高度==>"+(this.pageHeight-h))
                let c = itemRes.height ; //预添加控件高度
                if(c>(this.pageHeight-h)){
                    let page = this.pages[this.lastestCurr].curr+1;
                    this.lastestCurr+=1;
                    let mBgImg = '';
                    if(this.sysbgImg){
                        mBgImg = this.sysbgImg;
                    }
                    this.pages.push({curr:page,content:[],bgImg:mBgImg});
                    mContent = this.pages[this.lastestCurr].content;
                    console.log("新增一页")
                }
                // console.log(obj);
               // this.pages[this.lastestCurr].content.push(obj)
               // if()
            //    console.log(this.mode3);
            //    for(let key in this.mode3){
            //        if(key == "imgs"){ //多张图
            //          for(let m in this.mode3[key]){
            //              this.mode3[key][m]["layoutId"] = "mode"+this.mode3.mode+"-pic"+(m+1)+"-"+new Date().getTime();
            //          }
            //        }
            //    }
            //    console.log(this.mode3)

            //    //动态绑定 ID  return;

                if(mContent.length>0){ //模块加分隔间隔 8mm
                    mContent.push({mode:"sys-interval",height:8*2.83})
                }

                if(itemRes.mode == "pic-1-1"){ //1张图 模板一
                   mContent.push({
                       mode:itemRes.mode,
                       height:itemRes.height,
                       layoutId:"mode1-"+this.timeSt,
                       txtheight:58*2.83,
                       tite:"common-title",
                       titleId:'pic-1-1-title'
                   })
                }
                if(itemRes.mode == "pic-1-2"){  //1张图 模板二
                    mContent.push({
                       mode:itemRes.mode,
                       height:itemRes.height,
                       layoutId:"mode1-"+this.timeSt,
                       tite:"common-title",
                       titleId:'pic-1-2-title'
                   })
                }
                if(itemRes.mode == "pic-1-3"){  //1张图 模板三
                    mContent.push({
                       mode:"pic-1-3",
                       height:itemRes.height,
                       layoutId:"mode1-"+this.timeSt,
                       tite:"common-title",
                       titleId:'pic-1-3-title'
                   })
                }
                if(itemRes.mode == 'pic-2-1'){ //2张图 模板一
                    mContent.push({
                       titleId:'pic-2-1-title',
                       tite:"common-title",
                       mode:itemRes.mode,
                       height:itemRes.height,
                       imgs:[
                           {src:'',tag:'one',layoutId:"pic-2-1-pic1"},
                           {src:'',tag:'two',layoutId:"pic-2-1-pic2"}]
                   })
                }
                if(itemRes.mode == "pic-2-2"){ //2张图 模板二
                   mContent.push({
                       mode:itemRes.mode,
                       imgs:[{src:'',tag:'one',layoutId:"pic-2-2-pic1"},{src:'',tag:'two',layoutId:"pic-2-2-pic2"}],
                       height:itemRes.height,
                       titleId:'pic-2-2-title',
                       tite:"common-title",
                   });
                }
                if(itemRes.mode == "pic-2-3"){ //2张图 模板三
                   mContent.push({
                       mode:itemRes.mode,
                       imgs:[{src:'',tag:'one',layoutId:"pic-2-3-pic1"},{src:'',tag:'two',layoutId:"pic-2-3-pic2"}],
                       height:itemRes.height,
                       titleId:'pic-2-3-title',
                       tite:"common-title",
                   });
                }
                if(itemRes.mode == 'pic-3-1'){  //3张图 模板一
                    mContent.push({
                       titleId:'pic-3-1-title',
                       tite:"common-title",
                       mode:itemRes.mode,height:itemRes.height,imgs:[
                           {src:'',tag:'one',layoutId:"pic-3-1-pic1"},
                           {src:'',tag:'two',layoutId:"pic-3-1-pic2"},
                           {src:'',tag:'three',layoutId:"pic-3-1-pic3"}]
                   })
                }
                if(itemRes.mode == 'pic-3-2'){  //3张图 模板一
                    mContent.push({
                       titleId:'pic-3-2-title',
                       tite:"common-title",
                       mode:itemRes.mode,
                       height:itemRes.height,
                       imgs:[
                           {src:'',tag:'one',layoutId:"pic-3-2-pic1"},
                           {src:'',tag:'two',layoutId:"pic-3-2-pic2"},
                           {src:'',tag:'three',layoutId:"pic-3-2-pic3"}]
                   })
                }
                if(itemRes.mode == 'pic-3-3'){  //3张图 模板三
                    mContent.push({
                       titleId:'pic-3-3-title',
                       tite:"common-title",
                       mode:itemRes.mode,
                       height:itemRes.height,
                       imgs:[
                           {src:'',tag:'one',layoutId:"pic-3-3-pic1"},
                           {src:'',tag:'two',layoutId:"pic-3-3-pic2"},
                           {src:'',tag:'three',layoutId:"pic-3-3-pic3"}]
                   })
                }
                if(itemRes.mode == 'pic-4-1'){ //4张图 模板一
                      mContent.push({
                       titleId:'pic-4-1-title',
                       tite:"common-title",
                       mode:itemRes.mode,
                       height:itemRes.height,
                       imgs:[
                           {src:'',tag:'one',layoutId:"pic-4-1-pic1"},
                           {src:'',tag:'two',layoutId:"pic-4-1-pic2"},
                           {src:'',tag:'three',layoutId:"pic-4-1-pic3"},
                           {src:'',tag:'four',layoutId:"pic-4-1-pic4"}]
                   })
                }
                if(itemRes.mode == 'pic-4-2'){ //4张图 模板二
                      mContent.push({
                       titleId:itemRes.mode+'-title',
                       tite:"common-title",
                       mode:itemRes.mode,
                       height:itemRes.height,
                       imgs:[
                           {src:'',tag:'one',layoutId:itemRes.mode+"-pic1"},
                           {src:'',tag:'two',layoutId:itemRes.mode+"-pic2"},
                           {src:'',tag:'three',layoutId:itemRes.mode+"-pic3"},
                           {src:'',tag:'four',layoutId:itemRes.mode+"-pic4"}]
                   })
                }
                if(itemRes.mode=="common-layout-1"){
                     mContent.push({
                         mode:"common-layout-1",height:20*2.83
                     })
                }
                //通栏模板(尺寸1)
                if(itemRes.mode=="common-1"){
                     mContent.push({
                         mode:itemRes.mode,height:20*2.83
                     })
                }
                  //通栏模板(尺寸2)
                if(itemRes.mode=="common-2"){
                     mContent.push({
                         mode:itemRes.mode,height:25*2.83
                     })
                }
                //通栏模板(尺寸3)
                if(itemRes.mode=="common-3"){
                     mContent.push({
                         mode:itemRes.mode,height:itemRes.height
                     })
                }
                //通栏模板(尺寸4)
                if(itemRes.mode=="common-4"){
                     mContent.push({
                         mode:itemRes.mode,height:itemRes.height
                     })
                }
                //通栏模板(尺寸5)
                if(itemRes.mode=="common-5"){
                     mContent.push({
                         mode:itemRes.mode,height:itemRes.height
                     })
                }
                 //通栏模板(尺寸6)
                if(itemRes.mode=="common-6"){
                     mContent.push({
                         mode:itemRes.mode,height:itemRes.height
                     })
                }
                console.log(this.pages[this.lastestCurr].content)

            }
        },
        // skinChanged(e){ //暂时废弃
        //      let that = this;
        //         let file = e.target.files[0];
        //         var reader = new FileReader();  
        //         reader.readAsDataURL(file);//调用自带方法进行转换  
        //         reader.onload = function(e) {  
        //              that.sysbgImg = this.result;
        //         }
        // },
        skinClick(){
            document.getElementById("skinId").click();
        },
        upLoadResult(res){
            console.log(res)
            let page = this.pages.filter(u=>u.curr === res.page);
            let item = page[0].content[res.itemKey]; //获取item
           // console.log(typeof item.img)
            if(!item.imgs){
               item["base64"] = res.base64;
            }else{  //多张图使用 启动 图片标识判断
               //
                let tmp = item.imgs.filter(u=>u.layoutId === res.layoutId)
                tmp[0]["base64"] = res.base64;
              //  console.log(tmp)


            }
            console.log(this.pages)
        },
        titleResult(res){
            let page = this.pages.filter(u=>u.curr === res.page);
            let item = page[0].content[res.itemKey]; //获取item
            item["titleData"] = res.data;
            console.log("=======titleResult=========")
           // console.log(res);
           // console.log(this.pages)

        },
        add(){
            this.isSelectItem = true;
        },
        pdfCode(){

            /****
             *
             * pageBreak 分页符  after  ...之后分页
             * alignment 格式   默认左对齐  center 居中
             * 	A4: [595.28, 841.89],  38  841.89-38
             * page 内容 高度 841.89-38 = 803.89
             *
             */
            console.log("=======pdfCode========")
           // console.log(JSON.stringify(this.pages));
            //删除 base64 key
           ///pdfMake.vfs = pdfFonts.pdfMake.vfs;
            //console.log(this.pages)
            let mfontSize = 16 //字体 小四
            let mPageData = this.pages;
            let mSysbgImg = this.sysbgImg;

            let pdfbgs={};
            for(let m in mPageData){    //生成每页背景需要的数据， 可能由于内部回调的原因，暂时使用这种方式
                //if(mPageData[m].bgImg){
                  pdfbgs["sysbgImg-"+m] = mPageData[m].bgImg;
               // }
            }

            var dd = {
                 defaultStyle: { font: 'msyh'},
                 background: function(currentPage) { //设置每页背景图

                   if(mPageData[currentPage-1].bgImg){ //判断当前页是否有背景图数据 
                      return {image:"sysbgImg-"+(currentPage-1),height:841.89,width:595.28}
                   }

                 },
                 content:[],
                 images:pdfbgs, //图片数据
            }
             pdfMake.fonts = {
                    msyh: {
                        normal: 'msyh.ttf',
                        bold: 'msyh.ttf',
                        italics: 'msyh.ttf',
                        bolditalics: 'msyh.ttf',
                    }
            };
            for(let m in this.pages){
                let content = this.pages[m].content;
                console.log("=====第"+this.pages[m].curr+"页=========")
                if(m>0){
                    console.log("执行分页")
                    dd.content.push({text:'',pageBreak:'after'}); //分页
                 }
                for(let j in content){
                    let mode = content[j].mode; //模式 设置 生成 相应的 pdf布局代码
                    let txt = content[j].txt;  //文字
                    console.log("mode=====>"+mode)
                    //通用头部
                    if(content[j].tite == "common-title"){
                        let titleData = content[j].titleData;
                      /*  dd.content.push({
                           	 columns: [
                                {
                                    text:titleData.leftTxt,fontSize:18
                                },
                                {
                                    text:titleData.rightTxt1,alignment: 'right',fontSize:14
                                }]
                            });
                         dd.content.push({
                            text:titleData.rightTxt2,alignment: 'right',fontSize:14,margin: [0,0,0,5*2.83]
                        })*/

                         dd.content.push({
                             columns: [
                                {text: titleData.leftTxt,fontSize:18,margin: [0,5,0,5]},
                                [
                                {text: titleData.rightTxt1,fontSize:14,alignment: 'right'},
                                {text: titleData.rightTxt2,fontSize:14,alignment: 'right',margin: [0,0,0,5*2.83] }]
                            ]})
                     }
                    if(mode=="pic-1-1"){ //一张图 模板一
                        dd.content.push({image:content[j].base64,fit:[183*2.83, 100*2.83]})
                        dd.content.push({text:txt, fontSize: mfontSize, style: 'subheader', color:'#000',margin: [0,5*2.83,0,0],height:(160-100-10-12.75)*2.83,lineHeight:1.5})  //160-102-5
                    }
                     if(mode=="pic-1-2"){ //一张图 模板二
                        dd.content.push(
                            {
                              columns: [
                                {
                                   image: content[j].base64,
                                   //fit: [100*2.83, 56.2*2.83],
                                      width: 100*2.83,
                                      height: 172*2.83
                                },
                                {
                                    text:txt,fontSize:mfontSize,margin: [5*2.83,0,0,0],width:(183-5-100)*2.83,height: 172*2.83,lineHeight:1.5
                                }
                            ]
                            }
                        )

                    }
                    if(mode=="pic-1-3"){ //一张图 模板三
                        dd.content.push(
                            {
                              columns: [
                                {
                                   image: content[j].base64,
                                   fit: [100*2.83, 54.2*2.83],
                                },
                                {
                                    text:txt,fontSize:mfontSize,margin: [5*2.83,0,0,0],width:78*2.83,lineHeight:1.5
                                }
                            ]
                            }
                        )

                    }
                    if(mode=="pic-2-1"){ //2张图 模板一
                         let imgs = content[j].imgs;
                          dd.content.push({
                            columns: [
                                {
                                        image: imgs[0].base64,
                                        width: 80*2.83,
                                        height: 142*2.83
                                        //fit: [80*2.83,142*2.83] ,

                                },
                                [
                                    { image: imgs[1].base64,
                                        fit: [98*2.83, 54*2.83] ,
                                        margin: [5*2.83,0,0,0]
                                    },
                                    {
                                        margin: [5*2.83,5*2.83,0,0],
                                        text:txt,
                                        fontSize:mfontSize,
										lineHeight:1.5
                                    }
                                ],
                            ]
                          })
                    }
                    if(mode=='pic-2-2'){  //2张图 模板二
                        let imgs = content[j].imgs;
                        dd.content.push(
                            {
                                columns: [{
                                     image: imgs[0].base64,
                                     width:  89*2.83,
                                     height: 158*2.83

                                    },
                                    {
                                    image: imgs[1].base64,
                                    width:  89*2.83,
                                    height: 158*2.83,
                                    margin: [5*2.83,0,0,0]
                                    }
                                ]
                            }
                        )
                        dd.content.push({text:txt, fontSize: mfontSize, style: 'subheader',margin: [0,5*2.83,0,0],height:(216-158-10-12.75),lineHeight:1.5})
                     }
                    if(mode=='pic-2-3'){  //2张图 模板三
                        let imgs = content[j].imgs;
                        dd.content.push(
                            {
                                columns: [{
                                     image: imgs[0].base64,
                                     width:  89*2.83,
                                     height: 50*2.83

                                    },
                                    {
                                    image: imgs[1].base64,
                                    width:  89*2.83,
                                    height: 50*2.83,
                                    margin: [5*2.83,0,0,0]
                                    }
                                ]
                            }
                        )
                        dd.content.push({text:txt, fontSize: mfontSize, style: 'subheader',margin: [0,5*2.83,0,0],height:(104-50-10-12.75),lineHeight:1.5})
                     }
                    if(mode=="pic-3-1"){ //3张图 模板一
                        let imgs = content[j].imgs;
                        dd.content.push({
                        columns: [
                            {
                                    image: imgs[0].base64,
                                   	width:  57.5*2.83,
                                    height: 102*2.83,
                            },
                            {
                                    image: imgs[1].base64,
                                    width:  57.5*2.83,
                                    height: 102*2.83,
                                    margin: [5*2.83,0,0,0]

                            },
                            {
                                    text:'',
                                    margin: [5*2.83,0,0,0],
                            },
                            {
                                    image: imgs[2].base64,
                                    width:  57.5*2.83,
                                    height: 102*2.83,
                            }
                        ]
                        })
                         dd.content.push({
                             text:txt,fontSize:mfontSize,margin: [0,5*2.83,0,0],height:(158-102-12.75-10),lineHeight:1.5
                         });
                    }
                    if(mode == "pic-3-2"){ //3张图 模板二
                     let imgs = content[j].imgs;
                        dd.content.push({
                         	columns: [
                                [
                                {
                                    image: imgs[0].base64,
                                    width: 120*2.83,
                                    height: 67*2.83,
                                    margin:[0,0,0,5*2.83]
                                },
                                {
                                    columns: [
                                        {
                                            image: imgs[1].base64,
                                            width: 57.5*2.83,
                                            height: 100*2.83
                                        },
                                        {
                                            image: imgs[2].base64,
                                            width: 57.5*2.83,
                                            height: 100*2.83,
                                            margin: [5*2.83,0,0,0]
                                        },
                                        ]
                                }
                                ],
                                {  	margin: [5*2.83,0,0,0],
                                    width:  (183-120-5)*2.83,
                                    height: (190-12.75-5-67-5-100)*2.83,
                                    text:txt,
                                    fontSize:mfontSize,
									lineHeight:1.5
                                }
                            ]
                        })
                    }
                     if(mode == "pic-3-3"){ //3张图 模板三
                     let imgs = content[j].imgs;
                        dd.content.push({
                         	columns: [
                                [
                                {
                                    columns: [
                                        {
                                            image: imgs[0].base64,
                                            width: 57.5*2.83,
                                            height: 100*2.83
                                        },
                                        {
                                            image: imgs[1].base64,
                                            width: 57.5*2.83,
                                            height: 100*2.83,
                                            margin: [5*2.83,0,0,0]
                                        },
                                        ]
                                },
                                {
                                    image: imgs[2].base64,
                                    width: 120*2.83,
                                    height: 67*2.83,
                                    margin:[0,5*2.83,0,0]
                                }
                                ],
                                {  	margin:[5*2.83,0,0,0],
                                    width:(183-120-5)*2.83,
                                    height:(190-12.75-5)*2.83,
                                    text:txt,
                                    fontSize:mfontSize,
									lineHeight:1.5
                                }
                            ]
                        })
                    }
                    if(mode=="pic-4-1"){ //4张图 模板一
                        let imgs = content[j].imgs;
                        dd.content.push({
                            columns: [{
                                image:  imgs[0].base64,
                                width:  89*2.83,
                                height: 50*2.83

                            },
                            {
                                image: imgs[1].base64,
                                width:  89*2.83,
                                height: 50*2.83,
                                margin: [5*2.83,0,0,0]
                            }]});
                        dd.content.push({
                            margin: [0,5*2.83,0,5*2.83],
                            text:txt,
                            width:183*2.83,
                            height:(158-(12.75+50+50+15))*2.83,
                            fontSize:mfontSize,
							lineHeight:1.5
                         });
                        dd.content.push({
                            columns: [{
                                image:  imgs[2].base64,
                                width:  89*2.83,
                                height: 50*2.83

                            },
                            {
                                image: imgs[3].base64,
                                width:  89*2.83,
                                height: 50*2.83,
                                margin: [5*2.83,0,0,0]
                        }]});
                    }
                    if(mode=="pic-4-2"){ ////4张图 模板二
                            let imgs = content[j].imgs;
                            dd.content.push({image:imgs[0].base64,fit:[183*2.83, 102*2.83],margin: [0,0,0,5*2.83],})
                            dd.content.push({
                                    columns: [
                                        {
                                                image: imgs[1].base64,
                                                width:  57.5*2.83,
                                                height: 102*2.83,
                                        },
                                        {
                                                image: imgs[2].base64,
                                                width:  57.5*2.83,
                                                height: 102*2.83,
                                                margin: [5*2.83,0,0,0]

                                        },
                                        {
                                                text:'',
                                                margin: [5*2.83,0,0,0],
                                        },
                                        {
                                                image: imgs[3].base64,
                                                width:  57.5*2.83,
                                                height: 102*2.83,
                                        }
                                    ]
                                })
                           dd.content.push({
                                margin: [0,5*2.83,0,0],
                                text:txt,
                                width:183*2.83,
                                height:261-(12.75+5+102+5+102+5)*2.83,
                                fontSize:mfontSize,
								lineHeight:1.5

                          });
                    }

                    if(mode == "common-layout-1"){
                       dd.content.push({
                           	 columns: [
                                {
                                    text:content[j].leftTxt,fontSize:18
                                },
                                {
                                    text:content[j].rightTxt1,alignment: 'right',fontSize:14
                                }]
                            });
                         dd.content.push({
                            text:content[j].rightTxt2,alignment: 'right',fontSize:14
                            })
                    }
                    //通栏一
                    if(mode=="common-1"){
                        dd.content.push({image:content[j].base64,fit:[183*2.83, 20*2.83]})
                    }
                    //通栏二
                     if(mode=="common-2"){
                        dd.content.push({image:content[j].base64,fit:[183*2.83, 25*2.83]})
                    }
                     //通栏三
                     if(mode=="common-3"){
                        dd.content.push({image:content[j].base64,fit:[183*2.83, 30*2.83]})
                    }
                     //通栏四
                     if(mode=="common-4"){
                        dd.content.push({image:content[j].base64,fit:[183*2.83, 35*2.83]})
                    }
                     //通栏五
                     if(mode=="common-5"){
                        dd.content.push({image:content[j].base64,fit:[183*2.83, 40*2.83]})
                    }
                    //通栏六
                    if(mode=="common-6"){
                        dd.content.push({image:content[j].base64,fit:[183*2.83, 45*2.83]})
                    }
                    //模板间隔
                    if(mode == "sys-interval"){
                        dd.content.push({ text:'',margin: [0,content[j].height,0,0]});
                    }
                }
            }
             console.log("=======pdfCode end ==========")
               const pdfDocGenerator = pdfMake.createPdf(dd);
               document.getElementById('pdfV').src = '';
               pdfDocGenerator.getDataUrl((dataUrl) => {  //pdf 预览
                  this.iframeData = dataUrl;
                  console.log('====生成pdf预览=====')
                });
               pdfDocGenerator.download(moment().format('YYYY-MM-DD-HHmmss')+".pdf");
        }

    }


}
</script>
<style scoped>
.sys-bar{
  margin-left: 20px;
  display: flex;
  height: 35px;
  position: absolute;
  margin-left: 20px;

}
.sys-skin{
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.del{
    height: 18px;
    width: 18px;
    position: absolute;
    z-index: 1000px;
    right:20px;
    top:0px;
    cursor: pointer;
}
.bar-bg{
     background: #303133;
     height: 30px;
     width: 100px;
     z-index: 2063;
     position: absolute;
     margin-top: 100px

}
ul,li{
  padding: 0px;
}
ul li{
    list-style: none;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.page{
    border:1px solid rgb(46, 42, 42);
    width: 595.28px;
}
img{
     width: 100%;
     height: 150px;
 }
 .editpage{
     width: 517.89px;
 }
 .twoPic{
     border:1px dashed #000;
     width: 100%;
     padding: 10px;
     margin: 10px 0px;
 }
 .twoPic-Horizontal{
     display: flex;
     flex-direction: row;
 }
 /* 通用textarea 样式 */
 .common-textarea{
    resize: none;
    padding: 0px;
    font-size: 16px;
    line-height:17.96px;
 }
</style>
<style>
.box-boder{
    position: relative;
    border: 1px dashed rgb(0, 0, 0);
    width: 100%;
    margin: 10px 0px;
    padding: 10px;
}
</style>



