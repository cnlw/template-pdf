<template>
         <div class="newMode1-txt">
            <input placeholder="输入描述"  v-model="data.leftTxt" class="input-newMode" style="font-size:18px;padding: 0px;height:18px"/>
            <div class="right">
                <input placeholder="输入描述"  v-model="data.rightTxt1" class="input-newMode" style="font-size:14px;height:14px;text-align:right"/>
                <input placeholder="输入描述"  v-model="data.rightTxt2" class="input-newMode" style="font-size:14px;height:14px;padding: 2px 0 1px 0;text-align:right"/>
            </div>
         </div>
</template>
<script>
export default {
    data(){
        return{
            data:{}
        }
    },
    props:{
        id:{
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
    },
    watch:{
        data:{
            handler(newName, oldName) {
                //console.log(newName)
                let res ={
                    page:this.page,
                    itemKey:this.itemKey,
                    data:newName
                } 
                this.$emit("result",res)
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.input-newMode{
    padding: 0px;
    height:14px;
    border: 0px;
    border-bottom:1px dashed #000;
}
.newMode{
 border:1px dashed #000;
 width: 100%;
 padding: 10px;
}
.newMode1-txt{
 display:flex;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 height:36.08;
}
.right{
 display:flex;
 flex-direction: column;
} 
</style>

