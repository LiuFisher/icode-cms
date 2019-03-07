function viewSearch(id) {
    console.info(id);
    console.info('查看');
}

function viewUpdate(data) {
    var url = PathUtil.dictionaries() + '/pop/edit_dictionary?id=' + data.id;
    BootstrapModalUtil.openBaseTemplate(url);
};

function viewRemove(row) {
    POP_UP_Util.remove(function () {
            var url = PathUtil.dictionaries() + '/remove/dictionaryById';
            var params = {id: row.id};
            HttpUtil.ajaxAsynchronizationRequest(url, params, function () {
                BootstrapTableUtil.refreshBootstrapTable($("#_dictionary_table"));
                BootstrapTreeUtil.refreshRemoveTreeview($('#_dictJson'), row);
            });
        }
    );
};

var DictionaryTableUtil = {

    /**
     * Title: 获取字典树结构树<br>
     * Description: <br>
     * Author: XiaChong<br>
     * Mail: summerpunch@163.com<br>
     * Date: 2019/3/1 11:33<br>
     */
    getDictionaryTree: function () {
        $.ajax({
            type: 'POST',
            url: PathUtil.dictionaries() + '/ajax/dictionary/tree',
            async: false,
            dataType: 'json',
            success: function (data) {
                BootstrapTreeUtil.showTreeview('#_dictJson', data.data);
            }
        });
    },

    /**
     * Title: 查询数据字典列表<br>
     * Description: <br>
     * Author: XiaChong<br>
     * Mail: summerpunch@163.com<br>
     * Date: 2019/3/1 11:31<br>
     */
    getdictChildList: function (params) {
        BootstrapTableUtil.getDataTable({
            id: '#_dictionary_table',
            url: PathUtil.dictionaries() + '/get/dictionaryList',
            params: params,
            array: [{
                checkbox: true
            }, {
                field: 'id',
                title: 'id'
            }, {
                field: 'itemNamecn',
                title: '中文名称'
            }, {

                field: 'itemKey',
                title: '键名称'
            }, {

                field: 'status',
                title: '状态'
            }, {
                field: 'id',
                title: '删除',
                width: 100,
                align: 'center',
                valign: 'middle',
                formatter: BootstrapTableUtil.actionFormatter
            }
            ]
        });
    },

    /**
     * Title: 按条件查询<br>
     * Description: <br>
     * Author: XiaChong<br>
     * Mail: summerpunch@163.com<br>
     * Date: 2019/3/1 11:34<br>
     */
    dictSearch: function () {
        DictionaryTableUtil.getdictChildList(JsonUtil.serializeObject($("#_dictFormSearch")));
    }
};


$(function () {
    DictionaryTableUtil.getDictionaryTree();

    DictionaryTableUtil.getdictChildList({id: 1});

    /**
     * Title: 点击字典树节点<br>
     * Description: 按当前节点查询所属字典<br>
     * Author: XiaChong<br>
     * Mail: summerpunch@163.com<br>
     * Date: 2019/3/1 11:56<br>
     */
    $('#_dictJson').on('nodeSelected', function (event, data) {
        DictionaryTableUtil.getdictChildList({id: data.id});
    });


    /**
     * Title: 新增数据字典页面<br>
     * Description: <br>
     * Author: XiaChong<br>
     * Date: 2019/3/5 14:18<br>
     */
    $("#_addDictionary").on("click", function () {
        var jsonData = BootstrapTableUtil.getPitchOnTableData($('#_dictionary_table'));
        console.info(jsonData);
        if (JsonUtil.isEmptyObject(jsonData)) {
            var url = PathUtil.dictionaries() + '/pop/add_dictionary?parentId=' + jsonData.id;
            BootstrapModalUtil.openBaseTemplate(url);
        } else {
            parent.layer.msg('请选择一项作为父节点 . ', {icon: 6});
        }
    });

    BootstrapModalUtil.removeData();
});

