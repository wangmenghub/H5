window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (n) {
            window.setTimeout(n, 1e3 / 60)
        }
}();
var Main = function () {
};
Main.prototype = {
    init: function () {
        return this.eventHandle(), this
    },
    loading: function () {
        $(".progress,.progress_bar").hide(), $("#loadingBtn").show(), document.getElementById("J_BgAudio").play()
    },
    audio: function () {
        var n = document.getElementById("J_BgAudio");
        n.paused ? (n.play(), $("#J_AudioBtn").removeClass("audio_btn_v")) : (n.pause(), $("#J_AudioBtn").addClass("audio_btn_v"))
    },
    eventHandle: function () {
        var n = this;
        $(window).on("touchmove", function (n) {
            n.preventDefault()
        }),
            touch.on($("#J_AudioBtn"), "touchstart", function () {
                n.audio()
            }),
            $("#loadingBtn").on("tap", function () {
                n.start()
            }),
            $("#J_Ani1").on("animationend webkitAnimationEnd", function () {
                $(this).removeClass("slideInLeft").addClass("swing_v")
            }),
            $("#J_Ani2").on("animationend webkitAnimationEnd", function () {
                $("#J_Ani2").removeClass("bg"), n.auto($("#J_Ani2 span"), "po", 18, 6, !1)
            }),
            $("#J_Ani4").on("animationend webkitAnimationEnd", function () {
                $(this).addClass("ani")
            }),
            $("#J_Ani5").on("animationend webkitAnimationEnd", function () {
                var n = $(this);
                setTimeout(function () {
                    n.removeClass("slideInRight").addClass("slideOutLeft")
                }, 1e3)
            }), $("#J_Ani6").on("animationend webkitAnimationEnd", function () {
            $(this).removeClass("animated zoomIn").addClass("ani")
        }), touch.on($("#J_Btn"), "swipeleft", function () {
            return n.curIndex >= 5 ? !1 : (-1 === navigator.userAgent.indexOf("Android") && document.getElementById("J_Eye").play(),
                    n.rotate -= 30,
                    $("#J_Btn").css({"-webkit-transform": "rotate(" + n.rotate + "deg)"}),
                    n.curIndex++,
                    $("#J_BgBox .bg_1,#J_BgBox .bg_2,#J_BgBox .bg_3").css("-webkit-transform", "translateX(-0%)"),
                    $(".salBox").hide(),
                    $("#J_Box" + n.curIndex).css("display", "block"),
                    n.reset(),
                    void(5 == n.curIndex && n.sucInfo())
            )
        }), touch.on($("#J_Btn"), "swiperight", function () {
            return n.curIndex && 0 !== n.curIndex ? (-1 === navigator.userAgent.indexOf("Android") && document.getElementById("J_Eye").play(),
                n.rotate += 30,
                $("#J_Btn").css({"-webkit-transform": "rotate(" + n.rotate + "deg)"}), n.curIndex--,
                $(".salBox").hide(),
                $("#J_BgBox .bg_1,#J_BgBox .bg_2,#J_BgBox .bg_3").css("-webkit-transform", "translateX(-0%)"),
                void $("#J_Box" + n.curIndex).css("display", "block")) : !1
        }), $("#J_SubmitInfo").on("touchstart", function () {
            n.submitInfo()
        }), $("#J_Box0 .tip").on("tap", function () {
            $(this).hide()
        }), $("#J_ShareBtn").on("tap", function () {
            $("#J_ShareTip").show()
        }), $("#J_ShareTip").on("tap", function () {
            $(this).hide()
        })
    },
    reset: function () {
        $("#J_Box0 .tip").hide(), 10 === this.curIndex ? ($("#J_Ani2").addClass("bg"), $("#J_Ani2 span").removeClass()) : 2 === this.curIndex ? $("#J_Ani1").removeClass("swing_v").addClass("slideInLeft") : 1 === this.curIndex ? $("#J_Ani0").removeClass("slideOutRight").addClass("fadeIn") : 6 === this.curIndex ? $("#J_Ani4").removeClass("ani") : 7 === this.curIndex && $("#J_Ani5").removeClass("slideOutLeft").addClass("slideInRight")
    },
    start: function () {
        var n = this;
        document.getElementById("J_BgAudio").paused && document.getElementById("J_BgAudio").play(), $("#loading .loading-img1,#loading .loading-img2,#loading .btn1,#loading .logo").removeClass("i slideInUp").addClass("animated fadeOut"), $("#loading .loading-img3,#loading .loading-img4").addClass("out"), $("#loading .loading-img4").one("animationend webkitAnimationEnd", function () {
            $("#J_Box0,#J_Btn").css("display", "block"), $("#J_Btn").removeClass("animated slideInUp").addClass("transition"), $("#loading").hide(), n.curIndex = 0, n.rotate = 0
        })
    },
    ani3: function () {
        $("#J_Txt1").typed({strings: ["在纳斯达克成功上�?"], showCursor: !1, startDelay: 600})
    },
    auto: function (n, t, i, e, o, a) {
        function s() {
            var s = arguments.callee;
            r % e === 0 && (n.removeClass(t + i + " " + t + (d - 1)).addClass(t + d), d++),
                r++,
                i >= d ? window.requestAnimFrame(s) : o ? (d = 0, window.requestAnimFrame(s)) : a && a()
        }

        var d = 1,
            r = 0;
        s()
    },
    submitInfo: function () {
        var n = $("#J_Name").val(),
            t = $("#J_Phone").val(),
            i = $("#J_Email").val();
        if (!n || !t || !i)
            return alert_v("请填写完整信�?"), !1;
        var e = this,
            o = new Loading("提交�?").show();
        $.ajax({
            url: "/polycom/travel/submitInfo?name=" + n + "&phone=" + t + "&email=" + i,
            dataType: "json",
            type: "GET",
            success: function (n) {
                n && 0 === n.status ? e.sucInfo() : alert_v("提交失败，请稍后再试")
            },
            error: function () {
                alert_v("提交失败，请稍后再试")
            },
            complete: function () {
                o.remove()
            }
        })
    },
    sucInfo: function () {
        $(".salBox").hide(),
            $("#J_Box14").css("display", "block"),
            $("#J_Btn").hide();
        var n = this;
        setTimeout(function () {
            n.auto($("#J_Ani3 span"), "po", 2, 40, !0)
        }, 600)
    }
};