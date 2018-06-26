

<template>
    <div class="manage">
        <div class="title flex_between" >
            <div>id</div>
            <div>姓名</div>
            <div>头像</div>
            <div>手机号码</div>
            <div>操作</div>
        </div>
        <div class="item flex_between" v-for="(item,index) in dataList" :key="index">
            <div>{{item._id}}</div>
            <div>{{item.nickname}}</div>
            <div>
            <img :src="item.avatar">
            </div>
            <div>{{item.phoneNumber}}</div>
            <div class="flex_between">
                <button type="button" class="manage_btn ivu-btn ivu-btn-error" @click="onDelete(index,item.phoneNumber)"><span>删除</span></button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
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
            axios.get(`http://127.0.0.1:3000/api/user/users`,{
                })
                .then(res => {
                this.dataList = [...this.dataList, ...res.data.data];
                console.log(this.dataList);
                })
                .catch(function(error) {
                console.log(error);
            });
        },
        onDelete(index,phoneNumber){
            axios.post(`http://127.0.0.1:3000/api/user/delete`,{
                phoneNumber:phoneNumber
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
