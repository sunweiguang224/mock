var $ = require('jquery');

function MultiLine() {
	this.$multiLine = null;
	this.$heightTest = null;
}

MultiLine.prototype.init = function (selector = '.m-multiLine') {
	this.$multiLine = $(selector);
	this.$heightTest = this.$multiLine.children('.m-multiLine-heightTest');

	this.bindEvent();
};

MultiLine.prototype.bindEvent = function () {
	var ts = this;
	if (ts.$heightTest.height() <= ts.$multiLine.height()) return;

	ts.$multiLine.click(function () {
		var $ts = $(this);
		if ($ts.hasClass('expand')) {
			$ts.removeClass('expand');
		} else {
			$ts.addClass('expand');
		}
	});
};

module.exports = MultiLine;