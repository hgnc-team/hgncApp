// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
// uni.getStorageSync(USERS_KEY);
// uni.setStorageSync(USERS_KEY, JSON.stringify(users));


// 登录
const loginFn = function(userInfo) {
	let users = {
		phone: userInfo.phone,
		password: userInfo.password
	}
	// 直接返回promise对象
	return uni.request({
        url: 'https://www.example.com/request',
		method: 'GET',
		data: users,
		success: function(res) {
			console.log(res.data);
		},
		fail: function(err) {
			console.log(res.data);
		}
    })
}

export default {
    loginFn
}
