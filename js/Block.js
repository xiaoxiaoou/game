(function(){
    //方块类
    var block = window.Block = function(){
        //选择一个形状S 、Z 、J 、L 、O 、I 、T
        this.allType = ["I","L","S","Z","J","O","T","A"][~~(Math.random() * 8)];
        //自己所有的方向的个数
        this.allDirectionNumber = block_json[this.allType].length;
        //随机一个方向
        this.direction = ~~(Math.random() * this.allDirectionNumber);
        //得到自己的形状，马上渲染图形的二进制code码
        this.code = block_json[this.allType][this.direction];
        //4*4的小方块初始位置
        this.row = 0;
        //保证小方块从中间开始出现
        this.col = 4;
    }

    //渲染小方块
    Block.prototype.render = function(){
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if(this.code[i][j] == 1){ //如果4*4的二维码数组图形编码中有1就染色，0就没有色
                    game.setClass(this.row + i,this.col + j,this.allType);
                }
            };
        };
    }

    //方块下落
    Block.prototype.down = function(){
        //判断这个数组第0行，是不是不等于0的那一行，如果有，主循环结束
        game.map.code[0].forEach(function(item){
            if(item != 0 ){
                clearInterval(game.timer);
                alert("游戏结束！");
                return;
            }
        });
        //调用check方法，如果为真表示可以继续往下落
        if(this.check(this.row+1,this.col)){
            this.row++;
        }else{
            // 如果为假，表示触底了（碰到非0的方块了），将自己添加到map里面
            this.addDie();
            // 同时new一个新的方块
            game.block = new Block();
            //每一次碰撞检测是否消行
            this.remove();
        }
    }
    //旋转
    Block.prototype.rotate = function(){
        document.getElementById("rotate").play();
        //备份老的方向
        this.oldDirection = this.direction;

        //如果旋转的值已经等于自己方向的个数，就回到0，重新翻转
        if(this.direction == this.allDirectionNumber -1 ){
            this.direction = 0;
        }else{
            //否则继续加，可以旋转。
            this.direction++;
        }
        //得到自己的方向下标后，马上渲染图形的二维数组的code码
        //如果改变了方向，记得别忘记把砖块code码重新赋值一次
        this.code = block_json[this.allType][this.direction];

        //如果不可以旋转，就撤回来
        if(!this.check(this.row,this.col)){
            //已经碰到了，就不能再旋转了，应该重置为上一个状态的方向
            this.direction = this.oldDirection;
            //得到自己的方向下标后，马上渲染图形的二维数组的code码
            this.code = block_json[this.allType][this.direction];
        }
    }
    //一键下落
    Block.prototype.goDown = function(){
        document.getElementById("goDown").play();
        while(this.check(this.row+1,this.col)){
            this.row++;
        };
    }

    //向左
    Block.prototype.left = function(){
        document.getElementById("move").play();
        if(this.check(this.row,this.col-1)){
            this.col--;
        }
    }
    //向右
    Block.prototype.right = function(){
        document.getElementById("move").play();
        if(this.check(this.row,this.col+1)){
            this.col++;
        }
    }
    //添加死亡方块
    Block.prototype.addDie = function(){
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                //如果不是0，表示有颜色
                if(this.code[i][j] != 0){
                    //将随机出来的字母类名，写在地图类的code中
                    game.map.code[i+this.row][this.col+j] = this.allType;
                }
            };
        };
    }

    //消行判断
    Block.prototype.remove = function(){
        //判断map类中的code中某一行是不是没有0，如果没有0，就消行
        for (var i = 0; i < 20; i++) {
            if(!game.map.code[i].includes(0)){
                game.score++;
                document.getElementById("goDie").play();
                //如果没有0，就删除行
                game.map.code.splice(i,1);
                console.log(game.map.code);
                //删除之后，再在头部填充一行
                game.map.code.unshift(new Array(12).fill(0));
            }
        };
    }

    //检测碰撞，提供check方法
    Block.prototype.check = function(row,col){
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                // 看下一行能不能进取决于两个条件：
                // 1、地图类的下一行不能是非“0”的
                // 2、方块的下一行不能是“1”
                if(this.code[i][j] != 0 && game.map.code[row+i][col+j] != 0){
                    return false; //如果不能进，返回false
                }
            };
        };
        return true; //能进返回true
    }
})();