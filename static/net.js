class Net {

    constructor() {
    }

    getData() {
        $.ajax({
            url: "/getData",
            data: {},
            type: "GET",
            success: function (data) {
                ui.writeData(data);
            },
            error: function (xhr, status, error) {
            },
        });
    }
    changeAlbum(index) {
        $.ajax({
            url: "/getsongs/" + index,
            data: {},
            type: "GET",
            success: function (data) {
                ui.changeData(data);
            },
            error: function (xhr, status, error) {
            },
        });
    }
}