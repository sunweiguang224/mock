module.exports = {
  // 生成随机数
  random: function(min, max) {
    return Math.random() * (max - min) + min;
  },
	/**
	 *
	 * @param areaArr
		 var areaArr = [
			 {
				 min: -1,
				 max: 1
			 },{
						min: -1,
						max: 1
					},
	 		];
	 */
  random2: function(areaArr) {
		Math.max(1,2,3)
		for(var i in areaArr){
			var area = areaArr[i];
			Math.random() * (max - min) + min;
		}
    return
  },
};
