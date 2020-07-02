const { execSQL, execTransaction } = require("../db/mysql");

const apiController = {
  /** 获取班级数据 */
  getCls: () => {
    const sql = "select * from cls ";
    return execSQL(sql);
  },

  /** 添加用户 */
  addUserInfo: (uinfo) => {
    const sql = `insert into user (uname,name,cid,level,pwd) values(
      "${uinfo.username}","${uinfo.name}",${uinfo.biaoCls},${0},"${
      uinfo.password
    }")`;
    return execSQL(sql);
  },

  /** 检查登录 */
  checkLogin: (uinfo) => {
    const sql = `SELECT id,name,uname,level from user where uname ='${uinfo.username}' and pwd = '${uinfo.password}' and level>0`;
    return execSQL(sql);
  },

  /** 查询所有的科目数据 */
  getSubject: () => {
    const sql = "select * from sub ";
    return execSQL(sql);
  },

  /** 作业发布 */
  addTask: (fields, filepath, date) => {
    const d = new Date();
    var curTime =
      date + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    /** 插入到 work 表 */
    const sqls = [
      `insert into work (clsid,subid,title,content,file,reuid,retime) values (${fields.cid[0]},${fields.subject[0]},"${fields.title[0]}","${fields.content[0]}","${filepath}",${fields.ruid[0]},"${curTime}");`,
      `insert into uwork (wid,cid,uid,status)  select work.id  ,work.clsid   ,user.id  ,0  from work,user,(select  id   from work order by id desc limit 1) as wtab where work.clsid  = user.cid and wtab.id = work.id ;`,
    ];

    return execTransaction(sqls);
  },
  worklist: (uid) => {
    const sql = `select work.id,title,  work.file, DATE_FORMAT( retime, '%Y-%m-%d %H:%i:%S') as retime,name,subname,status, DATE_FORMAT( subtime, '%Y-%m-%d %H:%i:%S') as subtime from work,user,sub,(select id,uid,wid,cid,file,status,subtime from uwork where uid = ${uid}) owo where owo.wid = work.id and user.id=work.reuid and sub.id=work.subid`;
    return execSQL(sql);
  },
  workdetail: (wid) => {
    const sql = `select title ,content,user.id as uid, work.id as wid,file,DATE_FORMAT( retime, '%Y-%m-%d %H:%i:%S') as retime,user.name,subname from work,user,sub where work.id=${wid} and work.reuid = user.id and sub.id = work.subid `;
    return execSQL(sql);
  },

  workUp: (fields, filepath) => {
    var d = new Date();
    var stime =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getDate() +
      " " +
      d.getHours() +
      ":" +
      d.getMinutes() +
      ":" +
      d.getSeconds();
    const sql = `update uwork set status=1 ,file='${filepath}',subtime='${stime}'  where wid= ${fields.wid[0]} and uid= ${fields.uid[0]}`;
    return execSQL(sql);
  },
  getWorksList: (query) => {
    const sql = `select user.id as uid,name,status,wid,tempwork.title,tempwork.file,DATE_FORMAT( tempwork.retime, '%Y-%m-%d %H:%i:%S') as retime from uwork,user,(select id,title,file,retime from work where clsid=${query.cid} and subid=${query.subid} and date_format(retime,"%m")=${query.month}) as tempwork where  tempwork.id=wid and user.id=uwork.uid`;
    return execSQL(sql);
    // const sqls = [
    //   `select user.id as uid,name,status,wid,tempwork.title,tempwork.file,DATE_FORMAT( tempwork.retime, '%Y-%m-%d %H:%m:%S') as retime from uwork,user,(select id,title,file,retime from work where clsid=${query.cid} and subid=${query.subid} and date_format(retime,"%m")=${query.month}) as tempwork where  tempwork.id=wid and user.id=uwork.uid;`,
    //   "select * from work;",
    // ];
    // return execTransaction(sqls);
  },
  userEdit: (userinfo) => {
    const sql = `update user set uname='${userinfo.username}' ,pwd = '${userinfo.pwd}' where id = ${userinfo.uid}`;
    return execSQL(sql);
  },
  getUserList: (cid) => {
    const sql = `SELECT user.id as uid,uname,name,level,class_name from user,cls where cid=${cid} and cls.id=${cid}`;
    return execSQL(sql);
  },
  /**用户状态切换 */
  userLevel: (query) => {
    let tlevel = 1;
    if (query.level == 1) {
      tlevel = 0;
    } else if (query.level == 0) {
      tlevel = 1;
    }
    const sql = `update user set level=${tlevel} where id = ${query.uid}`;
    return execSQL(sql);
  },
  /**删除用户
  userDel: (uid) => {
    console.log(uid);
    //只有超管可以删人 
    if (req.session.level == 3) {
      const sql = `delete from user where id = ${uid}`;
      return execSQL(sql);
    }
    console.log(req.session.level);
  }, */
};

module.exports = apiController;
