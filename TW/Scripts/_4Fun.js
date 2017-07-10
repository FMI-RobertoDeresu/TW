"use strict";

$(document).ready(function() {
    var $modal = $("#comment-modal");
    var $form = $("form[name='form-comment']");
    var maxDepth = 3;

    $(document).on("click", "#add-comment, .reply", openModal);

    $("#close-modal").click(closeModal);

    $(".modal #submit-form").click(function() {
        $form.submit();
    });

    $form.submit(function(e) {
        e.preventDefault();

        var name = $form.find("#name").val();
        var message = $form.find("#comment").val();
        var parentId = $form.find("#parent-id").val();

        if (name && message && parentId) {
            var parent = getComment(parentId);
            var comment = new Comment(parentId, name, message, parent ? parent.depth + 1 : 1);

            addComment(comment);
            addCommentContent(comment.id, parentId, true);

            closeModal();
        }
    });

    function openModal() {
        $form.find("#parent-id").val($(this).data("comment-id"));
        $modal.css("display", "block");
    }

    function closeModal() {
        $modal.css("display", "none");

        $form.find("#name").val("");
        $form.find("#comment").val("");
        $form.find("#parentId").val("");
    }

    //from stackoverflow
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    }

    function Comment(parentId, name, message, depth) {
        this.id = guid();
        this.parentId = parentId;
        this.createdAt = (new Date()).toString();
        this.name = name;
        this.message = message;
        this.depth = depth;
    }

    (function initializeComments() {
        function compare(a, b) {
            return a.depth < b.depth || (a.depth === b.depth && a.createdAt >= b.createdAt) ? -1 : 1;
        }

        var ids = getIds();
        var comments = [];

        $.each(ids, function() {
            comments.push(getComment(this));
        });

        comments.sort(compare);

        $.each(comments, function() {
            addCommentContent(this.id, this.parentId, false);
        });
    })();

    function addCommentContent(id, parentId, newComment) {
        var $parent = $("#comment-" + parentId);
        var comment = getComment(id);

        if (newComment) {
            $parent.find(":first-child").first().after(getCommentContent(comment));
        }
        else {
            $parent.append(getCommentContent(comment));
        }
    }

    function getCommentContent(comment) {
        var content = [];

        content.push("<div id='comment-" + comment.id + "' class='comment'>");
        content.push("<div class='comment-content'>");
        content.push("<h4>" + comment.name + ":</h4>");
        content.push("<p>" + comment.message + "</p>");

        if (comment.depth <= maxDepth) {
            content.push("<button class='btn btn-default reply' data-comment-id='" + comment.id + "'>Reply</button>");
        }

        content.push("</div>");
        content.push("</div>");

        return content.join("");
    }

    function addComment(comment) {
        localStorage.setItem(comment.id, JSON.stringify(comment));
        updateIds(comment.id);
    }

    function getComment(id) {
        return JSON.parse(localStorage.getItem(id));
    }

    function updateIds(id) {
        var ids = getIds();

        if (ids === null) {
            ids = [id];
        }
        else {
            ids = ids ? ids : [];
            ids.push(id);
        }

        localStorage.setItem("ids", JSON.stringify(ids));
        localStorage.setItem("numberOfComments", JSON.parse(localStorage.getItem("numberOfComments")) + 1);
    }

    function getIds() {
        return JSON.parse(localStorage.getItem("ids"));
    }

    Date.prototype.toString = function() {
        var yyyy = this.getFullYear().toString();
        var MM = (this.getMonth() + 1).toString();
        var dd = this.getDate().toString();
        var hh = this.getHours().toString();
        var mm = this.getMinutes().toString();
        var ss = this.getSeconds().toString();
        var ms = this.getMilliseconds().toString();

        MM = MM[1] ? MM : "0" + MM[0];
        dd = dd[1] ? dd : "0" + dd[0];
        hh = hh[1] ? hh : "0" + hh[0];
        mm = mm[1] ? mm : "0" + mm[0];
        ss = ss[1] ? ss : "0" + ss[0];
        ms = ms[3] ? ms : "0" + (ms[2] ? ms : "0" + (ms[1] ? ms : "0" + ms));

        return yyyy + "." + MM + "." + dd + " " + hh + ":" + mm + ":" + ss + ":" + ms;
    };
});