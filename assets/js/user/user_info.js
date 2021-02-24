$(function () {
    const { form, layer } = layui
    form.verify({
        nickname: function (value) {
            if (value.length > 10) {
                return '昵称长度必须在 1 ~ 10 个字符之间！'
            }
        }
    })
    initUserInfo();
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log(res);
                form.val('userInfo', res.data)
            }
        })
    }
    // 重置表单的数据
    $('.btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo();
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/my/userinfo',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                // 判断响应结果
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})