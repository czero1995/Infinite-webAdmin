

<template>
    <div>
        <Row>
            <Col>
                <Card>
                    <Form :label-width="80">
                        <FormItem label="标题" :error="articleError">
                            <Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list"/>
                        </FormItem>
                        <div class="article-link-con">
                           <div class="mainContainer">
                                <input class="file-input" type="file" id="select" ref="imageref" @change="fileChange($event)"/>
                                <div>上传进度:{{uploadInfo.percent}}%</div>
                                <div>文件大小:{{uploadInfo.size}}</div>
                                <img  class="show_img" :src="imgUrl" alt="">
                           </div>
                           
                        </div>
                    </Form>
                    <div class="margin-top-20">
                        <textarea id="articleEditor" v-model="articleContent"></textarea>
                    </div>
                    <div class="publish_box" @click="handlePreview">发布</div>
                </Card>
            </Col>

        </Row>
    </div>
</template>

<script>
import tinymce from 'tinymce';
import * as qiniu from 'qiniu-js'
import path from '../../../../mixins/common.js'
export default {
    name: 'artical-publish',
    data () {
        return {
            qiuniuToken:'',
            qiniuDomain:'',
            articleTitle: '',
            articleTitleSecond:'',
            articleContent:'',
            imgUrl:'',
            uploadInfo:{
                percent:0,
                size:0
            },
            articleError: '',
            showLink: false,
            fixedLink: '',
            articlePath: '',
            articlePathHasEdited: false,
            editLink: false,
            editPathButtonType: 'ghost',
            editPathButtonText: '编辑',
            articleStateList: [{value: '草稿'}, {value: '等待复审'}],
            editOpenness: false,
            Openness: '公开',
            currentOpenness: '公开',
            topArticle: false,
            publishTime: '',
            publishTimeType: 'immediately',
            editPublishTime: false, // 是否正在编辑发布时间
            articleTagSelected: [], // 文章选中的标签
            articleTagList: [], // 所有标签列表
            classificationList: [],
            classificationSelected: [], // 在所有分类目录中选中的目录数组
            offenUsedClass: [],
            offenUsedClassSelected: [], // 常用目录选中的目录
            classificationFinalSelected: [], // 最后实际选择的目录
            publishLoading: false,
            addingNewTag: false, // 添加新标签
            newTagName: '' // 新建标签名
        };
    },
    methods: {
        handleArticletitleBlur () {
            if (this.articleTitle.length !== 0) {
                // this.articleError = '';
                localStorage.articleTitle = this.articleTitle; // 本地存储文章标题
                if (!this.articlePathHasEdited) {
                    let date = new Date();
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    this.fixedLink = window.location.host + '/' + year + '/' + month + '/' + day + '/';
                    this.articlePath = this.articleTitle;
                    this.articlePathHasEdited = true;
                    this.showLink = true;
                }
            } else {
                // this.articleError = '文章标题不可为空哦';
                this.$Message.error('文章标题不可为空哦');
            }
        },
        editArticlePath () {
            this.editLink = !this.editLink;
            this.editPathButtonType = this.editPathButtonType === 'ghost' ? 'success' : 'ghost';
            this.editPathButtonText = this.editPathButtonText === '编辑' ? '完成' : '编辑';
        },
        handleEditOpenness () {
            this.editOpenness = !this.editOpenness;
        },
        handleSaveOpenness () {
            this.Openness = this.currentOpenness;
            this.editOpenness = false;
        },
        cancelEditOpenness () {
            this.currentOpenness = this.Openness;
            this.editOpenness = false;
        },
        handleEditPublishTime () {
            this.editPublishTime = !this.editPublishTime;
        },
        handleSavePublishTime () {
            this.publishTimeType = 'timing';
            this.editPublishTime = false;
        },
        cancelEditPublishTime () {
            this.publishTimeType = 'immediately';
            this.editPublishTime = false;
        },
        setPublishTime (datetime) {
            this.publishTime = datetime;
        },
        setClassificationInAll (selectedArray) {
            this.classificationFinalSelected = selectedArray.map(item => {
                return item.title;
            });
            localStorage.classificationSelected = JSON.stringify(this.classificationFinalSelected); // 本地存储所选目录列表
        },
        setClassificationInOffen (selectedArray) {
            this.classificationFinalSelected = selectedArray;
        },
        handleAddNewTag () {
            this.addingNewTag = !this.addingNewTag;
        },
        createNewTag () {
            if (this.newTagName.length !== 0) {
                this.articleTagList.push({value: this.newTagName});
                this.addingNewTag = false;
                setTimeout(() => {
                    this.newTagName = '';
                }, 200);
            } else {
                this.$Message.error('请输入标签名');
            }
        },
        cancelCreateNewTag () {
            this.newTagName = '';
            this.addingNewTag = false;
        },
        canPublish () {
            if (this.articleTitle.length === 0) {
                this.$Message.error('请输入文章标题');
                return false;
            } else {
                return true;
            }
        },
        handlePreview () {
            console.log(this.articleTitle)
            console.log(this.articleTitleSecond)
            console.log(this.articleContent)
            
           this.$http.post(`api/hot/add`,{
                   title: this.articleTitle,
                   content: this.articleContent,
                   post: this.imgUrl
           }).then(res => {
                console.log(res)
                alert('发布成功')
            });
        },
        handleSaveDraft () {
            if (!this.canPublish()) {
                //
            }
        },
        handlePublish () {
            if (this.canPublish()) {
                this.publishLoading = true;
                setTimeout(() => {
                    this.publishLoading = false;
                    this.$Notice.success({
                        title: '保存成功',
                        desc: '文章《' + this.articleTitle + '》保存成功'
                    });
                }, 1000);
            }
        },
        handleSelectTag () {
            localStorage.tagsList = JSON.stringify(this.articleTagSelected); // 本地存储文章标签列表
        },
        getToken(){
             this.$http.post(`api/uptoken`).then(res => {
                 this.qiuniuToken = res.data.token;
                 this.qiniuDomain = res.data.domain;
                console.log(res)
            });
        },
        fileChange(){
            let file= event.target.files[0];
            console.log(file)
            let key = file.name;
            // 添加上传dom面板
            let next = (response) =>{
                console.log('next',response)
                this.uploadInfo = response.total
                let total = response.total;
                
            }
            
            let complete = (res) => {
                console.log('处理完成',res)
                var key = res.key
                var fsize = res.size
                this.imgUrl = `${this.qiniuDomain}${key}`
                
                console.log(this.imgUrl)
            }
            
            let error = (res) => {
                console.log('处理失败',res)
            }
            let config = {
                useCdnDomain: true,
                region: qiniu.region.z0
            };
            let putExtra = {
                fname: "",
                params: {},
                mimeType: null
            };
            // 调用sdk上传接口获得相应的observable，控制上传和暂停
            var observable = qiniu.upload(file, key, this.qiuniuToken, putExtra, config)
            var subscription = observable.subscribe(next,error,complete)
            }
    },
    computed: {
        completeUrl () {
            let finalUrl = this.fixedLink + this.articlePath;
            localStorage.finalUrl = finalUrl; // 本地存储完整文章路径
            return finalUrl;
        }
    },
    mounted () {
        const that = this
        this.getToken()

        tinymce.init({
            selector: '#articleEditor',
            branding: false,
            elementpath: false,
            height: 600,
            language: 'zh_CN.GB2312',
            menubar: 'edit insert view format table tools',
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                'searchreplace visualblocks visualchars code fullscreen fullpage',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons paste textcolor colorpicker textpattern imagetools codesample'
            ],
            toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
            autosave_interval: '20s',
            image_advtab: true,
            table_default_styles: {
                width: '100%',
                borderCollapse: 'collapse'
            },
            setup: function (editor) {
                editor.on('init', function (e) {
                    // vm.spinShow = false;
                    console.log('init',e)
                    if (localStorage.editorContent) {
                        tinymce.get('articleEditor').setContent(localStorage.editorContent);
                    }
                });
                editor.on('keydown', function (e) {
                    that.articleContent = tinymce.get('articleEditor').getContent()
                    // console.log('aa',that.articleContent)
                    // console.log('keydown',typeof tinymce.get('articleEditor').getContent())
                    localStorage.Content = tinymce.get('articleEditor').getContent();
                });
            }
        });

        
    },
    destroyed () {
        tinymce.get('articleEditor').destroy();
    }
};
</script>
<style lang="less" scope>
    @import '../../../../styles/common.less';
    .publish_box{
        width: 200px;
        background: #2d8cf0;
        margin-top: 20px!important;
        color:white;
        line-height: 40px;
        margin: 0 auto;
        text-align: center;
        border-radius: 4px;
    }
    .mainContainer{
        display: flex;
        align-items:center;
        justify-content: space-between;
    }
    .show_img{
        width: 120px;
        height: 80px;
    }
    .ivu-form-item{
        display: flex;
        align-items: center;
    }
    .ivu-form .ivu-form-item-label{
        padding: 0;
        text-align: left;
        font-size: 14px;
        width: 40px!important;
    }
    .ivu-form-item-content{
        margin-left: 0px!important;
        flex:1;
    }
</style>