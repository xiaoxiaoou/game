### 项目效果预览
![](https://github.com/xiaoxiaoou/game/blob/master/123.gif)

### 第一步：构思 俄罗斯方块 的形状和规则
* 形状<br/>
九宫格将所有的形状列出来，用0和1代表它的形状，每个方块都看成一个二维数组，1代表染色，0则留空<br/>
* 规则<br/>
  1、左右方向键控制方块的左右移动<br/>
  2、上方向键控制方块顺时针形变<br/>
  3、下方向键控制方块一键下落<br/>
  4、方块自动一格格下落<br/>
  5、方块集满一排自动消除，每消除一排就相应加上分数<br/>
  6、方块到顶部游戏结束
 ### 第二步:让方块出现&动起来
 *利用定时器和格子地图染色
### 第三步:根据数组矩阵画出俄罗斯方块
根据数组矩阵判断值为1的下标,利用得到的下标对各个小方块进行定位,从而得出一整块俄罗斯方块.
判断能否移动则根据绘制出的俄罗斯方块取最值,根据最值比对边界即可. 

### 第四步:俄罗斯方块形变
利用变量记录俄罗斯方块当前位置
数组矩阵顺时针旋转后返回数组矩阵&每个方块的偏移量
利用矩阵判断俄罗斯方块能移动的边界 
### 第五步:俄罗斯方块自由下落
利用setTimeout方法指定一定时间下方块下落20px
每次下落期间判断当前方块可移动边界
当前方块不可再位移时,方块变灰,新的方块出现
### 第六步:俄罗斯方块消除
每次俄罗斯方块下落结束时,判断每一行小方块个数
方块个数等于画布宽度/方块,则取出该行方块集合并从document.body消除
消除后将高度高于该消除行的方块掉落一个方块高度 
### 第七步:加速下落
让方块在按空格键的时候,下落2个单位的BLOCK_SIZE,也就是40px
需要在canMove函数中添加displacement(位移)参数标识方块下落的位移量
判断方块是否到达最高位置,需要加上位移量的距离
### 第八步:判断游戏GG
判断已下落方块是否到达顶端
### 第九步:增加随机出现方块
将第零步的形状添加进变量arrs数组
用Math.random在每次初始化方块时,随机挑选arrs中的一个二维数组进行渲染
### 第十步:增加游戏信息
增加计分板
