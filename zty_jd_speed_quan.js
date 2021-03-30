// cron 0 10,12,14,16,18,20,22 * * * zty_jd_speed_quan.js
var request = require('request');
const $ = new Env('极速版领券');

const notify = require('./sendNotify');
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = require('./jdCookie.js');
let jdNotify = true; //是否关闭通知，false打开通知推送，true关闭通知推送
let cookiesArr = [],
  cookie = '',
  message, helpInfo, ADD_CART = false;
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}


cookiesArr.forEach((cookie, index) => {
  g(cookie, index)
})

function g(cookie, index) {
  var options = {
    'method': 'POST',
    'url': 'https://api.m.jd.com/client.action?functionId=lite_newBabelAwardCollection',
    'headers': {
      'Host': 'api.m.jd.com',
      'Cookie': `__jd_ref_cls=Babel_AgilityExpo; mba_muid=1605779904461533860699.73.1617066793360; mba_sid=73.17; shshshfpb=fahBG22KKH57Gr1ENwMQY1A%3D%3D; 3AB9D23F7A4B3C9B=6PJNI7RWSXZFFGUCORD3EW7J7VLYPXAXQN7HPAXZSUHEIZMAQK55N4RC4HAAR3ZNZAAPTJPYWFFL5QJ5Z7GTMPG6YU; shshshfp=dc800b5fc7e1d1eaa8fe2ba7c367e04c; shshshfpa=9984d840-f1d3-e9ee-ed54-af547d9229a9-1605779905; shshshsID=359601bc1ff86449eb4b73aaef4aac91_2_1617066790701; __jda=122270672.1605779904461533860699.1605779904.1616939188.1617066637.83; __jdb=122270672.2.1605779904461533860699|83.1617066637; __jdc=122270672; pre_seq=0; pre_session=f763dceff5cf31896add3e06f1c745fbb34189c0|146; ${cookie} pwdt_id=jd_5d9b320a601be; sid=5236d99e6d149a65aeed0557f078437w; __jdv=122270672%7Cdirect%7C-%7Cnone%7C-%7C1617066637880; PPRD_P=LOGID.1616939189522.776213492; visitkey=70253261906795197`,
      'accept': '*/*',
      'content-type': 'application/x-www-form-urlencoded',
      'origin': 'https://pro.m.jd.com',
      'accept-language': 'zh-cn',
      'user-agent': 'jdltapp;iPhone;3.3.0;14.4.2;f763dceff5cf31896add3e06f1c745fbb34189c0;network/wifi;ADID/9FAED639-BEA4-4E87-B414-9B50A40F3103;hasUPPay/0;pushNoticeIsOpen/0;lang/zh_CN;model/iPhone10,3;addressid/811092644;hasOCPay/0;appBuild/1036;supportBestPay/0;pv/73.16;apprpd/;ref/https%3A%2F%2Fpro.m.jd.com%2Fjdlite%2Factive%2FUq1k3RXYmRTSk4f9cSJi35DyLCT%2Findex.html%3F__in_task_view__%3DjdLiteiOS%26lng%3D0.000000%26lat%3D0.000000%26sid%3D5236d99e6d149a65aeed0557f078437w%26un_area%3D13_1000_40492_59717;psq/0;ads/;psn/f763dceff5cf31896add3e06f1c745fbb34189c0|146;jdv/0|;adk/;app_device/IOS;pap/JA2020_3112531|3.3.0|IOS 14.4.2;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
      'referer': 'https://pro.m.jd.com/jdlite/active/Uq1k3RXYmRTSk4f9cSJi35DyLCT/index.html?__in_task_view__=jdLiteiOS&lng=0.000000&lat=0.000000&sid=5236d99e6d149a65aeed0557f078437w&un_area=13_1000_40492_59717'
    },
    body: 'body=%7B%22activityId%22%3A%22Uq1k3RXYmRTSk4f9cSJi35DyLCT%22%2C%22scene%22%3A%221%22%2C%22args%22%3A%22key%3D86DCB0AB6C67D1E6C920407995D58A36F5D86B4385B9BB61FA4AB709AD404FDD9E3D0E7372B89221DCA18D0F540E016F_babel%2CroleId%3DDE22D0306DB1DD56EF5C6A78CF0F1456_babel%2CstrengthenKey%3D26B714C2E2DD736FED2768351DA96C0B982C190B0BD5162C00454E6863F5C82BCA96F0BA177EEFDA2B4AEC8A704254B7_babel%22%2C%22platform%22%3A%223%22%2C%22orgType%22%3A%222%22%2C%22openId%22%3A%22-1%22%2C%22pageClickKey%22%3A%22-1%22%2C%22eid%22%3A%226PJNI7RWSXZFFGUCORD3EW7J7VLYPXAXQN7HPAXZSUHEIZMAQK55N4RC4HAAR3ZNZAAPTJPYWFFL5QJ5Z7GTMPG6YU%22%2C%22fp%22%3A%2291e725f50c3c9d281af3eec64004136e%22%2C%22shshshfp%22%3A%22dc800b5fc7e1d1eaa8fe2ba7c367e04c%22%2C%22shshshfpa%22%3A%229984d840-f1d3-e9ee-ed54-af547d9229a9-1605779905%22%2C%22shshshfpb%22%3A%22fahBG22KKH57Gr1ENwMQY1A%3D%3D%22%2C%22childActivityUrl%22%3A%22https%253A%252F%252Fpro.m.jd.com%252Fjdlite%252Factive%252FUq1k3RXYmRTSk4f9cSJi35DyLCT%252Findex.html%253F__in_task_view__%253DjdLiteiOS%2526lng%253D0.000000%2526lat%253D0.000000%2526sid%253D5236d99e6d149a65aeed0557f078437w%2526un_area%253D13_1000_40492_59717%22%2C%22userArea%22%3A%22-1%22%2C%22client%22%3A%22-1%22%2C%22clientVersion%22%3A%22-1%22%2C%22uuid%22%3A%22-1%22%2C%22osVersion%22%3A%22-1%22%2C%22brand%22%3A%22-1%22%2C%22model%22%3A%22-1%22%2C%22networkType%22%3A%22-1%22%2C%22jda%22%3A%22122270672.1605779904461533860699.1605779904.1616939188.1617066637.83%22%2C%22sdkToken%22%3A%22%22%2C%22token%22%3A%22LKTB576F5ZL7MQJT6BXT2FHVHFA424U7YXHBKPMYBGTGOVVGYSNOAYX3PC6M25YSC23AICJCKWMAI%22%2C%22jstub%22%3A%22KFCAFWKMFWW6CV6RNDTVJAHHPJDUI2CYWLLLHXWYVR7JW3JYJDDORL6M6GIFW3IMYQPLRCFZIZIFXXEX2P2MOGSP6RABDG3QO2WGA4Y%22%2C%22pageClick%22%3A%22Babel_Coupon%22%2C%22la%22%3A%22605715ec560d6508f7403b91b677d79c%22%2C%22lb%22%3A%22605715ec560d6508f7403b91b677d79c%22%2C%22mitemAddrId%22%3A%22%22%2C%22geo%22%3A%7B%22lng%22%3A%220.000000%22%2C%22lat%22%3A%220.000000%22%7D%2C%22addressId%22%3A%22811092644%22%2C%22posLng%22%3A%22%22%2C%22posLat%22%3A%22%22%2C%22homeLng%22%3A%22%22%2C%22homeLat%22%3A%22%22%2C%22focus%22%3A%22%22%2C%22innerAnchor%22%3A%22%22%2C%22cv%22%3A%222.0%22%7D&screen=750*1334&client=wh5&clientVersion=1.0.0&sid=5236d99e6d149a65aeed0557f078437w&uuid=1605779904461533860699.73.1617066793360&area=13_1000_40492_59717'

  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    await notify.sendNotify(`账号${index}结果为${response.body
      }`);

  });
}

