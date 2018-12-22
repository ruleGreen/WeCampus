var util = require('../util/util.js')

class DBPost {
  constructor(postId) {
    this.storageKeyName = 'postList';
    this.postId = postId;
  }

  /*得到全部文章信息*/
  getAllPostData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/data.js').postList;
      this.initPostList(res);
    }
    return res;
  }

  /*初始化缓存数据*/
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }

  //获取指定id号的文章数据
  getPostItemById() {
    var postsData = this.getAllPostData();
    var len = postsData.length;
    for (var i = 0; i < len; i++) {
      if (postsData[i].postId == this.postId) {
        return {
          index: i,
          data: postsData[i]
        }
      }
    }
  }

  //获取文章的评论
  getCommentData() {
    var itemData = this.getPostItemById().data;
    //时间降序排列评论
    itemData.comments.sort(this.compareWithTime);
    var len = itemData.comments.length,
      comment;
    for (var i = 0; i < len; i++) {
      //将comment中的时间戳转换成可阅读格式
      comment = itemData.comments[i];
      comment.create_time = util.getDiffTime(comment.create_time, true);
    }
    return itemData.comments;
  }

  compareWithTime(value1, value2) {
    var flag = parseFloat(value1.create_time) - parseFloat(value2.create_time)
    if (flag < 0) return 1;
    else if (flag > 0) return -1;
    else return 0;
  }

  //发表评论
  newComment(newComment) {
    this.updatePostData('comment', newComment);
  }

  //取消发布
  cancel(){
    return this.updatePostData('cancel')
  }

  //抢单、取消
  acceptPt(){
    return this.updatePostData('accept')
  }

  //确认交付
  finishPt(){
    return this.updatePostData('finish')
  }

  //评价
  ranked(rank){
    return this.updatePostData('ranked',rank)
  }


  //更新本地的评论信息、抢单、取消、结单
  updatePostData(category, newData) {
    var itemData = this.getPostItemById(),
      postData = itemData.data,
      allPostData = this.getAllPostData();
    switch (category) {
      case 'comment':
        postData.comments.push(newData);
        postData.commentNum++;
        break;
      case 'cancel':
        postData.state = 0;
      case 'accept':
        if(postData.state==1){
          postData.state = 2;
          postData.accepter = "Starry";
        }
        else if(postData.state == 2){
          postData.accepter = "";
          postData.state = 1;
        }
        break;
      case 'finish':
        if(postData.state==2){
          postData.state = 3;
        }
        else if(postData.state==3){
          postData.state = 4;
        }
      case 'ranked':
        postData.ranked = newData;
      default:
        break;
    }
    allPostData[itemData.index] = postData;
    this.execSetStorageSync(allPostData);
    return postData;
  }
};

export { DBPost }