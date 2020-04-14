(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "VoiceTemplate",
  data: function data() {
    return {
      activate: false,
      duration: 0,
      currentTime: '0:00',
      progress: 0,
      draggableClasses: ['pin'],
      currentlyDragged: null
    };
  },
  methods: {
    play: function play() {
      this.activate = !this.activate;
      if (this.activate) this.$refs.audio.play();else this.$refs.audio.pause();
    },

    /**
     * Возвращает длину текущего аудио/видео (в секундах)
     */
    formatTime: function formatTime(time) {
      var min = Math.floor(time / 60);
      var sec = Math.floor(time % 60);
      return min + ':' + (sec < 10 ? '0' + sec : sec);
    },

    /**
     * Устанавливает или возвращает текущую позицию воспроизведения в аудио/видео (в секундах)
     */
    updateProgress: function updateProgress() {
      var current = this.$refs.audio.currentTime;
      var percent = current / this.$refs.audio.duration * 100;
      this.progress = percent;
      this.currentTime = this.formatTime(current);
    },

    /**
     * get range box
     */
    getRangeBox: function getRangeBox(event) {
      var rangeBox = event.target;
      var el = this.currentlyDragged;

      if (event.type === 'click' && this.isDraggable(event.target)) {
        rangeBox = event.target.parentElement.parentElement;
      }

      if (event.type === 'mousemove') {
        rangeBox = el.parentElement.parentElement;
      }

      return rangeBox;
    },

    /**
     * get Coefficient
     */
    getCoefficient: function getCoefficient(event) {
      var slider = this.getRangeBox(event);
      var rect = slider.getBoundingClientRect();
      var K = 0;

      if (slider.dataset.direction === 'horizontal') {
        var offsetX = event.clientX - slider.offsetLeft;
        var width = slider.clientWidth;
        K = offsetX / width;
      } else if (slider.dataset.direction === 'vertical') {
        var height = slider.clientHeight;
        var offsetY = event.clientY - rect.top;
        K = 1 - offsetY / height;
      }

      return K;
    },

    /**
     * перемотка
     */
    rewind: function rewind(event) {
      if (this.inRange(event)) {
        this.$refs.audio.currentTime = this.$refs.audio.duration * this.getCoefficient(event);
      }
    },

    /**
     * is Draggable
     */
    inRange: function inRange(event) {
      var rangeBox = this.getRangeBox(event);
      var rect = rangeBox.getBoundingClientRect();
      var direction = rangeBox.dataset.direction;

      if (direction === 'horizontal') {
        var min = rangeBox.offsetLeft;
        var max = min + rangeBox.offsetWidth;
        if (event.clientX < min || event.clientX > max) return false;
      } else {
        var _min = rect.top;

        var _max = _min + rangeBox.offsetHeight;

        if (event.clientY < _min || event.clientY > _max) return false;
      }

      return true;
    },

    /**
     * is Draggable
     */
    isDraggable: function isDraggable(el) {
      var canDrag = false;
      var classes = Array.from(el.classList);
      this.draggableClasses.forEach(function (draggable) {
        if (classes.indexOf(draggable) !== -1) canDrag = true;
      });
      return canDrag;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$refs.audio.addEventListener('loadedmetadata', function () {
      _this.duration = _this.formatTime(_this.$refs.audio.duration);
    });
    this.$refs.audio.addEventListener('timeupdate', this.updateProgress);
    this.$refs.audio.addEventListener('ended', function () {
      this.activate = !this.activate;
      this.progress = 0;
      this.currentTime = 0;
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Record/Recorder.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Record/Recorder.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Recorder",
  data: function data() {
    return {
      audio: new Audio(),
      audioContext: window.AudioContext || webKit.AudioContext,
      audioCtx: new AudioContext(),
      audioConstraints: {
        audio: true,
        video: false
      },
      chunks: [],
      isRecording: false,
      audioRecorder: null,
      recordingData: [],
      dataUrl: ''
    };
  },
  mounted: function mounted() {},
  methods: {
    recordStart: function recordStart() {
      var _this = this;

      var self = this;
      this.isRecording = !this.isRecording;

      if (this.isRecording) {
        navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;
        navigator.mediaDevices.getUserMedia(this.audioConstraints).then(function (stream) {
          _this.stream = stream;
          _this.audioRecorder = new MediaRecorder(stream);

          _this.audioRecorder.start();

          console.log('Media recorder started');
        }, function (error) {
          alert(JSON.stringify(error));
        });
      }
    },
    recordStop: function recordStop() {
      var self = this;
      this.audioRecorder.stop();

      this.audioRecorder.ondataavailable = function (event) {
        self.chunks.push(event.data);
      };

      this.audioRecorder.onstop = function (event) {
        var blob = new Blob(self.chunks, {
          'type': 'audio/ogg; codecs=opus'
        });
        self.chunks = [];
        var audioURL = window.URL.createObjectURL(blob);
        self.audio.src = audioURL;
      };
    },
    togglePlay: function togglePlay() {
      this.audio.play();
    },
    submitRecording: function submitRecording() {
      var that = this;
      var blob = new Blob(that.recordingData, {
        type: 'audio/ogg'
      });
      var formData = new FormData();
      formData.append('recording', blob);
      axios.post('api/recordings', formData);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Overview/Overview.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Overview/Overview.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Messenger_V1_Message_Template_VoiceTemplate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/Messenger/V1/Message/Template/VoiceTemplate */ "./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue");
/* harmony import */ var _components_Record_Recorder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Record/Recorder */ "./resources/js/components/Record/Recorder.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Overview',
  components: {
    VoiceMessage: _components_Messenger_V1_Message_Template_VoiceTemplate__WEBPACK_IMPORTED_MODULE_0__["default"],
    RecordAudio: _components_Record_Recorder__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=style&index=0&id=25e2b108&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=style&index=0&id=25e2b108&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\nli[data-v-25e2b108] {\n    padding: 0 25px;\n    margin: 10px 0 15px 0px;\n    list-style-type: none;\n    text-align: left;\n}\n.user-message[data-v-25e2b108] {\n    text-align: left;\n}\n.my-message[data-v-25e2b108] {\n    text-align: right;\n}\nli.my-message .content[data-v-25e2b108] {\n    background: rgb(1, 167, 177);\n    color: white\n}\n.my-message > .message-wrapper > .content .message-text[data-v-25e2b108] {\n    text-align: left;\n    color: #fff;\n}\n.message-wrapper[data-v-25e2b108] {\n    display: inline-block;\n    min-width: 40%;\n}\n\n/* < header > */\n.message-wrapper > .header[data-v-25e2b108] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline;\n}\n.message-wrapper > .header .userInfo[data-v-25e2b108] {\n    position: relative;\n}\n.message-wrapper > .header .user-image[data-v-25e2b108] {\n    display: inline-block;\n    position: absolute;\n    z-index: 1;\n    left: -21px;\n    top: -4px;\n}\n.message-wrapper > .header .user-name[data-v-25e2b108] {\n    display: inline-block;\n    margin-left: 25px;\n    color: white;\n}\n.message-wrapper > .header .user-image i[data-v-25e2b108] {\n    border: 0px solid white;\n    border-radius: 50%;\n    background: white;\n    color: black;\n}\n.message-wrapper > .header .messageSendDate[data-v-25e2b108] {\n    color: #fff;\n    font-size: 11px;\n}\n\n/* < content > */\n.message-wrapper > .content[data-v-25e2b108] {\n    background: white;\n    border-radius: 3px;\n    display: inline-block;\n    position: relative;\n    width: 100%;\n}\n.message-wrapper > .content .message-text[data-v-25e2b108]{\n    color: #041720;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Overview/Overview.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Overview/Overview.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n#video {\n    background-color: #000000;\n}\n#canvas {\n    display: none;\n}\nli {\n    display: inline;\n    padding: 5px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=template&id=25e2b108&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=template&id=25e2b108&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("li", { staticClass: "item-message voice-message" }, [
    _c("div", { staticClass: "message-wrapper" }, [
      _c("div", { staticClass: "header" }, [
        _c("div", { staticClass: "userInfo" }, [
          _c(
            "span",
            { staticClass: "user-image" },
            [
              _c("v-icon", { attrs: { large: "" } }, [_vm._v("account_circle")])
            ],
            1
          ),
          _vm._v(" "),
          _c("span", { staticClass: "user-name" }, [_vm._v("Salman")])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "messageSendDate ml-3" }, [
          _vm._v("\n                12.02.19 10:50\n            ")
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "content" }, [
        _c("div", { staticClass: "message-text" }, [
          _c("div", { staticClass: "holder" }, [
            _c("div", { staticClass: "audio green-audio-player" }, [
              _c(
                "div",
                { staticClass: "play-pause-btn", on: { click: _vm.play } },
                [
                  !_vm.activate
                    ? _c("v-icon", [_vm._v("play_arrow")])
                    : _c("v-icon", [_vm._v("pause")])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "controls" },
                [
                  _c("span", { staticClass: "current-time" }, [
                    _vm._v(_vm._s(_vm.currentTime))
                  ]),
                  _vm._v(" "),
                  _c("v-slider", {
                    staticClass: "m-0 p-0",
                    attrs: { "track-color": "#D8D8D8", color: "#44BFA3" },
                    model: {
                      value: _vm.progress,
                      callback: function($$v) {
                        _vm.progress = $$v
                      },
                      expression: "progress"
                    }
                  }),
                  _vm._v(" "),
                  _c("span", { staticClass: "total-time" }, [
                    _vm._v(_vm._s(_vm.duration))
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c("audio", { ref: "audio", attrs: { crossorigin: "" } }, [
                _c("source", {
                  attrs: {
                    src:
                      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/Swing_Jazz_Drum.mp3",
                    type: "audio/mpeg"
                  }
                })
              ])
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Record/Recorder.vue?vue&type=template&id=71698b41&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Record/Recorder.vue?vue&type=template&id=71698b41&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "content" },
    [
      _c(
        "v-btn",
        {
          staticClass: "red",
          attrs: { id: "start" },
          on: {
            click: function($event) {
              $event.stopPropagation()
              $event.preventDefault()
              return _vm.recordStart($event)
            }
          }
        },
        [
          _c("v-icon", [_vm._v("mic")]),
          _vm._v("\n        Start recording\n    ")
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-btn",
        {
          staticClass: "red",
          attrs: { id: "stop" },
          on: {
            click: function($event) {
              $event.stopPropagation()
              $event.preventDefault()
              return _vm.recordStop($event)
            }
          }
        },
        [
          _c("v-icon", [_vm._v("pause")]),
          _vm._v("\n        Stop recording\n    ")
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-btn",
        {
          staticClass: "green",
          attrs: { id: "play" },
          on: {
            click: function($event) {
              $event.stopPropagation()
              $event.preventDefault()
              return _vm.togglePlay($event)
            }
          }
        },
        [
          _c("v-icon", [_vm._v("play_arrow")]),
          _vm._v("\n        Play recording\n    ")
        ],
        1
      ),
      _vm._v(" "),
      _vm.chunks.length
        ? _c(
            "v-btn",
            {
              staticClass: "blue",
              attrs: { id: "delete" },
              on: {
                click: function($event) {
                  $event.stopPropagation()
                  $event.preventDefault()
                  return _vm.removeRecording($event)
                }
              }
            },
            [
              _c("v-icon", [_vm._v("delete_outline")]),
              _vm._v("\n        Delete recording\n    ")
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "v-btn",
        {
          staticClass: "green",
          attrs: { id: "send" },
          on: { click: _vm.submitRecording }
        },
        [
          _c("v-icon", [_vm._v("send")]),
          _vm._v("\n        Send recording\n    ")
        ],
        1
      ),
      _vm._v(" "),
      _c("audio", {
        attrs: { id: "audio", preload: "auto", controls: "" },
        model: {
          value: _vm.chunks,
          callback: function($$v) {
            _vm.chunks = $$v
          },
          expression: "chunks"
        }
      }),
      _vm._v(" "),
      _c("input", {
        attrs: { type: "file", accept: "audio/*;capture=microphone" }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Overview/Overview.vue?vue&type=template&id=9a2f7094&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Overview/Overview.vue?vue&type=template&id=9a2f7094& ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    {
      staticClass: "h-100 p-3",
      attrs: { fluid: "", "grid-list-md": "", "text-xs-center": "" }
    },
    [
      _c(
        "v-layout",
        { staticClass: "h-100 m-0", attrs: { row: "", wrap: "" } },
        [
          _c("v-flex", { attrs: { xs4: "" } }, [_c("voice-message")], 1),
          _vm._v(" "),
          _c("v-flex", { attrs: { xs4: "" } }, [_c("record-audio")], 1)
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=style&index=0&id=25e2b108&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=style&index=0&id=25e2b108&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader??ref--6-1!../../../../../../../node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VoiceTemplate.vue?vue&type=style&index=0&id=25e2b108&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=style&index=0&id=25e2b108&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Overview/Overview.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Overview/Overview.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Overview.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Overview/Overview.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VoiceTemplate_vue_vue_type_template_id_25e2b108_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VoiceTemplate.vue?vue&type=template&id=25e2b108&scoped=true& */ "./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=template&id=25e2b108&scoped=true&");
/* harmony import */ var _VoiceTemplate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VoiceTemplate.vue?vue&type=script&lang=js& */ "./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _VoiceTemplate_vue_vue_type_style_index_0_id_25e2b108_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VoiceTemplate.vue?vue&type=style&index=0&id=25e2b108&scoped=true&lang=css& */ "./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=style&index=0&id=25e2b108&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _VoiceTemplate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VoiceTemplate_vue_vue_type_template_id_25e2b108_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VoiceTemplate_vue_vue_type_template_id_25e2b108_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "25e2b108",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VoiceTemplate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VoiceTemplate.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VoiceTemplate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=style&index=0&id=25e2b108&scoped=true&lang=css&":
/*!******************************************************************************************************************************************!*\
  !*** ./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=style&index=0&id=25e2b108&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VoiceTemplate_vue_vue_type_style_index_0_id_25e2b108_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader!../../../../../../../node_modules/css-loader??ref--6-1!../../../../../../../node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VoiceTemplate.vue?vue&type=style&index=0&id=25e2b108&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=style&index=0&id=25e2b108&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VoiceTemplate_vue_vue_type_style_index_0_id_25e2b108_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VoiceTemplate_vue_vue_type_style_index_0_id_25e2b108_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VoiceTemplate_vue_vue_type_style_index_0_id_25e2b108_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VoiceTemplate_vue_vue_type_style_index_0_id_25e2b108_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VoiceTemplate_vue_vue_type_style_index_0_id_25e2b108_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=template&id=25e2b108&scoped=true&":
/*!****************************************************************************************************************************!*\
  !*** ./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=template&id=25e2b108&scoped=true& ***!
  \****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VoiceTemplate_vue_vue_type_template_id_25e2b108_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VoiceTemplate.vue?vue&type=template&id=25e2b108&scoped=true& */ "./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Messenger/V1/Message/Template/VoiceTemplate.vue?vue&type=template&id=25e2b108&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VoiceTemplate_vue_vue_type_template_id_25e2b108_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VoiceTemplate_vue_vue_type_template_id_25e2b108_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Record/Recorder.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/Record/Recorder.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Recorder_vue_vue_type_template_id_71698b41_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Recorder.vue?vue&type=template&id=71698b41&scoped=true& */ "./resources/js/components/Record/Recorder.vue?vue&type=template&id=71698b41&scoped=true&");
/* harmony import */ var _Recorder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Recorder.vue?vue&type=script&lang=js& */ "./resources/js/components/Record/Recorder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Recorder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Recorder_vue_vue_type_template_id_71698b41_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Recorder_vue_vue_type_template_id_71698b41_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "71698b41",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Record/Recorder.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Record/Recorder.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/Record/Recorder.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Recorder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Recorder.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Record/Recorder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Recorder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Record/Recorder.vue?vue&type=template&id=71698b41&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/Record/Recorder.vue?vue&type=template&id=71698b41&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Recorder_vue_vue_type_template_id_71698b41_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Recorder.vue?vue&type=template&id=71698b41&scoped=true& */ "./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Record/Recorder.vue?vue&type=template&id=71698b41&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Recorder_vue_vue_type_template_id_71698b41_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Recorder_vue_vue_type_template_id_71698b41_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/Overview/Overview.vue":
/*!**************************************************!*\
  !*** ./resources/js/pages/Overview/Overview.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Overview_vue_vue_type_template_id_9a2f7094___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Overview.vue?vue&type=template&id=9a2f7094& */ "./resources/js/pages/Overview/Overview.vue?vue&type=template&id=9a2f7094&");
/* harmony import */ var _Overview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Overview.vue?vue&type=script&lang=js& */ "./resources/js/pages/Overview/Overview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Overview_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Overview.vue?vue&type=style&index=0&lang=css& */ "./resources/js/pages/Overview/Overview.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Overview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Overview_vue_vue_type_template_id_9a2f7094___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Overview_vue_vue_type_template_id_9a2f7094___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Overview/Overview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Overview/Overview.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/pages/Overview/Overview.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Overview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Overview/Overview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Overview/Overview.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************************************!*\
  !*** ./resources/js/pages/Overview/Overview.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Overview.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Overview/Overview.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/pages/Overview/Overview.vue?vue&type=template&id=9a2f7094&":
/*!*********************************************************************************!*\
  !*** ./resources/js/pages/Overview/Overview.vue?vue&type=template&id=9a2f7094& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_template_id_9a2f7094___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Overview.vue?vue&type=template&id=9a2f7094& */ "./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Overview/Overview.vue?vue&type=template&id=9a2f7094&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_template_id_9a2f7094___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_template_id_9a2f7094___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);