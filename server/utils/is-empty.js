module.exports = (data)=>{
	if(data==undefined || data==null || data == "" || JSON.stringify(data) == JSON.stringify({})) {
		return true;
	} else {
		return false;
	}

}