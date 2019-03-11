export function createWssocket (wsurl, onopen, handler) {
	var retsocket = {};
	var wssocket = new WebSocket(wsurl);
	wssocket.onerror = function(error) {
		console.log(error);
	};
	wssocket.onopen = onopen;
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

	retsocket.send = function(str) {
		if (str.length > 1024) {
			retsocket.toSend = str.substr(1024);
			var obj = {};
			obj.isSegment = true;
			obj.data = str.substr(0, 1024);
			wssocket.send(JSON.stringify(obj));
		} else
			wssocket.send(str);
	};
	retsocket.sendNextSegment = function() {
		console.log("sendNextSegment: len=" + retsocket.toSend.length);
		var str = retsocket.toSend;
		if (str.length > 1024) {
			retsocket.toSend = str.substr(1024);
			var obj = {};
			obj.isSegment = true;
			obj.data = str.substr(0, 1024);
			wssocket.send(JSON.stringify(obj));
		} else {
			retsocket.toSend = "";
			var obj = {};
			obj.isSegment = false;
			obj.data = str;
			wssocket.send(JSON.stringify(obj));
		}
	};
	return retsocket;
}

export default {
  createWssocket: createWssocket
}

