// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

$('#chooseImg').on('click', function () {
    $('#file').click();
})

$('#file').on('change', function (e) {
    const fileList = this.files;
    console.log(fileList);
    console.log(e.target);
    console.log(this);
    console.log(e.target === this);
    if (fileList.length === 0) {
        return layer.msg('请选择文件！')
    }
    const file = fileList[0];
    // 转换为url地址
    const imgUrl = URL.createObjectURL(file);
    // 调用插件方法提取图片
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', imgUrl)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
});

$('#upload').on('click', function (e) {
    var dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        .toDataURL('image/png');

    $.ajax({
        type: "POST",
        url: "/my/update/avatar",
        data: {
            avatar: dataURL
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更换头像失败！')
            }
            window.parent.getUserInfo()
        }
    })
})