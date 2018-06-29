

<template>
    <div class="manage">
        <div class="title flex_between" >
            <div>id</div>
            <div>标题</div>
            <div>图片</div>
            <div>操作</div>
        </div>
        <div class="item flex_between" v-for="(item,index) in dataList" :key="index">
            <div>{{item._id}}</div>
            <div>{{item.title}}</div>
            <div>

            <img :src="item.post">
            </div>
            <div class="flex_between">
                <button type="button" class="manage_btn ivu-btn ivu-btn-primary" @click="onEdit(item._id)"><span>编辑</span></button>
                <button type="button" class="manage_btn ivu-btn ivu-btn-error" @click="onDelete(index,item._id)"><span>删除</span></button>
            </div>
        </div>
    </div>
</template>

<script>
import path from '../../../../mixins/common.js'
export default {
    name: 'manage',
    data () {
        return {
            dataList:[],
            pagenum:0,
            pagesize:10
        };
    },
    methods: {
        getData () {
            this.$http.post(`api/recommend/all`,{
                pagenum:this.pagenum,
                pagesize:this.pagesize,
                })
                .then(res => {
                this.dataList = [...this.dataList, ...res.data.data];
                console.log(this.dataList);
                })
                .catch(function(error) {
                console.log(error);
            });
        },
        onDelete(index,id){
            this.$http(`api/recommend/delete`,{
                id:id
                })
                .then(res => {
                    console.log(res)
                    this.dataList.splice('index',1)
                })
                .catch(function(error) {
                console.log(error);
            });

        },
        onEdit(id){
            this.$router.push({
                path:`../edit?id=${id}`
            })
        }
        
    },
    created () {
        this.getData();
    }
};
</script>
<style lang="less" scope>
.flex{
    display:flex;
}
.flex_between{
    display: flex;
    align-content: center;
    justify-content: space-between; 
    text-align: center;
}
.title{
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    padding: 10px;
    div{
        flex:1;
    }
}
.item{
    height: 70px;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    box-sizing: border-box;
    img{
        width: 60px;
        height: 60px;
    }
    div{
        flex:1;
    }
    
}
.item div:nth-of-type(2){
    flex:3;
}
.manage_btn{
    height: 20px;
    line-height: 20px;
    padding: 0;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
    margin-left: 15px;
    margin-right: 15px;
}
</style>
