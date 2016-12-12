﻿var _taskService = abp.services.app.task;

(function($) {

    $(function() {

        var $taskStateCombobox = $('#TaskStateCombobox');

        $taskStateCombobox.change(function() {
            getTaskList();
        });


        var $modal = $("#add");
        //显示modal时，光标显示在第一个输入框
        $modal.on('shown.bs.modal',
            function() {
                $modal.find('input:not([type=hidden]):first').focus();
            });

    });
})(jQuery);

function beginPost(modalId) {
    var $modal = $(modalId);

    abp.ui.setBusy($modal);
}

function hideForm(modalId) {
    var $modal = $(modalId);

    var $form = $modal.find("form");
    abp.ui.clearBusy($modal);
    $modal.modal("hide");
    //创建成功后，要清空form表单
    $form[0].reset();
}

function editTask(id) {
    abp.ajax({
            url: "/tasks/edit",
            data: { "id": id },
            type: "GET",
            dataType: "html"
        })
        .done(function(data) {
            $("#edit").html(data);
            $("#editTask").modal("show");
        })
        .fail(function(data) {
            abp.notify.success('Edit task successfully');
        });
}

function deleteTask(id) {
    abp.message.confirm(
        "是否删除Id为" + id + "的任务信息",
        function(isConfirmed) {
            if (isConfirmed) {

                _taskService.deleteTask(id)
                    .done(function() {

                        getTaskList();
                    });
            }
        }
    );

}


function getTaskList() {
    var $taskStateCombobox = $('#TaskStateCombobox');
    var url = '/Tasks/GetList?state=' + $taskStateCombobox.val();
    abp.ajax({
            url: url,
            type: "GET",
            dataType: "html"
        })
        .done(function(data) {
            $("#taskList").html(data);
        });
}