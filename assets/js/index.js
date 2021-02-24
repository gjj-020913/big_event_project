$(function () {
    getUserInfo();
    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layui.layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token');
            // 2. 重新跳转到登录页面
            location.href = './login.html'
            // 关闭 confirm 询问框
            layer.close(index);
        });
    })
});


// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data);
        },
    })
}

function renderAvatar(user) {
    // 渲染欢迎文本
    const username = user.nickname || user.username
    $('#welcome').html(username)
    // 渲染文本头像和图片头像
    if (user.user_pic) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文字头像
        $('.layui-nav-img').hide();
        const firstName = username[0].toUpperCase();
        // 文字头像内容替换
        $('.text-avatar').html(firstName).show();
    }
}