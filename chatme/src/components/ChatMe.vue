<template>
  <div class="hello">
      <!-- <h1>Chat me</h1> -->
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" >
    <a-form-item label="对话历史">
      <a-list bordered :dataSource="form.cache"  id="chathistory">
      <a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
      </a-list>
    </a-form-item>
    <a-form-item label="请输入聊天内容">
      <a-input v-model="form.msg" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit" @click.native="handleSubmit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
  </div>
</template>

<script>
export default {
  data() {
      return {
            path:"ws://localhost:8888/chat",
            socket:"",
            form: {
              msg: '',
              cache: [],
            }
      };
    },
    mounted(){
      this.init();
    },

    methods: {
      handleSubmit() {
        var msg = {
          'chat': this.form.msg
        }
        this.socket.send(JSON.stringify(msg));
        this.form.msg = ""
      },
      init: function() {
        if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                this.socket = new WebSocket(this.path)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
            }
      },
       open: function () {
            console.log("socket连接成功");
            // var msg = JSON.stringify(text);  // 对象转json字符串
          
        },
        error: function () {
            console.log("连接错误")
        },
        getMessage: function (msg) {
            // console.log(msg.data)
            var text_json = JSON.parse(msg.data);  // 字符串转json对象
            if (text_json.hasOwnProperty("cache")){
              // console.log("cache")
              var cache_list = text_json.cache;
              // console.log(typeof(cache_list));
              this.form.cache = [];
              for (let index = 0; index < cache_list.length; index++) {
                const element = cache_list[index].chat;
                this.form.cache.push(element);
              }
            } else{
              this.form.cache.push(text_json.chat);
            } 
        },
        send: function () {
            this.socket.send(params)
        },
        close: function () {
            console.log("socket已经关闭")
        }
    },

    destroyed(){
      this.socket.onclose = this.close;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
#chathistory{
  background-color:rgba(255, 255, 255)
}
</style>
