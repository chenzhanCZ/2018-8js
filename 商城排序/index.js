// 1.获取元素
var header = document.getElementById('header');
var buttons = header.getElementsByTagName('a');
var shopList = document.getElementById('shopList');
var data = null;

// 2.请求数据
var xhr = new XMLHttpRequest();
xhr.open('get','data/product.json',false);
xhr.onreadystatechange = function () {
    if(xhr.readyState == 4 && xhr.status == 200){
        data=JSON.parse(xhr.responseText);
    }
}
xhr.send();

// 3. 将数据绑定到页面当中

function bindHtml(data) {
    var str = ``;
    data.forEach(function (item,index) {
        str += `<li>
                    <img src="${item.img}" alt="" >
                    <p class="title">${item.title}</p>
                    <p class="hot">热度${item.hot}</p>
                    <del>￥9999</del>
                    <span>￥${item.price}</span>
                    <p class="time">上架时间：${item.time}</p>
                </li>`
    })
    shopList.innerHTML = str
}
bindHtml(data);

// 4. 给每一个按钮添加点击时间实现排序
for (var i = 0; i < buttons.length; i++) {
    buttons[i].index = -1;
    buttons[i].onclick = function () {
        this.index *= -1;
        var value = this.getAttribute('attrName');
        productSort.call(this,value)
        changeArrow.call(this)
        clearArrow.call(this)
    }
}
function productSort(value) {
    var _this=this
    if(value === 'time'){
        data.sort(function (a,b) {
            return (new Date(a.time)-new Date(b.time))*_this.index
        })
    }else {
        data.sort(function (a,b) {
            return (a[value]-b[value])*_this.index
        })
    }
    bindHtml(data);
}

// 5. 点击的时候让箭头显示
function changeArrow() {
    console.log(this.index);
    var down = this.children[1];
    var up = this.children[0];
    if(this.index<0){
        //down.className = 'bg down';
        down.classList.add('bg');
        up.classList.remove('bg');
    }else{
        up.classList.add('bg');
        down.classList.remove('bg');
    }
}

// 6.清除其他箭头的颜色
function clearArrow() {
    for (var i = 0; i < buttons.length; i++) {
        // 判断当前点击的元素是否是循环
        //
        if(this != buttons[i]){
            buttons[i].children[0].classList.remove('bg');
            buttons[i].children[1].classList.remove('bg');
            buttons[i].index = -1;
        }

    }
}
