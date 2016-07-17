/**
 * Created by MMY on 2016/7/8.
 */
function PhonebookManager(obj) {
    this._phonebook = obj;
}
PhonebookManager.prototype = {
    //查询电话
    getTel: function (pname) {
        var phonebook = this._phonebook,
            len = phonebook.length,
            i, tel;
        for (i = 0; i < len; i++) {
            if (phonebook[i].name === pname) {
                tel = phonebook[i].tel;
                break;
            }
        }
        return tel;
    },
    //添加电话
    addItem: function (pname, ptel) {
        var record = {name: pname, tel: ptel};
        this._phonebook.push(record);
    },
    //删除电话
    removeItem: function (pname) {
        var phonebook = this._phonebook,
            len = phonebook.length,
            i;
        for (i = 0; i < len; i++) {
            if (phonebook[i].name === pname) {
                this._phonebook.splice(i, 1);
                break;
            }
        }
    }
};
var phonebook1 = new PhonebookManager([
        {name: "xiaoma", tel: "15677889900"},
        {name: "xl", tel: "156778892300"},
        {name: "zxxc", tel: "15677329900"}
    ]),
    phonebook2 = new PhonebookManager([
        {name: "x1", tel: "15677889901"},
        {name: "x2", tel: "156778892302"},
        {name: "x3", tel: "15677329903"},
        {name: "x4", tel: "15677889904"},
        {name: "x5", tel: "156778892305"},
        {name: "x6", tel: "15677329906"}
    ]);
var tel1=phonebook1.getTel('xiaoma');
console.log(tel1);
phonebook1.addItem('xiaoxiao','15612345678');
console.log(phonebook1._phonebook);
phonebook1.removeItem('zxxc');
console.log(phonebook1._phonebook);
var tel2=phonebook2.getTel('x6');
console.log(tel2);