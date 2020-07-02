$.ajax({
  url: "/api/cls",
  method: "get",
  success: function (data) {
    console.log(data);
    let shtml = "";

    for (let i = 0; i < data.length; i++) {
      shtml += `
          <option value="${data[i].id}">${data[i].class_name}</option>
        `;
    }
    $("#biao-select2").html(shtml);
  },
  error: function (e) {
    alert("请联系管理员");
  },
});
