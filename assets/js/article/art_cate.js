$(function () {
    initCateInfo();

    function initCateInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                const htmlStr = template('tpl-table', res);
                // console.log(htmlStr);
                $('tbody').html(htmlStr)
            }
        })
    }
    let addIndex = null
    // 为添加类别按钮绑定点击事件
    $('#btnAddCate').on('click', function () {
        addIndex = layer.open({
            type: 1,//弹出层类型
            area: ['500px', '250px'],//弹出层的宽高设置
            title: '添加文章分类',//弹出层标题
            content: $('#dialog-add').html()//弹出层里面的内容
        })
    })

    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('新增分类成功！')
                initCateInfo()
                // 根据索引，关闭对应的弹出层
                layer.close(addIndex)
            }
        })
    })
    const form = layui.form
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id'); 7
        // console.log(this);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initCateInfo()
            }
        })
    })

    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initCateInfo()
                }
            })
        })
    })
})