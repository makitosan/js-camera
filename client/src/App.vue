<template lang="html">
    <div id="app">
        <h1>JS-Camera</h1>
        <div>
          <video id="video" autoplay></video>
        </div>
        <div>
          <button id="capture" @click="captureShot">CAPTURE</button>
        </div>
        <canvas id="picture"></canvas>
        <p>{{msg}}</p>
    </div>
</template>

<script>
    var constraints = {
        video: {
        },
    }
    export default {
        name: 'app',
        created: function() {
          console.log('created');
          //デバイス情報ゲット
          var item = navigator.mediaDevices.getUserMedia(constraints);
          //ストリーム情報をビデオタグのsrcに設置
          item.then( function(stream) {
             var video = document.querySelector('video');
             video.src = window.URL.createObjectURL(stream);
             video.onloadedmetadata = function(e) {
                  //ロード完了後にカメラの設定
             };
          });

        },
        data: function() {
            return {
                msg: 'this is a message.'
            }
        },
        methods: {
          captureShot: function() {
            var videocnt = document.getElementById('video');
            var canvas = document.getElementById('picture');
            console.log(videocnt.width);
            canvas.width = 640;
            canvas.height = 480;
            var cnt2d = canvas.getContext('2d');
            //canvasに書き込み
            cnt2d.drawImage(videocnt, 0, 0);
            this.msg = 'new image captured..' + (new Date());
          }
        }
    }
</script>

<style lang="css">
    html,
    body {
        height: 100%;
    }
</style>
