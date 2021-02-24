// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (option) {
    // console.log(option);
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    option.url = ' http://ajax.frontend.itheima.net' + option.url

    // 统一为有权限的接口，设置 headers 请求头
    if (option.url.includes('/my') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }

    option.complete = function (res) {
        console.log(res);
        const { message, status } = res.responseJSON;
        if (message === "身份认证失败！" && status === 1) {
            // 1. 强制清空 token
            localStorage.removeItem('token');
            // 2. 强制跳转到登录页面
            location.href = './login.html'
        }
    }

})