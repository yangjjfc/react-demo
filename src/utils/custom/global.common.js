/**
 * 金额格式化
 * @param {*str} n
 */
export const parseMone = (n) => {
    let _str = '';
    if (isNaN(n)) {
        return;
    }

    let re = /^[0-9]*[1-9][0-9]*$/; // 判断是不是整数

    if (re.test(n) || n == 0) { //eslint-disable-line
        if (n == 0) {//eslint-disable-line
            _str = n;
        } else {
            _str = parseNum(n) + '.00';
        }
    } else {
        let k = '.' + n.toString().split('.')[1]; // 截取小数
        if (k.length <= 2) {
            k += '0';
        }
        k = k.substr(0, 3);
        let h = JSON.parse(n.toString().split('.')[0]);
        _str = parseNum(h) + k;
    }
    return _str;
};

/**
 * 时间格式化
 * @param {*Date} time  new Date()
 * @param {*} fmt  //yyyy-MM-dd
 */
export const format = (time, fmt) => {
    let o = {
        'M+': time.getMonth() + 1, // 月份
        'd+': time.getDate(), // 日
        'h+': time.getHours(), // 小时
        'm+': time.getMinutes(), // 分
        's+': time.getSeconds(), // 秒
        'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
        'S': time.getMilliseconds()// 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
};
/**
 * 每3位加个','
 * @param {*} num
 */
export const parseNum = (num) => {
    let list = new String(num).split('').reverse(); // eslint-disable-line no-new-wrappers
    for (var i = 0; i < list.length; i++) {
        if (i % 4 === 3) {
            list.splice(i, 0, ',');
        }
    }
    return list.reverse().join('');
};
/**
 *
 * @param {*文件上传支持的类型} item
 */
export const getFileType = (item) => {
    // 判断是否是图片
    let strFilter = ['jpeg', 'jpg', 'png', 'pic', 'bmp', 'gif'];
    let strPostfix;
    if (!item) {
        return null;
    }
    if (item.indexOf('.') > -1) {
        strPostfix = item.split('.').pop().toLowerCase();
        if (~strFilter.indexOf(strPostfix)) {
            return 'image';
        } else if (~['pdf'].indexOf(strPostfix)) {
            return 'pdf';
        } else {
            return false; // 不支持的文件类型
        }
    }
    return null;
};

// 格式化图片
// const pdf =require ('@/assets/images/pdf.png'); // daf
// const noimg = require('@/assets/images/noimage.png'); // 没有图片
// export const formatFile = (item) => {
//     let thumbnail = '';
//     switch (getFileType(item)) {
//     case 'image':
//         thumbnail = process.env.IMAGE_DOWNLOAD + changeImgSize(item);
//         break;
//     case 'pdf':
//         thumbnail = pdf;
//         break;
//     default:
//         thumbnail = noimg;
//         break;
//     }
//     return thumbnail;
// };

/**
 *
 * @param {*改变图片大小} src
 * @param {*} size
 */
export const changeImgSize = (src, size = '100x100') => {
    let i = src.lastIndexOf('.');
    return (src = src.substring(0, i) + '_' + size + src.substring(i));
};

/**
 * 密码加密处理
 */
export const encryption = (password, clientid, token) => {
    const CryptoJS=require('@/assets/plugins/aes/aes-min.min.js').default;
    const SHA256 = require('@/assets/plugins/sha256/sha256.min.js').default;
    console.log(clientid);
    let _encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(SHA256(password)), CryptoJS.enc.Utf8.parse(clientid), {
        iv: CryptoJS.enc.Utf8.parse(token),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Iso10126
    });
    return CryptoJS.enc.Base64.stringify(_encrypted.ciphertext);
};


/**
 * 监听事件
 * @param {*对象名} obj
 * @param {*绑定类型} evtype
 * @param {*函数} fn
 * @param {*} useCapture
 */
export const addEvent = (obj, evtype, fn, useCapture) => {
    if (obj.addEventListener) {
        obj.addEventListener(evtype, fn, useCapture);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + evtype, fn);// IE不支持事件捕获 
    } else {
        obj['on' + evtype] = fn;// 事实上这种情况不会存在 
    }
};
/**
 * 解绑监听事件
 * @param {*对象名} obj
 * @param {*解绑类型} evtype
 * @param {*函数} fn
 * @param {*} useCapture
 */
export const delEvent = (obj, evtype, fn, useCapture) => {
    if (obj.removeEventListener) {
        obj.removeEventListener(evtype, fn, useCapture);
    } else if (obj.detachEvent) {
        obj.detachEvent('on' + evtype, fn);
    } else {
        obj['on' + evtype] = null;
    }
};

/**
 ctrl+s 事件
 */
export const ctrlS = (callback) => {
    let e = window.event;
    let currKey = 0;
    currKey = e.keyCode || e.which || e.charCode;
    if ((e.ctrlKey || e.metaKey) && currKey === 83) {
        // 阻止默认浏览器动作(W3C)
        if (window.event) {       // 这是IE浏览器
            e.returnValue = false;// 阻止默认事件
        }
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        callback && (callback());
    }
};

/**
 * 对象数组的深度拷贝.
 * source是原数据，extendObj是新增的键值对
 */
export const objArrDeepCopy = (source, extendObj) => {
    var sourceCopy = source instanceof Array ? [] : {};
    for (let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objArrDeepCopy(source[item], extendObj) : source[item];
        if (typeof extendObj === 'object' && !(sourceCopy instanceof Array)) {
            for (let param in extendObj) {
                sourceCopy[param] = extendObj[param];
            }
        }
    }
    return sourceCopy;
};

/**
 * 文件下载
 * @param {*下载链接} data
 * @param {*下载文件名} strFileName
 */
export const downloadFile = (data, strFileName) => {
    // 判断是否支持download
    var isSupportDownload = 'download' in document.createElement('a');
    if (isSupportDownload) {
        let aLink = document.createElement('a');
        let evt = document.createEvent('MouseEvents');
        evt.initEvent('click', false, false); // initEvent 不加后两个参数在FF下会报错
        aLink.href = data + '?action=download';
        aLink.download = strFileName;
        aLink.dispatchEvent(evt);
    } else {
        window.open(data + '?action=download', '_blank');
    }
};

/**
 * 滚动到最底部
 * @param {*array} domArr
 *  [{
 *     name: 'el-dialog__body',
 *     type: 'class'
 *  }]
 */
export const scrollEnd = (domArr) => {
    let formatDom = (elem) => {
        let $dom = '';
        switch (elem.type) {
        case 'class':
            $dom = document.getElementsByClassName(elem.name)[0];
            break;
        case 'id':
            $dom = document.getElementById(elem.name);
            break;
        case 'name':
            $dom = document.getElementsByTagName(elem.name);
            break;
        default:
            break;
        }
        return $dom;
    };
    let dom0 = formatDom(domArr[0]); // 外层div
    let dom1 = formatDom(domArr[1]); // 内层div
    let $scrollLength = dom1.offsetHeight - dom0.offsetHeight;
    dom0.scrollTop = $scrollLength;
};

export const reverseData = (list) => {
    list.forEach(item => {
        item.id = item.no;
        if (item.children && item.children.length) {
            reverseData(item.children);
        } else {
            delete item.children;
        }
    });
    return list;
};
