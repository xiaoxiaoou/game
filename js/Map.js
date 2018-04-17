(function(){
    var map = window.Map = function(){
        //创建一个二维数组的地图
        this.code = (function(){
            var arr = [];
            for (var i = 0; i < 20; i++) {
                arr.push([]);
                for (var j = 0; j < 12; j++) {
                    arr[i].push(0);
                };
            };
            //写一个“一柱擎天”方便调试
            // arr[10][5] = "L";
            // arr[11][5] = "L";
            // arr[12][5] = "L";
            // arr[13][5] = "L";
            // arr[14][5] = "L";
            // arr[15][5] = "L";
            // arr[16][5] = "L";
            // arr[17][5] = "L";
            // arr[18][5] = "L";
            // arr[19][5] = "L";

            arr.push(Array(12).fill("X")); //这是ES6的填充数组的语法
            return arr;
        })();
        console.log(this);
    }

    //地图渲染方法
    Map.prototype.render = function(){
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 12; j++) {
                if(this.code[i][j] != 0){
                    //如果地图中code码不等于0，就渲染方块
                    game.setClass(i,j,this.code[i][j]);
                }
            };
        };
    }
})();