/*
 * 酱茄小程序开源版 v1.5.0
 * Author: 酱茄
 * Help document: https://www.jiangqie.com/ky
 * github: https://github.com/zhuige-com/jiangqie_kafei
 * gitee: https://gitee.com/zhuige_com/jiangqie_kafei
 * Copyright © 2020-2021 www.jiangqie.com All rights reserved.
 */

const Util = require('../../utils/util');
const Auth = require('../../utils/auth');
const Api = require('../../utils/api.js');
const Rest = require('../../utils/rest');

Page({

    data: {
        background: Api.JIANGQIE_BG_INDEX,
        title: ''
    },

    onLoad: function (options) {
        this.setData({
            title: getApp().appName
        });
    },

    onShareAppMessage: function () {
        return {
            title: getApp().appName,
            path: 'pages/index/index',
        }
    },

    onShareTimeline: function () {
        return {
            title: getApp().appName,
        }
    },

    handlerCancelClick: function (e) {
        Util.navigateBack();
    },

    handlerLoginClick: function (e) {
        wx.getUserProfile({
            desc: '使用微信的头像昵称初始化用户',
            success: function (wxu) {
                Auth.getWXUser().then(res => {
                    return Rest.get(Api.JIANGQIE_USER_LOGIN, {
                        code: res.code,
                        nickName: wxu.userInfo.nickName,
                        avatarUrl: wxu.userInfo.avatarUrl,
                    })
                }).then(res => {
                    let user = res.data;
                    Auth.setUser(user);

                    Util.navigateBack();
                });
            },
            fail: function (err) {
                Util.toast('需要同意才能登录');
            }
        });
    }
})