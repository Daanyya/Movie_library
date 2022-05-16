export default function sleep(ms) {
	var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < ms) {
        i++;
    }
}