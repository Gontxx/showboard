export function createWssocket (wsurl, onopen, handler) {
	var retsocket = {};
	var wssocket = new WebSocket(wsurl);
	wssocket.onerror = function(error) {
		console.log(error);
	};
	wssocket.onopen = onopen;
	wssocket.onclose = function(error) {
	};
	retsocket.receiveSeg = function(obj) {
		if (obj.cid === 'start') {
			retsocket.toReceive = "";
		}
		retsocket.toReceive += obj.data;
		if (obj.cid === 'done') {
			// console.log("[receiveSeg] Received AllData:" + retsocket.toReceive);
			var event = {};
			event.data = retsocket.toReceive;
			retsocket.toReceive = "";
			handler(event);
		}
	};
	wssocket.onmessage = function(event) {
		var obj = JSON.parse(event.data);
		switch (obj.action) {
		case 'sendNextSegment':
			retsocket.sendNextSegment();
			break;
		case 'sendSeg':
			retsocket.receiveSeg(obj);
			break;
		default:
			handler(event);
		}
	};

	retsocket.isSending = false;
	retsocket.sendList = [];
	retsocket.monitor = function() {
		if (!retsocket.isSending) {
			if (retsocket.sendList.length > 0) {
				retsocket.send(retsocket.sendList.pop());
			}
		}
		setTimeout(retsocket.monitor, 1000);
	};
	// TODO: we don't need monitor at all?
	// retsocket.monitor();
	retsocket.send = function(str) {
		if (str.length > 1024) {
			if (retsocket.isSending) {
				retsocket.sendList.push(str);
				return;
			}
			retsocket.isSending = true;
			retsocket.toSend = str.substr(1024);
			var obj = {};
			obj.isSegment = true;
			obj.data = str.substr(0, 1024);
			wssocket.send(JSON.stringify(obj));
		} else
			wssocket.send(str);
	};
	retsocket.sendNextSegment = function() {
		var str = retsocket.toSend;
		var obj = {};
		if (str.length > 1024) {
			retsocket.toSend = str.substr(1024);
			obj.isSegment = true;
			obj.data = str.substr(0, 1024);
			wssocket.send(JSON.stringify(obj));
		} else {
			retsocket.toSend = "";
			obj.isSegment = false;
			obj.data = str;
			wssocket.send(JSON.stringify(obj));
			retsocket.isSending = false;
			if (retsocket.sendList.length > 0) {
				retsocket.send(retsocket.sendList.pop());
			}
		}
	};
	return retsocket;
}

export default {
  createWssocket: createWssocket
}

