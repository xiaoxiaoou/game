(function(){
    var game = window.Game = function(){
        //初始化DOM，table表格
        this.init();
        //实例化方块类，并且赋值成为Game类的属性
        this.block = new Block();
        //实例化地图类，并且赋值成为Game类的属性
        this.map = new Map();
        //开启游戏的主定时器
        this.start();
        //键盘监听
        this.bindEvent();
    }

    //循环初始化DOM表格
    Game.prototype.init = function(){
        this.dom = document.createElement('table');
        document.getElementById("app").appendChild(this.dom);
        var tr,td;
        for (var i = 0; i < 20; i++) {
            tr = document.createElement('tr');//遍历行上树
            this.dom.appendChild(tr);
            for (var j = 0; j < 12; j++) {
                 td = document.createElement('td');//遍历列上树
                 tr.appendChild(td);
            };
        };
    }

    //如果别的类去修改Game类的表格颜色，尽量提供一个方法接口给其他的类，不要让其他类修改自己的属性。
    //改变table表格的颜色
    Game.prototype.setClass = function(row,col,classname){
        document.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].className = classname;
    }
    //清屏方法
    Game.prototype.clearClass = function(){
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 12; j++) {
                this.setClass(i,j,"");
            };
        };
    }

    //主循环，游戏定时器
    Game.prototype.start = function(){
        var self = this;
        this.f = 0;
        this.score = 0;
        this.timer = setInterval(function(){
            self.f++;
            document.getElementById("info").innerHTML = "帧编号："+ self.f;
            document.getElementById("score").innerHTML = "分数："+ self.score;
            //先清屏，再渲染
            self.clearClass();
            //渲染小方块
            self.block.render();
            //每隔20帧，方块下落
            self.f % 30 == 0 && self.block.down();
            //地图方块渲染
            self.map.render();
        },20);
    }

    //添加键盘监听
    Game.prototype.bindEvent = function(){
        var self = this;
        document.onkeyup = function(event){
            if(event.keyCode == 37){
                self.block.left(); //左键移动方法
            }else if(event.keyCode == 38){
                self.block.rotate(); //旋转方法
            }else if(event.keyCode == 39){
                self.block.right(); //右键移动方法
            }else if(event.keyCode == 40){
                self.block.goDown(); //一键下落方法
            }
        }
    }
})();