// prettier-ignore
function Env(t, e) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class s {
    constructor(t) {
      this.env = t
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      return "POST" === e && (s = this.post), new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s)
        })
      })
    }
    get(t) {
      return this.send.call(this.env, t)
    }
    post(t) {
      return this.send.call(this.env, t, "POST")
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports
    }
    isQuanX() {
      return "undefined" != typeof $task
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon
    }
    isLoon() {
      return "undefined" != typeof $loon
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t)
      } catch {
        return e
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t)
      } catch {
        return e
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) try {
        s = JSON.parse(this.getdata(t))
      } catch {}
      return s
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e)
      } catch {
        return !1
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i))
      })
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"), n = {
          url: `http://${h}/v1/scripting/evaluate`,
          body: {
            script_text: t,
            mock_type: "cron",
            timeout: r
          },
          headers: {
            "X-Key": o,
            Accept: "*/*"
          }
        };
        this.post(n, (t, e, i) => s(i))
      }).catch(t => this.logErr(t))
    }
    loaddata() {
      if (!this.isNode()) return {}; {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) return {}; {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i))
          } catch (t) {
            return {}
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i)
        if (r = Object(r)[t], void 0 === r) return s;
      return r
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
        if (r) try {
          const t = JSON.parse(r);
          e = t ? this.lodash_get(t, i, "") : e
        } catch (t) {
          e = ""
        }
      }
      return e
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
        }
      } else s = this.setval(t, e);
      return s
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
    }
    get(t, e = (() => {})) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
          }
        } catch (t) {
          this.logErr(t)
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body)
      }))
    }
    post(t, e = (() => {})) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      });
      else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => e(t));
      else if (this.isNode()) {
        this.initGotEnv(t);
        const {
          url: s,
          ...i
        } = t;
        this.got.post(s, i).then(t => {
          const {
            statusCode: s,
            statusCode: i,
            headers: r,
            body: o
          } = t;
          e(null, {
            status: s,
            statusCode: i,
            headers: r,
            body: o
          }, o)
        }, t => {
          const {
            message: s,
            response: i
          } = t;
          e(s, i, i && i.body)
        })
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date;
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) return t;
        if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
          "open-url": t
        } : this.isSurge() ? {
          url: t
        } : void 0;
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            }
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            }
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            }
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t))
    }
    done(t = {}) {
      const e = (new Date).getTime(),
        s = (e - this.startTime) / 1e3;
      this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
    }
  }(t, e)
}